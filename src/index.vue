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
          <input :placeholder="placeholder" disabled />
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
          :placeholder="searchPlaceholder"
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
      @click="handleClickForDropdown"
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
import { default as VInput } from './components/input.vue'
import { default as VTags } from './components/tags.vue'
import { default as VDropdown } from './components/dropdown.vue'
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
  emits: ['update:modelValue', 'select', 'remove', 'open', 'close', 'search-input', 'search-change', 'focus', 'blur'],
  setup(props, context) {
    const { trackBy, labelBy, valueBy, min, max } = normalize(props)

    const wrapper = ref(null)
    const input = ref(null)
    const isFocusing = ref(false)
    watch(
      () => isFocusing.value,
      () => {
        if (isFocusing.value) {
          context.emit('open')
          if (props.searchable) context.emit('focus')
          // toggle arrow downward icon
          if (input.value && input.value._.refs.input !== document.activeElement) {
            input.value._.refs.input.focus()
          }
        } else {
          // toggle arrow downward icon
          if (input.value && input.value._.refs.input === document.activeElement) {
            input.value._.refs.input.blur()
          }
          if (wrapper.value && wrapper.value === document.activeElement) {
            wrapper.value.blur()
          }
          if (props.searchable) context.emit('blur')
          context.emit('close')
        }
      },
    )
    const focus = () => {
      if (props.disabled) return
      isFocusing.value = true
    }
    const blur = event => {
      isFocusing.value = false
    }
    const toggle = event => {
      isFocusing.value = !isFocusing.value
    }

    const header = ref(null)
    const headerHeight = useHeight(header, () => props.modelValue)
    const inputHeight = ref(props.searchable && props.multiple && props.taggable ? '22px' : '0px')
    const headerAndInputHeight = computed(() => parseFloat(headerHeight.value) + parseFloat(inputHeight.value) + 'px')

    // input
    const searchingInputValue = ref('')
    const handleInputForInput = event => {
      context.emit('search-input', event)
    }
    const handleChangeForInput = event => {
      context.emit('search-change', event)
    }
    const handleFocusForInput = event => {
      focus()
    }
    const handleBlurForInput = event => {
      blur()
    }

    const selectedOptions = ref([])
    if (props.multiple) {
      props.modelValue.forEach(value => {
        const option = getOptionByValue(props.options, value, { valueBy })
        selectedOptions.value = addOption(selectedOptions.value, option, { max: Infinity, valueBy })
      })
    } else {
      if (props.modelValue !== null) {
        const option = getOptionByValue(props.options, props.modelValue, { valueBy })
        selectedOptions.value = addOption(selectedOptions.value, option, { max: Infinity, valueBy })
      }
    }
    const addOrRemoveOption = (event, option) => {
      if (props.disabled) return

      option = option.originalOption
      if (hasOption(selectedOptions.value, option, { valueBy })) {
        selectedOptions.value = removeOption(selectedOptions.value, option, { min, valueBy })
        context.emit('remove', option)
      } else {
        if (!props.multiple) {
          const removingOption = selectedOptions.value[0]
          selectedOptions.value = removeOption(selectedOptions.value, selectedOptions.value[0], { min: 0, valueBy })
          context.emit('remove', removingOption)
        }
        selectedOptions.value = addOption(selectedOptions.value, option, { max, valueBy })
        context.emit('select', option)
      }
      if (props.closeOnSelect === true) isFocusing.value = false
    }
    watch(
      () => selectedOptions,
      () => {
        const selectedValues = selectedOptions.value.map(option => valueBy(option))
        if (props.multiple) {
          context.emit('update:modelValue', selectedValues)
        } else {
          if (selectedValues.length) context.emit('update:modelValue', selectedValues[0])
          else context.emit('update:modelValue', null)
        }
      },
      { deep: true },
    )

    const handleClickForDropdown = (event, option) => addOrRemoveOption(event, option)
    const handleClickForTag = (event, option) => addOrRemoveOption(event, option)

    const optionsWithInfo = computed(() => {
      const selectedValueSet = new Set(selectedOptions.value.map(option => valueBy(option)))
      const visibleValueSet =
        props.visibleOptions !== null
          ? new Set(props.visibleOptions.map(option => valueBy(option)))
          : new Set(props.options.map(option => valueBy(option)))

      return props.options.map(option => ({
        key: trackBy(option),
        label: labelBy(option),
        selected: selectedValueSet.has(valueBy(option)),
        visible: visibleValueSet.has(valueBy(option)),
        hidden: props.hideSelected ? selectedValueSet.has(valueBy(option)) : false,
        originalOption: option,
      }))
    })

    watch(
      () => props.options,
      () => {
        const selectedValueSet = new Set(selectedOptions.value.map(option => valueBy(option)))
        selectedOptions.value = props.options.filter(option => selectedValueSet.has(valueBy(option)))
      },
      { deep: true },
    )

    const dataAttrs = computed(() => ({
      isFocusing: isFocusing.value,
      visibleLength: optionsWithInfo.value.filter(option => option.visible && option.hidden === false).length,
      notSelectedLength: props.options.length - optionsWithInfo.value.filter(option => option.selected).length,
      selectedLength: optionsWithInfo.value.filter(option => option.selected).length,
      totalLength: props.options.length,
    }))
    provide('dataAttrs', dataAttrs)

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

      handleClickForDropdown,
      handleClickForTag,

      optionsWithInfo,
      addOrRemoveOption,

      dataAttrs,
    }
  },
  components: {
    VInput,
    VTags,
    VDropdown,
  },
}
</script>
