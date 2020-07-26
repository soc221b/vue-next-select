<template>
  <div class="vue-select-input-wrapper">
    <input
      ref="input"
      class="vue-select-input"
      :modelValue="modelValue"
      :placeholder="placeholder"
      :disabled="isDisabled"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.esc.exact="handleEscape"
    />
    <span v-if="isLoading" class="vue-select-dropdown-loading">
      <div></div>
      <div></div>
      <div></div>
    </span>
    <span v-else class="vue-select-dropdown-icon" :class="{ active: isOpen }"></span>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  inheritAttrs: false,
  name: 'vue-select-input',
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
    isLoading: {
      required: true,
      type: Boolean,
    },
    isOpen: {
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
