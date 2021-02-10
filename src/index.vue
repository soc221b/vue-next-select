<template>
  <div
    ref="wrapper"
    class="vue-select"
    :class="{ disabled }"
    :tabindex="isFocusing ? -1 : tabindex"
    @focus="focus"
    @blur="() => (searchable ? false : blur())"
    :data-is-focusing="dataAttrs.isFocusing"
    :data-visible-length="dataAttrs.visibleLength"
    :data-not-selected-length="dataAttrs.notSelectedLength"
    :data-selected-length="dataAttrs.selectedLength"
    :data-total-length="dataAttrs.totalLength"
  >
    <div ref="header" class="vue-select-header">
      <template
        v-if="(multiple && taggable && modelValue.length === 0) || (searchable === false && taggable === false)"
      >
        <div class="vue-input">
          <input :placeholder="innerPlaceholder" readonly @click="focus" />
        </div>
      </template>

      <template v-if="multiple && taggable">
        <v-tags :modelValue="optionsWithInfo" :collapse-tags="collapseTags" tabindex="-1" @click="focus">
          <template #default="{ option }">
            <slot name="tag" :option="option.originalOption">
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
        <span
          class="icon arrow-downward"
          :class="{ active: isFocusing }"
          @click="toggle"
          @mousedown.prevent.stop
        ></span>
      </template>

      <template v-else>
        <v-input
          ref="input"
          v-if="searchable"
          v-model="searchingInputValue"
          :disabled="disabled"
          :placeholder="isFocusing ? searchPlaceholder : innerPlaceholder"
          @input="handleInputForInput"
          @change="handleChangeForInput"
          @focus="handleFocusForInput"
          @blur="handleBlurForInput"
          @escape="blur"
          :autofocus="autofocus || (taggable && searchable)"
          :tabindex="tabindex"
        ></v-input>

        <span v-show="loading" class="icon loading">
          <div></div>
          <div></div>
          <div></div>
        </span>
        <span
          v-show="loading === false"
          class="icon arrow-downward"
          :class="{ active: isFocusing }"
          @click="toggle"
          @mousedown.prevent.stop
        ></span>
      </template>
    </div>

    <template v-if="multiple && taggable && searchable">
      <v-input
        v-show="isFocusing"
        ref="input"
        v-model="searchingInputValue"
        :disabled="disabled"
        :placeholder="searchPlaceholder"
        @input="handleInputForInput"
        @change="handleChangeForInput"
        @focus="handleFocusForInput"
        @blur="handleBlurForInput"
        @escape="blur"
        :tabindex="tabindex"
        :autofocus="autofocus || (taggable && searchable)"
      >
        <template #append>
          <span v-show="loading" class="icon loading">
            <div></div>
            <div></div>
            <div></div>
          </span>
        </template>
      </v-input>
    </template>

    <v-dropdown
      v-show="isFocusing"
      v-model="optionsWithInfo"
      @click="addOrRemoveOption"
      :header-height="headerAndInputHeight"
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
import { ref, computed, watch, provide } from 'vue'
import VInput from './components/input.vue'
import VTags from './components/tags.vue'
import VDropdown from './components/dropdown.vue'
import { addOption, removeOption, getOptionByValue, hasOption, isSameOption } from './crud'
import normalize from './normalize'
import { useHeight } from './hooks'

