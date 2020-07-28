<template>
  <ul ref="ul" class="vue-select-dropdown" style="outline: none;">
    <template v-for="option of options">
      <li class="vue-select-dropdown-item" @click="handleClick(option)" :selected="hasSelected(option)">
        {{ option }}
      </li>
    </template>
  </ul>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'vue-select-dropdown',
  props: {
    modelValue: {
      required: true,
      type: Array,
    },
    options: {
      required: true,
      type: Array,
    },
    canBeEmpty: {
      required: true,
      type: Boolean,
    },
    isMultiple: {
      required: true,
      type: Boolean,
    },
    minLength: {
      required: true,
      type: Number,
    },
    maxLength: {
      required: true,
      type: Number,
    },
  },
  setup(props, context) {
    const ul = ref(null)
    const handleClick = option => {
      if (props.isMultiple) {
        if (hasSelected(option)) {
          if (props.modelValue.length > props.minLength) {
            context.emit('remove', option)
            context.emit(
              'update:modelValue',
              props.modelValue.filter(op => isSame(op, option) === false),
            )
          }
        } else {
          if (props.modelValue.length < props.maxLength) {
            context.emit('select', option)
            context.emit('update:modelValue', props.modelValue.concat(option))
          }
        }
      } else {
        if (props.modelValue.length === 1) {
          if (isSame(props.modelValue[0], option)) {
            if (props.canBeEmpty) {
              context.emit('remove', props.modelValue[0])
              context.emit('update:modelValue', [])
            }
          } else {
            context.emit('remove', props.modelValue[0])
            context.emit('update:modelValue', [])
            context.emit('select', option)
            context.emit('update:modelValue', [option])
          }
        } else {
          context.emit('select', option)
          context.emit('update:modelValue', [option])
        }
      }
    }

    const hasSelected = option => {
      return props.modelValue.some(_option => isSame(option, _option))
    }

    const isSame = (option1, option2) => {
      return option1 === option2
    }

    return {
      handleClick,
      hasSelected,
    }
  },
}
</script>
