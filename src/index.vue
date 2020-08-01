<template>
  <div ref="wrapper" class="vue-select" @click="focus">
    <div class="vue-select-header">
      <template v-if="taggable">
        <v-tag :modelValue="tagSelectedOptions" class="vue-select-tag" :class="{ ellipsis }">
          <template #default="{ option }">
            <slot name="tag-item" :option="option.originalOption">
              <span>{{ option.label }}</span>
              <img
                src="./images/delete.svg"
                alt="delete tag"
                class="icon-delete"
                @click="() => addOrRemoveOption($event, option)"
              />
            </slot>
          </template>
        </v-tag>
        <span class="icon-arrow-downward" :class="{ active: isFocusing }" @click="close"></span>
      </template>

      <template v-else>
        <v-input
          v-if="searchable"
          ref="input"
          v-model="searchingInputValue"
          :disabled="disabled"
          :placeholder="placeholder"
          @input="handleInputForInput"
          @change="handleChangeForInput"
          @focus="handleFocusForInput"
          @blur="handleBlurForInput"
          @escape="close"
          class="vue-select-input"
        ></v-input>
        <div v-else ref="input">
          {{ placeholder }}
        </div>

        <span v-if="loading" class="icon-loading">
          <div></div>
          <div></div>
          <div></div>
        </span>
        <span v-else class="icon-arrow-downward" :class="{ active: isFocusing }" @click="close"></span>
      </template>
    </div>

    <template v-if="isFocusing">
      <template v-if="taggable && searchable">
        <v-input
          ref="input"
          v-model="searchingInputValue"
          :disabled="disabled"
          :placeholder="placeholder"
          @input="handleInputForInput"
          @change="handleChangeForInput"
          @focus="handleFocusForInput"
          @blur="handleBlurForInput"
          @escape="close"
          class="vue-select-input"
        >
          <template #append>
            <span v-if="loading" class="icon-loading">
              <div></div>
              <div></div>
              <div></div>
            </span>
          </template>
        </v-input>
      </template>

      <v-dropdown v-model="dropdownSelectedOptions" @click="handleClickForDropdown" class="vue-select-dropdown">
        <template #default="{ option }">
          <slot name="dropdown-item" :option="option.originalOption">
            <span>{{ option.label }}</span>
          </slot>
        </template>
      </v-dropdown>
    </template>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { default as VInput } from './components/input.vue'
import { default as VTag } from './components/tag.vue'
import { default as VDropdown } from './components/dropdown.vue'
import { addOption, removeOption, getOptionByValue, hasOption, isSameOption } from './crud'
import useFocus from './useFocus'
import normalize from './normalize'

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
      type: Array,
    },
    allowEmpty: {
      default: false,
      type: Boolean,
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
    searchable: {
      default: false,
      type: Boolean,
    },
    clearOnSelect: {
      default: false,
      type: Boolean,
    },

    taggable: {
      default: false,
      type: Boolean,
    },
    ellipsis: {
      default: false,
      type: Boolean,
    },
  },
  setup(props, context) {
    const { trackBy, labelBy, valueBy } = normalize(props)

    // focus
    const wrapper = ref(null)
    const ignoreClasses = ['vue-select-tag', 'icon-delete']
    const { isFocusing } = useFocus({ wrapperRef: wrapper, ignoreClasses })
    const input = ref(null)
    watch(
      () => isFocusing.value,
      () => {
        if (isFocusing.value) context.emit('open')
        else context.emit('close')
        setTimeout(() => focus())
      },
    )
    const focus = () => {
      if (isFocusing.value && input.value && input.value._) input.value._.refs.input.focus()
    }
    const close = () => {
      const oldIsFocusing = isFocusing.value
      setTimeout(() => {
        if (oldIsFocusing === true) isFocusing.value = false
      })
    }

    // input
    const searchingInputValue = ref('')
    const handleInputForInput = event => {
      searchingInputValue.value = event.target.value
      context.emit('search-input', event)
    }
    const handleChangeForInput = event => {
      searchingInputValue.value = event.target.value
      context.emit('search-change', event)
    }
    const handleFocusForInput = event => {
      context.emit('focus', event)
    }
    const handleBlurForInput = event => {
      context.emit('blur', event)
    }

    const selectedOptions = ref([])
    if (props.multiple) {
      props.modelValue.forEach(value => {
        const option = getOptionByValue(props.options, value, { valueBy })
        selectedOptions.value = addOption(selectedOptions.value, option, { max: props.max, valueBy })
      })
    } else {
      const option = getOptionByValue(props.options, modelValue, { valueBy })
      selectedOptions.value = addOption(selectedOptions.value, option, { max: props.max, valueBy })
    }
    const addOrRemoveOption = (event, option) => {
      option = getOptionByValue(props.options, option.id, { valueBy })
      if (hasOption(selectedOptions.value, option, { valueBy })) {
        selectedOptions.value = removeOption(selectedOptions.value, option, { min: props.min, valueBy })
        context.emit('remove', option)
      } else {
        selectedOptions.value = addOption(selectedOptions.value, option, { max: props.max, valueBy })
        context.emit('select', option)
      }
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
        focus()
      },
      { deep: true },
    )

    const handleClickForDropdown = (event, option) => addOrRemoveOption(event, option)
    const handleClickForTag = (event, option) => addOrRemoveOption(event, option)
    const dropdownSelectedOptions = computed(() => {
      const selectedValueSet = new Set(selectedOptions.value.map(option => valueBy(option)))
      return (props.visibleOptions || props.options).map(option => ({
        id: trackBy(option),
        label: labelBy(option),
        active: selectedValueSet.has(option.value),
        originalOption: option,
      }))
    })
    const tagSelectedOptions = computed(() => {
      const selectedValueSet = new Set(selectedOptions.value.map(option => valueBy(option)))
      return props.options.map(option => ({
        id: trackBy(option),
        label: labelBy(option),
        active: selectedValueSet.has(option.value),
        originalOption: option,
      }))
    })
    watch(
      () => props.options,
      () => {
        const selectedValueSet = new Set(selectedOptions.value.map(option => option.value))
        selectedOptions.value = props.options.filter(option => selectedValueSet.has(valueBy(option)))
      },
      { deep: true },
    )

    return {
      isFocusing,
      input,
      wrapper,
      close,

      searchingInputValue,
      handleInputForInput,
      handleChangeForInput,
      handleFocusForInput,
      handleBlurForInput,

      handleClickForDropdown,
      handleClickForTag,
      dropdownSelectedOptions,
      tagSelectedOptions,

      addOrRemoveOption,
      focus,
    }
  },
  components: {
    VInput,
    VTag,
    VDropdown,
  },
}
</script>
