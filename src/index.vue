<template>
  <div
    ref="wrapperRef"
    class="vs__wrapper"
    :class="{ 'vs-active': isOptionOpen }"
    tabindex="0"
    @focus="toggleDropdown(true)"
    @blur="toggleDropdown(false)"
  >
    <div class="vs__input">
      <div class="vs__input__placeholder" v-if="!selectedlabels.length">{{ placeholder }}&nbsp;</div>
      <template v-for="value in selectedlabels">
        <div :key="value">{{ value }}</div>
      </template>
    </div>

    <div ref="dropdownRef" class="vs__dropdown" v-show="isOptionOpen">
      <template v-for="option in options">
        <div
          :key="option"
          class="vs__dropdown__option"
          @click="optionSelectHandler(option)"
          :class="{
            'vs__dropdown__option-active': isOptionSelected(option),
          }"
        >
          {{ option }} {{ isOptionSelected(option) }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted, reactive, computed, watchEffect, onUpdated } from 'vue'
import { createPopper } from '@popperjs/core'
// import VInput from './components/input.vue'
// import VDropdown from './components/dropdown/index.vue'

export default {
  name: 'vue-select',
  inheritAttrs: false,
  // components: {
  //   VInput,
  //   VDropdown,
  // },
  props: {
    modelValue: {
      required: true,
    },
    label: {
      type: String,
    },
    options: {
      type: Array,
      validator: arr => Array.isArray(arr),
    },

    allowEmpty: {
      default: false,
      type: Boolean,
    },
    multi: {
      default: false,
      type: Boolean,
    },
    searchable: {
      default: false,
      type: Boolean,
    },
    closeOnSelect: {
      default: false,
      type: Boolean,
    },

    disabled: {
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
    trackBy: {},
  },
  setup(props, context) {
    const isOptionOpen = ref(false)
    const toggleDropdown = isOpen => {
      isOptionOpen.value = isOpen
    }

    const selectedOptions = ref([])
    const selectedlabels = computed(() => {
      if (!props.label) return selectedOptions.value
      return selectedOptions.value.map(node => node[props.label] || node)
    })
    const optionSelectHandler = option => {
      if (!props.multi) {
        selectedOptions.value[0] = option
        context.emit('update:modelValue', selectedOptions.value[0])
      } else {
        selectedOptions.value.push(option)
        context.emit('update:modelValue', selectedOptions.value)
      }
    }
    const isOptionSelected = option => {
      if (!selectedOptions.value.length) return false
      if (typeof option === 'object') {
        return
      } else {
        return selectedOptions.value.some(node => node === option)
      }
    }

    const wrapperRef = ref(null)
    const dropdownRef = ref(null)
    let popperInstance = null
    onMounted(() => {
      popperInstance = createPopper(wrapperRef.value, dropdownRef.value, {
        placement: 'bottom',
      })
    })

    onUpdated(() => {
      popperInstance && popperInstance.update()
    })

    return {
      // used to contorl if options been shown
      isOptionOpen,
      toggleDropdown,

      // do action when option was clicked
      selectedlabels,
      optionSelectHandler,
      isOptionSelected,

      wrapperRef,
      dropdownRef,

      track: props.track,
      placeholder: props.placeholder,
    }
    // const selectEl = ref(null)
    // const handleClickForWindow = event => {
    //   if (!event || !event.target) return
    //   let el = event.target
    //   while (el) {
    //     if (el === selectEl) {
    //       state.isOpen = true
    //       input.value._.refs.input.focus()
    //       return
    //     }
    //     el = el.parentElement
    //   }
    //   state.isOpen = false
    // }
    //   const onWindowClick = event => {
    //   state.isOpen = false
    // }

    // const test  = _.optionHandler(props)
    // onMounted(() => {
    //   console.log(props);
    //   window.addEventListener('click', handleClickForWindow)
    // })
    // onUnmounted(() => {
    //   window.removeEventListener('click', handleClickForWindow)
    // })

    // const searchingInputValue = ref('')
    // const handleInputForInput = event => {
    //   searchingInputValue.value = event.target.value
    //   context.emit('search-input', event)
    // }
    // const handleChangeForInput = event => {
    //   searchingInputValue.value = event.target.value
    //   context.emit('search-change', event)
    // }
    // const handleFocusForInput = event => {
    //   context.emit('focus', event)
    // }
    // const handleBlurForInput = event => {
    //   context.emit('blur', event)
    // }

    // const multipleSelectValue = ref(props.isMultiple ? [...props.modelValue] : [props.modelValue])
    // const handleOpenForDropdown = event => {
    //   context.emit('open', event)
    // }
    // const handleCloseForDropdown = event => {
    //   context.emit('close', event)
    // }
    // const handleSelectForDropdown = option => {
    //   context.emit('select', option)
    // }
    // const handleRemoveForDropdown = option => {
    //   context.emit('remove', option)
    // }
    // watch(
    //   () => multipleSelectValue,
    //   () => {
    //     if (props.isMultiple) {
    //       context.emit('update:modelValue', [...multipleSelectValue.value])
    //     } else {
    //       if (multipleSelectValue.value.length) {
    //         context.emit('update:modelValue', multipleSelectValue.value[0])
    //       } else {
    //         context.emit('update:modelValue', null)
    //       }
    //     }
    //   },
    //   { deep: true },
    // )

    // return {
    //   ...state,
    //   selectEl,
    //   // handleEscapeForInput,

    //   // searchingInputValue,
    //   // handleInputForInput,
    //   // handleChangeForInput,
    //   // handleFocusForInput,
    //   // handleBlurForInput,

    //   // multipleSelectValue,
    //   // handleOpenForDropdown,
    //   // handleCloseForDropdown,
    //   // handleSelectForDropdown,
    //   // handleRemoveForDropdown,
    // }
  },
}
</script>