export default {
  name: 'vue-select',
  inheritAttrs: false,
  props: {
    modelValue: {
      required: true,
    },
    emptyModelValue: {
      default: null,
    },
    options: {
      required: true,
      type: Array,
    },
    visibleOptions: {
      type: [Array, null],
      default: null,
    },
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
    closeOnSelect: {
      default: false,
      type: Boolean,
    },
    clearOnSelect: {
      default: false,
      type: Boolean,
    },
    trackBy: {
      type: [String, Function],
    },
    hideSelected: {
      default: false,
      type: Boolean,
    },
    labelBy: {
      type: [String, Function],
    },
    valueBy: {
      type: [String, Function],
    },

    disabled: {
      default: false,
      type: Boolean,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    placeholder: {
      default: 'Select option',
      type: String,
    },
    searchPlaceholder: {
      default: 'Type to search',
      type: String,
    },
    searchable: {
      default: false,
      type: Boolean,
    },

    taggable: {
      default: false,
      type: Boolean,
    },
    collapseTags: {
      default: false,
      type: Boolean,
    },
    tabindex: {
      default: 0,
      type: Number,
    },
    autofocus: {
      default: false,
      type: Boolean,
    },
  },
  emits: [
    'update:modelValue',
    'selected',
    'removed',
    'opened',
    'closed',
    'search:input',
    'search:change',
    'search:focus',
    'search:blur',
  ],
  setup(props, context) {
    const { trackBy, labelBy, valueBy, min, max, options } = normalize(props)

    const wrapper = ref()
    const input = ref()
    const isFocusing = ref(false)
    watch(
      () => isFocusing.value,
      () => {
        if (isFocusing.value) {
          context.emit('opened')
          if (props.searchable) {
            if (input.value && input.value._.refs.input !== document.activeElement) {
              input.value._.refs.input.focus()
            }
            context.emit('search:focus')
          } else {
            wrapper.value.focus()
          }
        } else {
          if (props.searchable) {
            if (input.value && input.value._.refs.input === document.activeElement) {
              input.value._.refs.input.blur()
            }
            context.emit('search:blur')
          } else {
            wrapper.value.blur()
          }
          context.emit('closed')
        }
      },
    )
    const focus = () => {
      if (props.disabled) return
      isFocusing.value = true
    }
    const blur = () => {
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

    const header = ref()
    const headerHeight = useHeight(header, () => props.modelValue)
    const inputHeight = computed(() => (props.searchable && props.multiple && props.taggable ? '22px' : '0px'))
    const headerAndInputHeight = computed(() => parseFloat(headerHeight.value) + parseFloat(inputHeight.value) + 'px')

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

    // sync model value
    const normalizedModelValue = ref([])
    const isSynchronoused = () => {
      if (props.multiple) {
        if (Array.isArray(props.modelValue) === false) return false
        if (normalizedModelValue.value.length !== props.modelValue.length) return false
        if (
          Object.keys(normalizedModelValue.value).some(
            index =>
              normalizedModelValue.value[index] !==
              getOptionByValue(options.value, props.modelValue[index], { valueBy: valueBy.value }),
          )
        )
          return false
      } else {
        if (normalizedModelValue.value.length === 0 && props.modelValue !== props.emptyModelValue) return false
        if (normalizedModelValue.value.length === 1 && props.modelValue === props.emptyModelValue) return false
        if (
          normalizedModelValue.value[0] !==
          getOptionByValue(options.value, props.modelValue, { valueBy: valueBy.value })
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
        const option = getOptionByValue(options.value, value, { valueBy: valueBy.value })
        // guarantee options has modelValue
        if (hasOption(options.value, option, { valueBy: valueBy.value }) === false) continue
        normalizedModelValue.value = addOption(normalizedModelValue.value, option, {
          max: Infinity,
          valueBy: valueBy.value,
        })
      }
    }
    syncFromModelValue()
    watch(
      () => props.modelValue,
      () => syncFromModelValue(),
      { deep: true },
    )

    const syncToModelValue = () => {
      if (isSynchronoused()) return
      const selectedValues = normalizedModelValue.value.map(option => valueBy.value(option))
      if (props.multiple) {
        context.emit('update:modelValue', selectedValues)
      } else {
        if (selectedValues.length) context.emit('update:modelValue', selectedValues[0])
        else context.emit('update:modelValue', props.emptyModelValue)
      }
    }
    watch(
      () => normalizedModelValue,
      () => syncToModelValue(),
      { deep: true },
    )

    // guarantee options has modelValue
    watch(
      () => options.value,
      () => {
        const selectedValueSet = new Set(normalizedModelValue.value.map(option => valueBy.value(option)))
        normalizedModelValue.value = options.value.filter(option => selectedValueSet.has(valueBy.value(option)))
      },
      { deep: true },
    )

    const addOrRemoveOption = (event, option) => {
      if (props.disabled) return

      option = option.originalOption
      if (hasOption(normalizedModelValue.value, option, { valueBy: valueBy.value })) {
        normalizedModelValue.value = removeOption(normalizedModelValue.value, option, {
          min: min.value,
          valueBy: valueBy.value,
        })
        context.emit('removed', option)
      } else {
        if (!props.multiple) {
          const removingOption = normalizedModelValue.value[0]
          normalizedModelValue.value = removeOption(normalizedModelValue.value, normalizedModelValue.value[0], {
            min: 0,
            valueBy: valueBy.value,
          })
          context.emit('removed', removingOption)
        }
        normalizedModelValue.value = addOption(normalizedModelValue.value, option, {
          max: max.value,
          valueBy: valueBy.value,
        })
        context.emit('selected', option)
      }
      if (props.closeOnSelect === true) isFocusing.value = false
      if (props.clearOnSelect === true && searchingInputValue.value) {
        // simulate clear input value
        input.value._.refs.input.value = ''
        input.value._.refs.input.dispatchEvent(new Event('input'))
        input.value._.refs.input.dispatchEvent(new Event('change'))
      }
    }

    const optionsWithInfo = computed(() => {
      const selectedValueSet = new Set(normalizedModelValue.value.map(option => valueBy.value(option)))
      const visibleValueSet =
        props.visibleOptions !== null
          ? new Set(props.visibleOptions.map(option => valueBy.value(option)))
          : new Set(options.value.map(option => valueBy.value(option)))

      return options.value.map(option => ({
        key: trackBy.value(option),
        label: labelBy.value(option),
        selected: selectedValueSet.has(valueBy.value(option)),
        visible: visibleValueSet.has(valueBy.value(option)),
        hidden: props.hideSelected ? selectedValueSet.has(valueBy.value(option)) : false,
        originalOption: option,
      }))
    })

    const dataAttrs = computed(() => ({
      isFocusing: isFocusing.value,
      visibleLength: optionsWithInfo.value.filter(option => option.visible && option.hidden === false).length,
      notSelectedLength: options.value.length - optionsWithInfo.value.filter(option => option.selected).length,
      selectedLength: optionsWithInfo.value.filter(option => option.selected).length,
      totalLength: options.value.length,
    }))
    provide('dataAttrs', dataAttrs)

    const innerPlaceholder = computed(() => {
      const selectedOptions = optionsWithInfo.value.filter(option => option.selected)

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
          return selectedOptions[0].label
        }
      }
    })

    return {
      isFocusing,
      wrapper,
      input,
      focus,
      blur,
      toggle,

      header,
      headerAndInputHeight,

      searchingInputValue,
      handleInputForInput,
      handleChangeForInput,
      handleFocusForInput,
      handleBlurForInput,

      optionsWithInfo,
      addOrRemoveOption,

      dataAttrs,

      innerPlaceholder,
    }
  },
  components: {
    VInput,
    VTags,
    VDropdown,
  },
}
</script>
