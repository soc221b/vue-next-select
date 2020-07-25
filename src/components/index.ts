import { default as VInput } from './input'
import { default as VMultipleSelect } from './multiple-select'
import { ref, watch } from 'vue'

export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      required: true,
    },
    options: {
      required: true,
      type: Array,
    },
    canBeEmpty: {
      default: false,
      type: Boolean,
    },
    isMultiple: {
      default: false,
      type: Boolean,
    },
    minLength: {
      default: 0,
      type: Number,
    },
    maxLength: {
      default: Infinity,
      type: Number,
    },

    isDisabled: {
      default: false,
      type: Boolean,
    },
    placeholder: {
      default: 'Select option',
      type: String,
    },
  },
  setup(props, context) {
    const searchInputValue = ref('')
    const handleInputForInput = event => {
      context.emit('search-input', event)
    }
    const handleChangeForInput = event => {
      context.emit('search-change', event)
    }
    const handleFocusForInput = event => {
      context.emit('focus', event)
    }
    const handleBlurForInput = event => {
      context.emit('blur', event)
    }

    const multipleSelectValue = ref(props.isMultiple ? [...props.modelValue] : [props.modelValue])
    const handleOpenForDropdown = event => {
      context.emit('open', event)
    }
    const handleCloseForDropdown = event => {
      context.emit('close', event)
    }
    const handleSelectForDropdown = option => {
      context.emit('select', option)
    }
    const handleRemoveForDropdown = option => {
      context.emit('remove', option)
    }
    watch(
      () => multipleSelectValue,
      () => {
        if (props.isMultiple) {
          context.emit('update:modelValue', [...multipleSelectValue.value])
        } else {
          if (multipleSelectValue.value.length) {
            context.emit('update:modelValue', multipleSelectValue.value[0])
          } else {
            context.emit('update:modelValue', null)
          }
        }
      },
      { deep: true },
    )

    return {
      searchInputValue,
      handleInputForInput,
      handleChangeForInput,
      handleFocusForInput,
      handleBlurForInput,

      multipleSelectValue,
      handleOpenForDropdown,
      handleCloseForDropdown,
      handleSelectForDropdown,
      handleRemoveForDropdown,
    }
  },
  components: {
    VInput,
    VMultipleSelect,
  },
  template: `
    <v-input
      v-model="searchInputValue"
      :isDisabled="isDisabled"
      :placeholder="placeholder"
      @input="handleInputForInput"
      @change="handleChangeForInput"
      @focus="handleFocusForInput"
      @blur="handleBlurForInput"
    ></v-input>

    <v-multiple-select
      v-model="multipleSelectValue"
      :options="options"
      :canBeEmpty="canBeEmpty"
      :isMultiple="isMultiple"
      :minLength="minLength"
      :maxLength="maxLength"
      @open="handleOpenForDropdown"
      @close="handleCloseForDropdown"
      @select="handleSelectForDropdown"
      @remove="handleRemoveForDropdown"
    ></v-multiple-select>
  `,
}
