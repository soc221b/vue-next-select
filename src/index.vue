<template>
  <div
    ref="wrapper"
    class="vue-select-wrapper"
  >
    <div
      class="vue-select"
    >
      <v-input
        v-if="searchable"
        ref="input"
        v-model="searchingInputValue"
        :isDisabled="isDisabled"
        :placeholder="placeholder"
        @input="handleInputForInput"
        @change="handleChangeForInput"
        @focus="handleFocusForInput"
        @blur="handleBlurForInput"
        @escape="handleEscapeForInput"
      ></v-input>
      <div
        v-else
        ref="input"
      >
        {{ placeholder }}
      </div>

      <span v-if="isLoading" class="vue-select-dropdown-loading">
        <div></div>
        <div></div>
        <div></div>
      </span>
      <span v-else class="vue-select-dropdown-icon" :class="{ active: isOpen }"></span>
    </div>

    <v-dropdown
      v-show="isOpen"
      v-model="multipleSelectValue"
      :options="options"
      :allow-empty="allowEmpty"
      :multiple="multiple"
      :min="min"
      :max="max"
      :track-by="trackBy"
      :label-by="labelBy"
      :value-by="valueBy"
      :hide-selected="hideSelected"
      @open="handleOpenForDropdown"
      @close="handleCloseForDropdown"
      @select="handleSelectForDropdown"
      @remove="handleRemoveForDropdown"
    >
      <template #label="{ scope }">
        <slot name="label" :scope="scope"></slot>
      </template>
    </v-dropdown>
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
    searchable: {
      default: false,
      type: Boolean,
    },
    clearOnSelect: {
      default: false,
      type: Boolean,
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
          if (input.value._) input.value._.refs.input.focus()
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

    const multipleSelectValue = ref(props.multiple ? [...props.modelValue] : [props.modelValue])
    const handleOpenForDropdown = event => {
      context.emit('open', event)
    }
    const handleCloseForDropdown = event => {
      context.emit('close', event)
    }
    const handleSelectForDropdown = option => {
      context.emit('select', option)
      if (props.clearOnSelect) {
        searchingInputValue.value = ''
      }
      if (props.closeOnSelect) {
        isOpen.value = false
      }
    }
    const handleRemoveForDropdown = option => {
      context.emit('remove', option)
    }
    watch(
      () => multipleSelectValue,
      () => {
        if (props.multiple) {
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
        ? (option) => props.trackBy.split('.').reduce((value, key) => value[key], option)
        : (option) => option

    const labelBy = typeof props.labelBy === 'function'
      ? props.labelBy
      : typeof props.labelBy === 'string'
        ? (option) => props.labelBy.split('.').reduce((value, key) => value[key], option)
        : (option) => option

    const valueBy = typeof props.valueBy === 'function'
      ? props.valueBy
      : typeof props.valueBy === 'string'
        ? (option) => props.valueBy.split('.').reduce((value, key) => value[key], option)
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
      labelBy,
      valueBy,
    }
  },
  components: {
    VInput,
    VDropdown,
  },
}
</script>
