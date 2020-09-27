<template>
  <ul class="vue-dropdown" @mousedown.prevent>
    <template v-for="option of modelValue" :key="option.key">
      <li @click="handleClick($event, option)" class="vue-dropdown-item" :class="{ selected: option.selected }">
        <slot :option="option">
          <span>{{ option.label }}</span>
        </slot>
      </li>
    </template>
  </ul>
</template>

<script>
import { ref, computed } from 'vue'

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
  },
  emits: ['click'],
  setup(props, context) {
    const handleClick = (event, option) => {
      context.emit('click', event, option)
    }

    return {
      handleClick,
    }
  },
}
</script>
