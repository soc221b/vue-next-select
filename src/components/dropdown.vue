<template>
  <ul class="vue-dropdown" @mousedown.prevent :style="{ top: headerHeight }" v-bind="dataAttrs">
    <template v-for="option of modelValue" :key="option.key">
      <li
        v-if="option.visible && option.hidden === false"
        @click="handleClick($event, option)"
        class="vue-dropdown-item"
        :class="{ selected: option.selected, disabled: option.disabled }"
      >
        <slot :option="option">
          <span>{{ option.label }}</span>
        </slot>
      </li>
    </template>
  </ul>
</template>

<script>
import { ref, inject } from 'vue'

export default {
  inheritAttrs: false,
  name: 'vue-dropdown',
  props: {
    modelValue: {
      required: true,
      type: Array,
      validator(modelValue) {
        return modelValue.every(option => {
          return typeof option.key !== undefined && option.label !== undefined && typeof option.selected === 'boolean'
        })
      },
    },
    headerHeight: {
      required: true,
      type: String,
    },
  },
  emits: ['click'],
  setup(props, context) {
    const dataAttrs = inject('dataAttrs')

    const handleClick = (event, option) => {
      if (option.disabled) return
      context.emit('click', event, option)
    }

    return {
      dataAttrs,
      handleClick,
    }
  },
}
</script>
