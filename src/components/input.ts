export default {
  inheritAttrs: false,
  name: 'v-input',
  props: {
    modelValue: {
      required: true,
      type: String,
    },
    placeholder: {
      required: true,
      type: String,
    },
    isDisabled: {
      required: true,
      type: Boolean,
    },
  },
  setup(props, context) {
    const handleInput = event => {
      context.emit('input', event)
      context.emit('update:modelValue', event.target.value)
    }
    const handleChange = event => {
      context.emit('change', event)
      context.emit('update:modelValue', event.target.value)
    }
    const handleFocus = event => {
      context.emit('focus', event)
    }
    const handleBlur = event => {
      context.emit('blur', event)
    }

    return {
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
    }
  },
  template: `
    <input
      v-model="modelValue"
      :placeholder="placeholder"
      :disabled="isDisabled"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    >
  `,
}
