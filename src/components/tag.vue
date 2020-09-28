<template>
  <ul
    class="vue-tags"
    @mousedown.prevent
    :class="{ collapsed: collapseTags }"
    :data-is-focusing="dataAttrs.isFocusing"
    :data-visible-length="dataAttrs.visibleLength"
    :data-not-selected-length="dataAttrs.notSelectedLength"
    :data-selected-length="dataAttrs.selectedLength"
    :data-total-length="dataAttrs.totalLength"
  >
    <template v-for="option of modelValue" :key="option.key">
      <li @click="handleClick($event, option)" class="vue-tag" :class="{ selected: option.selected }">
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

    const handleClick = (event, option) => {
      context.emit('click', event, option)
    }

    return {
      dataAttrs,
      handleClick,
    }
  },
}
</script>
