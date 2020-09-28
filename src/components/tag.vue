<template>
  <ul
    class="vue-tags"
    @mousedown.prevent
    :class="{ collapsed: collapseTags }"
    :data-not-selected-length="modelValue.length - selectedOptions.length"
    :data-selected-length="selectedOptions.length"
    :data-total-length="modelValue.length"
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
import { computed } from 'vue'

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
    const selectedOptions = computed(() => props.modelValue.filter(option => option.selected))

    const handleClick = (event, option) => {
      context.emit('click', event, option)
    }

    return {
      selectedOptions,
      handleClick,
    }
  },
}
</script>
