<template>
  <ul
    class="vue-dropdown"
    :style="{ maxHeight: maxHeight + 'px' }"
    @mousedown.prevent
    v-bind="dataAttrs"
    role="listbox"
    :id="`vs${comboboxUid}-listbox`"
    :aria-multiselectable="dataAttrs['data-multiple']"
    :aria-busy="dataAttrs['data-loading']"
    :aria-disabled="dataAttrs['data-disabled']"
  >
    <template v-for="(option, index) of modelValue" :key="option.key">
      <li
        v-if="option.visible && option.hidden === false"
        @click="handleClickItem($event, option)"
        class="vue-dropdown-item"
        :class="{
          selected: option.selected,
          disabled: option.disabled,
          highlighted: option.originalIndex === highlightedOriginalIndex,
          group: option.group,
        }"
        @mousemove="handleMousemove($event, option)"
        role="option"
        :id="`vs${comboboxUid}-option-${index}`"
        :aria-selected="option.selected ? true : option.disabled ? undefined : false"
        :aria-disabled="option.disabled"
      >
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

    comboboxUid: {
      required: true,
      type: Number,
    },
    maxHeight: {
      required: true,
    },
    highlightedOriginalIndex: {
      required: true,
    },
  },
  emits: ['click-item', 'mousemove'],
  setup(props, context) {
    const dataAttrs = inject('dataAttrs')

    const handleClickItem = (event, option) => {
      if (option.disabled) return
      context.emit('click-item', event, option)
    }

    const handleMousemove = (event, option) => {
      context.emit('mousemove', event, option)
    }

    return {
      dataAttrs,
      handleClickItem,
      handleMousemove,
    }
  },
}
</script>
