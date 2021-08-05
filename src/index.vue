<template>
  <div
    ref="wrapper"
    class="vue-select"
    :class="[`direction-${direction}`]"
    :tabindex="isFocusing ? -1 : tabindex"
    @focus="focus"
    @blur="e => (searchable ? false : blur(e))"
    v-bind="Object.assign({}, dataAttrs, $attrs)"
    @keypress.enter.prevent.exact="
      () => highlightedOriginalIndex !== null && addOrRemoveOption($event, optionsWithInfo[highlightedOriginalIndex])
    "
    @keydown.down.prevent.exact="pointerForward"
    @keydown.up.prevent.exact="pointerBackward"
    @keydown.home.prevent.exact="pointerFirst"
    @keydown.end.prevent.exact="pointerLast"
    @keydown="typeAhead"
    :id="`vs${instance.uid}-combobox`"
    :role="searchable ? 'combobox' : null"
    :aria-expanded="isFocusing"
    aria-haspopup="listbox"
    :aria-owns="`vs${instance.uid}-listbox`"
    :aria-activedescendant="
      highlightedOriginalIndex === null ? null : `vs${instance.uid}-option-${highlightedOriginalIndex}`
    "
    :aria-busy="loading"
    :aria-disabled="disabled"
  >
    <div ref="header" class="vue-select-header">
      <template
        v-if="(multiple && taggable && modelValue.length === 0) || (searchable === false && taggable === false)"
      >
        <div class="vue-input">
          <input :placeholder="innerPlaceholder" :autocomplete="autocomplete" readonly @click="focus" />
        </div>
      </template>

      <template v-if="multiple && taggable">
        <v-tags :modelValue="optionsWithInfo" :collapse-tags="collapseTags" tabindex="-1" @click="focus">
          <template #default="{ option }">
            <slot name="tag" :option="option.originalOption" :remove="() => addOrRemoveOption($event, option)">
              <span>{{ option.label }}</span>
              <img
                src="./images/delete.svg"
                alt="delete tag"
                class="icon delete"
                @click.prevent.stop="() => addOrRemoveOption($event, option)"
              />
            </slot>
          </template>
        </v-tags>
        <slot name="toggle" :isFocusing="isFocusing" :toggle="toggle">
          <span class="icon arrow-downward" :class="{ active: isFocusing }" @click="toggle" @mousedown.prevent.stop />
        </slot>
      </template>

      <template v-else>
        <v-input
          v-if="searchable"
          ref="input"
          v-model="searchingInputValue"
          :disabled="disabled"
          :autocomplete="autocomplete"
          :placeholder="isFocusing ? searchPlaceholder : innerPlaceholder"
          @input="handleInputForInput"
          @change="handleChangeForInput"
          @focus="handleFocusForInput"
          @blur="handleBlurForInput"
          @escape="blur"
          :autofocus="autofocus || (taggable && searchable)"
          :tabindex="tabindex"
          :comboboxUid="instance.uid"
        />
        <template v-if="loading">
          <slot name="loading">
            <span class="icon loading">
              <div />
              <div />
              <div />
            </span>
          </slot>
        </template>
        <template v-else>
          <slot name="toggle" :isFocusing="isFocusing" :toggle="toggle">
            <span class="icon arrow-downward" :class="{ active: isFocusing }" @click="toggle" @mousedown.prevent.stop />
          </slot>
        </template>
      </template>
    </div>

    <div class="vue-select-input-wrapper" v-if="multiple && taggable && searchable">
      <v-input
        v-show="isFocusing"
        ref="input"
        v-model="searchingInputValue"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :placeholder="isFocusing ? searchPlaceholder : innerPlaceholder"
        @input="handleInputForInput"
        @change="handleChangeForInput"
        @focus="handleFocusForInput"
        @blur="handleBlurForInput"
        @escape="blur"
        :autofocus="autofocus || (taggable && searchable)"
        :tabindex="tabindex"
        :comboboxUid="instance.uid"
      />
      <template v-if="loading">
        <slot name="loading">
          <span class="icon loading">
            <div />
            <div />
            <div />
          </span>
        </slot>
      </template>
    </div>

    <v-dropdown
      ref="dropdown"
      v-model="optionsWithInfo"
      @click-item="addOrRemoveOption"
      @mouseenter="(ev, option) => pointerSet(option.originalIndex)"
      :comboboxUid="instance.uid"
      :maxHeight="maxHeight"
      :highlightedOriginalIndex="highlightedOriginalIndex"
    >
      <template #default="{ option }">
        <slot name="dropdown-item" :option="option.originalOption">
          <span>{{ option.label }}</span>
        </slot>
      </template>
    </v-dropdown>
  </div>
