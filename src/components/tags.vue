<template>
  <ul
    class="vue-tags"
    @mousedown.prevent
    :class="{ collapsed: collapseTags }"
    tabindex="-1"
    @click="handleClick"
    v-bind="dataAttrs"
  >
    <template v-for="option of modelValue" :key="option.key">
      <li class="vue-tag" :class="{ selected: option.selected }">
        <slot :option="option">
          <span>{{ option.label }}</span>
        </slot>
      </li>
    </template>
  </ul>
</template>

<script>
import { inject } from 'vue'

export default {
  inheritAttrs: false,
  name: 'vue-tags',
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
    collapseTags: {
      type: Boolean,
    },
  },
  emits: ['click'],
  setup(props, context) {
    const dataAttrs = inject('dataAttrs')

    const handleClick = event => {
      context.emit('click', event)
    }

    return {
      dataAttrs,
      handleClick,
    }
  },
}
</script>
