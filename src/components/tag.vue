<template>
  <ul class="vue-tags">
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
export default {
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