</template>

<script>
import { ref, computed, watch, provide, getCurrentInstance, nextTick } from 'vue'
import VInput from './components/input.vue'
import VTags from './components/tags.vue'
import VDropdown from './components/dropdown.vue'
import { addOption, removeOption, getOptionByValue, hasOption } from './crud'
import normalize from './normalize'
import { usePointer } from './hooks'
import { version } from '../package.json'

function escapeRegExp(pattern) {
  // $& means the whole matched string
  return pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const VueSelect = {
  name: 'vue-select',
  inheritAttrs: false,
  props: {
    // modelValue
    modelValue: {
      required: true,
    },
    // TODO: default to `undefined` in next major version
    // https://github.com/vuejs/vue-next/issues/3744
    emptyModelValue: {
      default: null,
    },

    // options
    options: {
      required: true,
      type: Array,
    },
    // TODO: default to `'label'` in next major version
    labelBy: {
      type: [String, Function],
    },
    // TODO: default to `'value'` in next major version
    valueBy: {
      type: [String, Function],
    },
    disabledBy: {
      default: 'disabled',
      type: [String, Function],
    },
    groupBy: {
      default: 'group',
      type: [String, Function],
    },
    // TODO: default to `undefined` in next major version
    visibleOptions: {
      type: [Array, null],
      default: null,
    },

    // multiple
    multiple: {
      default: false,
      type: Boolean,
    },
    min: {
      default: 0,
      type: Number,
    },
    max: {
      default: Infinity,
      type: Number,
    },

    // search
    searchable: {
      default: false,
      type: Boolean,
    },
    searchPlaceholder: {
      default: 'Type to search',
      type: String,
    },
    clearOnSelect: {
      default: false,
      type: Boolean,
    },
    clearOnClose: {
      default: false,
      type: Boolean,
    },

    // tag
    taggable: {
      default: false,
      type: Boolean,
    },
    collapseTags: {
      default: false,
      type: Boolean,
    },

    // misc
    autocomplete: {
      default: "off",
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    closeOnSelect: {
      default: false,
      type: Boolean,
    },
    hideSelected: {
      default: false,
      type: Boolean,
    },
    placeholder: {
      default: 'Select option',
      type: String,
    },
    tabindex: {
      default: 0,
      type: Number,
    },
    autofocus: {
      default: false,
      type: Boolean,
    },
    maxHeight: {
      default: 300,
      type: Number,
    },
    openDirection: {
      type: String,
      validator(value) {
        return ['top', 'bottom'].includes(value)
      },
    },
  },
  emits: [
    'selected',
    'removed',
    'update:modelValue',

    'focus',
    'blur',
    'toggle',
    // TODO: remove use `opened` in next major version
    'opened',
    // TODO: remove use `opened` in next major version
    'closed',

    'search:input',
    'search:change',
    'search:focus',
    'search:blur',
  ],
  setup(props, context) {
    const normalized = normalize(props)

    const instance = getCurrentInstance()
    const wrapper = ref()
    const dropdown = ref()
    const input = ref()
    const inputEl = computed(() => input.value?._.refs.input)
    const isFocusing = ref(false)
    watch(
      () => isFocusing.value,
      () => {
        if (isFocusing.value) {
          context.emit('opened')
          context.emit('focus')
          if (props.searchable) {
            if (inputEl.value !== document.activeElement) {
              inputEl.value.focus()
            }
            context.emit('search:focus')
          } else {
            wrapper.value.focus()
          }
        } else {
          if (props.searchable) {
            if (inputEl.value === document.activeElement) {
              inputEl.value.blur()
            }
            if (props.clearOnClose) clearInput()
            context.emit('search:blur')
          } else {
            wrapper.value.blur()
          }
          context.emit('closed')
          context.emit('blur')
        }
        context.emit('toggle')
      },
    )
    const focus = () => {
      if (props.disabled) return
      isFocusing.value = true
    }
    const blur = e => {
      if (wrapper.value.contains(e?.relatedTarget)) {
        setTimeout(() => {
          wrapper.value.focus()
        })
        return
      }
      isFocusing.value = false
    }
    const toggle = () => {
      if (isFocusing.value) blur()
      else focus()
    }
    watch(
      () => props.disabled,
      () => blur(),
    )

    // input
    const searchingInputValue = ref('')
    const handleInputForInput = event => {
      context.emit('search:input', event)
    }
    const handleChangeForInput = event => {
      context.emit('search:change', event)
    }
    const handleFocusForInput = event => {
      focus()
    }
    const handleBlurForInput = event => {
      blur()
    }
    const searchRe = computed(() => new RegExp(escapeRegExp(searchingInputValue.value), 'i'))
    const searchedOptions = computed(() => {
      return searchingInputValue.value
        ? normalized.options.filter(option => searchRe.value.test(normalized.labelBy(option)))
        : undefined
    })

    // sync model value
    const normalizedModelValue = ref([])
    const selectedValueSet = computed(
      () => new Set(normalizedModelValue.value.map(option => normalized.valueBy(option))),
    )
    const isSynchronoused = () => {
      if (props.multiple) {
        if (Array.isArray(props.modelValue) === false) return false
        if (normalizedModelValue.value.length !== props.modelValue.length) return false
        if (
          Object.keys(normalizedModelValue.value).some(
            index =>
              normalizedModelValue.value[index] !==
              getOptionByValue(normalized.options, props.modelValue[index], { valueBy: normalized.valueBy }),
          )
        )
          return false
      } else {
        if (normalizedModelValue.value.length === 0 && props.modelValue !== props.emptyModelValue) return false
        if (normalizedModelValue.value.length === 1 && props.modelValue === props.emptyModelValue) return false
        if (
          normalizedModelValue.value[0] !==
          getOptionByValue(normalized.options, props.modelValue, { valueBy: normalized.valueBy })
        )
          return false
      }
      return true
    }
    const syncFromModelValue = () => {
      if (isSynchronoused()) return
      normalizedModelValue.value = []
      const modelValue = props.multiple
        ? props.modelValue
        : props.modelValue === props.emptyModelValue
        ? []
        : [props.modelValue]
      for (const value of modelValue) {
        const option = getOptionByValue(normalized.options, value, { valueBy: normalized.valueBy })
        // guarantee options has modelValue
        if (hasOption(normalized.options, option, { valueBy: normalized.valueBy }) === false) continue
        normalizedModelValue.value = addOption(normalizedModelValue.value, option, {
          max: Infinity,
          valueBy: normalized.valueBy,
        })
      }
    }
    syncFromModelValue()
    watch(
      () => props.modelValue,
      () => syncFromModelValue(),
      { deep: true },
    )

    // guarantee options has modelValue
    watch(
      () => normalized.options,
      () => {
        normalizedModelValue.value = normalized.options.filter(option =>
          selectedValueSet.value.has(normalized.valueBy(option)),
        )
      },
      { deep: true },
    )

    const addOrRemoveOption = (event, option) => {
      if (props.disabled) return

      // TODO: hot spot, improve performance
      if (option.group && props.multiple) addOrRemoveOptionForGroupOption(event, option)
      else addOrRemoveOptionForNonGroupOption(event, option)

      syncToModelValue()

      if (props.closeOnSelect === true) isFocusing.value = false
      if (props.clearOnSelect === true && searchingInputValue.value) clearInput()
    }
    const addOrRemoveOptionForGroupOption = (event, option) => {
      option = option.originalOption
      const has = option.value.every(value => {
        const option = getOptionByValue(normalized.options, value, { valueBy: normalized.valueBy })
        return hasOption(normalizedModelValue.value, option, { valueBy: normalized.valueBy })
      })
      if (has) {
        option.value.forEach(value => {
          const option = getOptionByValue(normalized.options, value, { valueBy: normalized.valueBy })
          normalizedModelValue.value = removeOption(normalizedModelValue.value, option, {
            min: normalized.min,
            valueBy: normalized.valueBy,
          })
          context.emit('removed', option)
        })
      } else {
        option.value.forEach(value => {
          const option = getOptionByValue(normalized.options, value, { valueBy: normalized.valueBy })
          if (hasOption(normalizedModelValue.value, option, { valueBy: normalized.valueBy })) return
          normalizedModelValue.value = addOption(normalizedModelValue.value, option, {
            max: normalized.max,
            valueBy: normalized.valueBy,
          })
          context.emit('selected', option)
        })
      }
    }
    const addOrRemoveOptionForNonGroupOption = (event, option) => {
      option = option.originalOption
      if (hasOption(normalizedModelValue.value, option, { valueBy: normalized.valueBy })) {
        normalizedModelValue.value = removeOption(normalizedModelValue.value, option, {
          min: normalized.min,
          valueBy: normalized.valueBy,
        })
        context.emit('removed', option)
      } else {
        if (!props.multiple && normalizedModelValue.value.length === 1) {
          const removingOption = normalizedModelValue.value[0]
          normalizedModelValue.value = removeOption(normalizedModelValue.value, normalizedModelValue.value[0], {
            min: 0,
            valueBy: normalized.valueBy,
          })
          context.emit('removed', removingOption)
        }
        normalizedModelValue.value = addOption(normalizedModelValue.value, option, {
          max: normalized.max,
          valueBy: normalized.valueBy,
        })
        context.emit('selected', option)
      }
    }
    const syncToModelValue = () => {
      if (isSynchronoused()) return
      const selectedValues = normalizedModelValue.value.map(option => normalized.valueBy(option))
      if (props.multiple) {
        context.emit('update:modelValue', selectedValues)
      } else {
        if (selectedValues.length) context.emit('update:modelValue', selectedValues[0])
        else context.emit('update:modelValue', props.emptyModelValue)
      }
    }

    const clearInput = () => {
      // simulate clear input value
      inputEl.value.value = ''
      inputEl.value.dispatchEvent(new Event('input'))
      inputEl.value.dispatchEvent(new Event('change'))
    }

    const renderedOptions = computed(() => props.visibleOptions ?? searchedOptions.value ?? normalized.options)

    const highlightedOriginalIndex = ref(0)
    const optionsWithInfo = computed(() => {
      const visibleValueSet = new Set(renderedOptions.value.map(option => normalized.valueBy(option)))

      const optionsWithInfo = normalized.options.map((option, index) => {
        const optionWithInfo = {
          key: normalized.valueBy(option),
          label: normalized.labelBy(option),
          // selected: selectedValueSet.value.has(normalized.valueBy(option)),
          // disabled: normalized.disabledBy(option),
          group: normalized.groupBy(option),
          // visible: visibleValueSet.has(normalized.valueBy(option)),
          // hidden: props.hideSelected ? selectedValueSet.value.has(normalized.valueBy(option)) : false,
          originalIndex: index,
          originalOption: option,
        }

        optionWithInfo.selected = optionWithInfo.group
          ? option.value.every(value => selectedValueSet.value.has(value))
          : selectedValueSet.value.has(normalized.valueBy(option))

        optionWithInfo.disabled = optionWithInfo.group
          ? normalized.disabledBy(option) ||
            option.value.every(value => {
              const option = getOptionByValue(normalized.options, value, { valueBy: normalized.valueBy })
              return normalized.disabledBy(option)
            })
          : normalized.disabledBy(option)

        optionWithInfo.visible = optionWithInfo.group
          ? option.value.some(value => visibleValueSet.has(value))
          : visibleValueSet.has(normalized.valueBy(option))

        optionWithInfo.hidden = props.hideSelected
          ? optionWithInfo.group
            ? option.value.every(value => selectedValueSet.value.has(value))
            : selectedValueSet.value.has(normalized.valueBy(option))
          : false

        return optionWithInfo
      })

      for (const option of optionsWithInfo) {
        if (option.group === false) continue
        if (option.disabled) {
          const values = new Set(option.originalOption.value)
          optionsWithInfo
            .filter(optionWithInfo => values.has(normalized.valueBy(optionWithInfo.originalOption)))
            .forEach(optionWithInfo => (optionWithInfo.disabled = true))
        }
      }

      return optionsWithInfo
    })
    const {
      pointerForward: _pointerForward,
      pointerBackward: _pointerBackward,
      pointerSet,
    } = usePointer(optionsWithInfo, highlightedOriginalIndex)
    const pointerForward = (...args) => {
      _pointerForward(...args)
      nextTick(updateScrollTop)
    }
    const pointerBackward = (...args) => {
      _pointerBackward(...args)
      nextTick(updateScrollTop)
    }
    const pointerFirst = () => {
      for (const index of normalized.options.keys()) {
        if (pointerSet(index)) break
      }
      nextTick(updateScrollTop)
    }
    const pointerLast = () => {
      for (const index of [...normalized.options.keys()].reverse()) {
        if (pointerSet(index)) break
      }
      nextTick(updateScrollTop)
    }
    let recentTypedChars = ''
    let timerForClearingRecentTypedChars
    let alphanumRe = /^[\w]$/
    const sortedOriginalIndexBaseOnHighlighted = computed(() => {
      const indexes = [...normalized.options.keys()]
      return indexes.slice(highlightedOriginalIndex.value).concat(indexes.slice(0, highlightedOriginalIndex.value))
    })
    const typeAhead = event => {
      if (props.searchable) return

      let changed = false
      if (alphanumRe.test(event.key)) {
        recentTypedChars += event.key.toLowerCase()
        changed = true
      } else if (event.code === 'Space') {
        recentTypedChars += ' '
      }
      if (changed) {
        for (const index of sortedOriginalIndexBaseOnHighlighted.value) {
          if (normalized.labelBy(normalized.options[index])?.toLowerCase()?.startsWith(recentTypedChars) !== true)
            continue
          if (pointerSet(index)) break
        }
        clearTimeout(timerForClearingRecentTypedChars)
        timerForClearingRecentTypedChars = setTimeout(() => {
          recentTypedChars = ''
        }, 500)
      }
    }
    const updateScrollTop = () => {
      const highlightedEl = wrapper.value?.querySelector('.highlighted')
      if (!highlightedEl) return
      if (!dropdown.value) return

      const computedStyle = getComputedStyle(highlightedEl)
      let safeCount
      safeCount = 0
      while (
        highlightedEl.offsetTop +
          parseFloat(computedStyle.height) +
          parseFloat(computedStyle.paddingTop) +
          parseFloat(computedStyle.paddingBottom) >
          dropdown.value.$el.clientHeight + dropdown.value.$el.scrollTop &&
        safeCount++ < optionsWithInfo.value.length
      ) {
        dropdown.value.$el.scrollTop =
          dropdown.value.$el.scrollTop +
          parseFloat(computedStyle.height) +
          parseFloat(computedStyle.paddingTop) +
          parseFloat(computedStyle.paddingBottom)
      }
      safeCount = 0
      while (highlightedEl.offsetTop < dropdown.value.$el.scrollTop && safeCount++ < optionsWithInfo.value.length) {
        dropdown.value.$el.scrollTop =
          dropdown.value.$el.scrollTop -
          parseFloat(computedStyle.height) -
          parseFloat(computedStyle.paddingTop) -
          parseFloat(computedStyle.paddingBottom)
      }
    }
    watch(
      () => [isFocusing.value, normalized.options, selectedValueSet.value],
      (_, oldValue) => {
        if (oldValue?.[0] === true) return
        if (isFocusing.value === false) return
        if (normalizedModelValue.value.length === 0) return
        pointerSet(normalized.options.findIndex(option => selectedValueSet.value.has(normalized.valueBy(option))))
        nextTick(updateScrollTop)
      },
      { deep: true, immediate: true },
    )

    const dataAttrs = computed(() => ({
      'data-is-focusing': isFocusing.value,
      'data-visible-length': optionsWithInfo.value.filter(option => option.visible && option.hidden === false).length,
      'data-not-selected-length':
        normalized.options.length - optionsWithInfo.value.filter(option => option.selected).length,
      'data-selected-length': optionsWithInfo.value.filter(option => option.selected).length,
      'data-addable': optionsWithInfo.value.filter(option => option.selected).length < normalized.max,
      'data-removable': optionsWithInfo.value.filter(option => option.selected).length > normalized.min,
      'data-total-length': normalized.options.length,
      'data-multiple': props.multiple,
      'data-loading': props.loading,
      'data-disabled': props.disabled,
    }))
    provide('dataAttrs', dataAttrs)

    const innerPlaceholder = computed(() => {
      const selectedOptions = optionsWithInfo.value.filter(option => option.selected).filter(option => !option.group)

      if (props.multiple) {
        if (selectedOptions.length === 0) {
          return props.placeholder
        } else if (selectedOptions.length === 1) {
          return '1 option selected'
        } else {
          return selectedOptions.length + ' options selected'
        }
      } else {
        if (selectedOptions.length === 0) {
          return props.placeholder
        } else {
          return selectedOptions[0].label + ''
        }
      }
    })

    const direction = ref()
    watch(
      () => [props.openDirection, isFocusing.value],
      () => {
        direction.value = props.openDirection ?? calcPreferredDirection() ?? 'bottom'
      },
      { immediate: true },
    )
    function calcPreferredDirection() {
      if (wrapper.value === undefined) return
      if (window === undefined) return

      const spaceBelow = window.innerHeight - wrapper.value.getBoundingClientRect().bottom
      const hasEnoughSpaceBelow = spaceBelow >= props.maxHeight
      return hasEnoughSpaceBelow ? 'bottom' : 'top'
    }

    return {
      instance,

      isFocusing,
      wrapper,
      dropdown,
      input,
      focus,
      blur,
      toggle,

      searchingInputValue,
      handleInputForInput,
      handleChangeForInput,
      handleFocusForInput,
      handleBlurForInput,

      optionsWithInfo,
      addOrRemoveOption,

      dataAttrs,

      innerPlaceholder,

      highlightedOriginalIndex,
      pointerForward,
      pointerBackward,
      pointerFirst,
      pointerLast,
      typeAhead,
      pointerSet,

      direction,
    }
  },
  components: {
    VInput,
    VTags,
    VDropdown,
  },
}

VueSelect.__VERSION__ = version

export default VueSelect
</script>
