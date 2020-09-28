<template>
  <ul
    class="vue-dropdown"
    @mousedown.prevent
    :style="{ top: headerHeight }"
    :data-not-selected-length="modelValue.length - selectedOptions.length"
    :data-selected-length="selectedOptions.length"
    :data-total-length="modelValue.length"
  >
    <template v-for="option of modelValue" :key="option.key">
      <li
        v-if="(hideSelected === false || option.selected === false) && option.visible"
        @click="handleClick($event, option)"
        class="vue-dropdown-item"
        :class="{ selected: option.selected }"
      >
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
    headerHeight: {
      required: true,
      type: String,
    },
    hideSelected: {
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
