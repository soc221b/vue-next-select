<template>
  <div
    ref="wrapper"
    class="vue-select"
  >
    <v-input
      ref="input"
      v-model="searchingInputValue"
      :isOpen="isOpen"
      :isDisabled="isDisabled"
      :isLoading="isLoading"
      :placeholder="placeholder"
      @input="handleInputForInput"
      @change="handleChangeForInput"
      @focus="handleFocusForInput"
      @blur="handleBlurForInput"
      @escape="handleEscapeForInput"
    ></v-input>

    <v-dropdown
      v-show="isOpen"
      v-model="multipleSelectValue"
      :options="options"
      :canBeEmpty="canBeEmpty"
      :isMultiple="isMultiple"
      :minLength="minLength"
      :maxLength="maxLength"
      :track-by="trackBy"
      @open="handleOpenForDropdown"
      @close="handleCloseForDropdown"
      @select="handleSelectForDropdown"
      @remove="handleRemoveForDropdown"
    ></v-dropdown>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { default as VInput } from './components/input.vue'
import { default as VDropdown } from './components/dropdown.vue'

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
    closeOnSelect: {
      default: false,
      type: Boolean,
    },
    trackBy: {
      type: [String, Function],
    },

    isDisabled: {
      default: false,
      type: Boolean,
    },
    isLoading: {
      default: false,
      type: Boolean,
    },
    placeholder: {
      default: 'Select option',
      type: String,
    },
  },
  setup(props, context) {
    const wrapper = ref(null)
    const input = ref(null)
    const isOpen = ref(false)
    const handleEscapeForInput = event => {
      isOpen.value = false
    }
    const handleClickForWindow = event => {
      if (!event) return
      if (!event.target) return

      let el = event.target
      while (el) {
        if (el === wrapper.value) {
          isOpen.value = true
          input.value._.refs.input.focus()
          return
        }
        el = el.parentElement
      }
      isOpen.value = false
    }
    onMounted(() => {
      window.addEventListener('click', handleClickForWindow)
    })
    onUnmounted(() => {
      window.removeEventListener('click', handleClickForWindow)
    })

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
    const trackBy = typeof props.trackBy === 'function'
      ? props.trackBy
      : typeof props.trackBy === 'string'
        ? (option) => trackBy.split('.').reduce((value, key) => value[key], option)
        : (option) => option

    return {
      isOpen,
      input,
      wrapper,
      handleEscapeForInput,

      searchingInputValue,
      handleInputForInput,
      handleChangeForInput,
      handleFocusForInput,
      handleBlurForInput,

      multipleSelectValue,
      handleOpenForDropdown,
      handleCloseForDropdown,
      handleSelectForDropdown,
      handleRemoveForDropdown,
      trackBy,
    }
  },
  components: {
    VInput,
    VDropdown,
  },
}
</script>
