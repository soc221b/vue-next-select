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
      :tabindex="tabindex"
    />
    <slot name="append"></slot>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

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
    tabindex: {
      required: true,
      type: Number,
    },
  },
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'escape'],
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
      input.value.blur()
      context.emit('escape', event)
    }
    onMounted(() => {
      input.value.focus()
    })

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
