<template>
  <div class="vue-input">
    <slot name="prepend"></slot>
    <input
      ref="input"
      :autocomplete="autocomplete"
      :modelValue="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.esc.exact="handleEscape"
      :tabindex="tabindex"
      :autofocus="autofocus"
      aria-autocomplete="list"
      :aria-controls="`vs${comboboxUid}-listbox`"
      :aria-labelledby="`vs${comboboxUid}-combobox`"
    />
    <slot name="append"></slot>
  </div>
</template>

<script>
import { ref, onMounted, onUpdated } from 'vue'

export default {
  inheritAttrs: false,
  name: 'vue-input',
  props: {
    autocomplete: {
      required: false,
      type: String
    },
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
    autofocus: {
      required: true,
      type: Boolean,
    },

    comboboxUid: {
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
      if (props.autofocus) input.value.focus()
    })
    onUpdated(() => {
      if (props.autofocus) input.value.focus()
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
