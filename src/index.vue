<template>
  <div
    ref="wrapper"
    class="vue-select"
    :class="{ disabled }"
    :tabindex="searchable ? -1 : tabindex"
    @focus="focus"
    @blur="searchable ? false : blur"
  >
    <div class="vue-select-header">
      <template
        v-if="(multiple && taggable && modelValue.length === 0) || (searchable === false && taggable === false)"
      >
        <div class="vue-input">
          <input :placeholder="placeholder" disabled />
        </div>
      </template>

      <template v-if="multiple && taggable">
        <v-tag :modelValue="tagSelectedOptions" class="vue-select-tag" :class="{ collapsed: collapseTags }">
          <template #default="{ option }">
            <slot name="tag" :option="option.originalOption">
              <span>{{ option.label }}</span>
              <img
                src="./images/delete.svg"
                alt="delete tag"
                class="icon delete"
                @click="() => addOrRemoveOption($event, option)"
              />
            </slot>
          </template>
        </v-tag>
        <span
          class="icon arrow-downward"
          :class="{ active: isFocusing }"
          @click="toggle"
          @mousedown.prevent.stop
        ></span>
      </template>

      <template v-else>
        <v-input
          v-if="searchable"
          v-model="searchingInputValue"
          :disabled="disabled"
          :placeholder="searchPlaceholder"
          @input="handleInputForInput"
          @change="handleChangeForInput"
          @focus="handleFocusForInput"
          @blur="handleBlurForInput"
          @escape="blur"
          :tabindex="tabindex"
          class="vue-select-input"
        ></v-input>

        <span v-if="loading" class="icon loading">
          <div></div>
          <div></div>
          <div></div>
        </span>
        <span
          v-else
          class="icon arrow-downward"
          :class="{ active: isFocusing }"
          @click="toggle"
          @mousedown.prevent.stop
        ></span>
      </template>
    </div>

    <template v-if="isFocusing">
      <template v-if="multiple && taggable && searchable">
        <v-input
          v-model="searchingInputValue"
          :disabled="disabled"
          :placeholder="searchPlaceholder"
          @input="handleInputForInput"
          @change="handleChangeForInput"
          @focus="handleFocusForInput"
          @blur="handleBlurForInput"
          @escape="blur"
          :tabindex="tabindex"
          class="vue-select-input"
        >
          <template #append>
            <span v-if="loading" class="icon loading">
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
import { ref, computed, watch } from 'vue'
import { default as VInput } from './components/input.vue'
import { default as VTag } from './components/tag.vue'
import { default as VDropdown } from './components/dropdown.vue'
import { addOption, removeOption, getOptionByValue, hasOption, isSameOption } from './crud'
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
  },
  emits: ['update:modelValue', 'select', 'remove', 'open', 'close', 'search-input', 'search-change', 'focus', 'blur'],
  setup(props, context) {
    const { trackBy, labelBy, valueBy, min, max } = normalize(props)

    // focus
    const wrapper = ref(null)
    const isFocusing = ref(false)
    watch(
      () => isFocusing.value,
      () => {
        if (isFocusing.value) context.emit('open')
        else context.emit('close')
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
      context.emit('focus', event)
    }
    const handleBlurForInput = event => {
      blur()
      context.emit('blur', event)
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
    const dropdownSelectedOptions = computed(() => {
      const selectedValueSet = new Set(selectedOptions.value.map(option => valueBy(option)))
      return (props.visibleOptions || props.options)
        .filter(option => (props.hideSelected ? selectedValueSet.has(valueBy(option)) === false : true))
        .map(option => ({
          key: trackBy(option),
          label: labelBy(option),
          selected: selectedValueSet.has(valueBy(option)),
          originalOption: option,
        }))
    })
    const tagSelectedOptions = computed(() => {
      const selectedValueSet = new Set(selectedOptions.value.map(option => valueBy(option)))
      return props.options.map(option => ({
        key: trackBy(option),
        label: labelBy(option),
        selected: selectedValueSet.has(valueBy(option)),
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
      wrapper,
      focus,
      blur,
      toggle,

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
    }
  },
  components: {
    VInput,
    VTag,
    VDropdown,
  },
}
</script>
