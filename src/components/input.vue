<template>
  <div class="vue-input">
    <slot name="prepend"></slot>
    <input
      ref="input"
      :modelValue="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.esc.exact="handleEscape"
    />
    <slot name="append"></slot>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  inheritAttrs: false,
  name: 'vue-input',
  props: {
    modelValue: {
      required: true,
      type: String,
    },
    placeholder: {
      required: true,
      type: String,
    },
    disabled: {
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

    const input = ref(null)
    const handleEscape = event => {
      context.emit('escape', event)
      input.value.blur()
    }

    return {
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,

      input,
      handleEscape,
    }
  },
}
</script>
