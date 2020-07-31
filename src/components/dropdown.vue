<template>
  <ul ref="ul">
    <template v-for="(option, index) of visibleOptions">
      <li
        :key="trackBy(option)"
        class="vue-select-dropdown-item"
        @click="handleClick(option)"
        :selected="hasSelected(option)"
      >
        <slot name="label" :scope="{ option, index, selected: hasSelected(option) }">
          {{ labelBy(option, index) }}
        </slot>
      </li>
    </template>
  </ul>
</template>

<script>
import { ref, computed } from 'vue'

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
    allowEmpty: {
      required: true,
      type: Boolean,
    },
    multiple: {
      required: true,
      type: Boolean,
    },
    min: {
      required: true,
      type: Number,
    },
    max: {
      required: true,
      type: Number,
    },
    trackBy: {
      required: true,
      type: Function,
    },
    labelBy: {
      required: true,
      type: Function,
    },
    valueBy: {
      required: true,
      type: Function,
    },
    hideSelected: {
      required: true,
      type: Boolean,
    },
  },
  setup(props, context) {
    const ul = ref(null)
    const handleClick = option => {
      if (props.multiple) {
        if (hasSelected(option)) {
          if (props.modelValue.length > props.min) {
            context.emit('remove', option)
            context.emit(
              'update:modelValue',
              props.modelValue.filter(modelValue => isSame(modelValue, option) === false),
            )
          }
        } else {
          if (props.modelValue.length < props.max) {
            context.emit('select', option)
            context.emit('update:modelValue', props.modelValue.concat(props.valueBy(option)))
          }
        }
      } else {
        if (props.modelValue.length === 1) {
          if (isSame(props.modelValue[0], option)) {
            if (props.allowEmpty) {
              context.emit(
                'remove',
                props.options.find(option => isSame(props.modelValue[0], option)),
              )
              context.emit('update:modelValue', [])
            }
          } else {
            context.emit(
              'remove',
              props.options.find(option => isSame(props.modelValue[0], option)),
            )
            context.emit('update:modelValue', [])
            context.emit('select', option)
            context.emit('update:modelValue', [props.valueBy(option)])
          }
        } else {
          context.emit('select', option)
          context.emit('update:modelValue', [props.valueBy(option)])
        }
      }
    }

    const visibleOptions = computed(() => {
      return props.hideSelected
        ? props.options.filter(option => props.hideSelected === false || hasSelected(option) === false)
        : props.options
    })

    const hasSelected = option => {
      return props.modelValue.some(modelValue => isSame(modelValue, option))
    }

    const isSame = (modelValue, option) => {
      return modelValue === props.valueBy(option)
    }

    return {
      visibleOptions,
      handleClick,
      hasSelected,
    }
  },
}
</script>
