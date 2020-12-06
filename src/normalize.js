import { computed, ref, isReactive, isRef, toRef } from 'vue'

export default props => {
  const trackBy = computed(() =>
    typeof props.trackBy === 'function'
      ? props.trackBy
      : typeof props.trackBy === 'string'
      ? option => props.trackBy.split('.').reduce((value, key) => value[key], option)
      : option => option,
  )

  const labelBy = computed(() =>
    typeof props.labelBy === 'function'
      ? props.labelBy
      : typeof props.labelBy === 'string'
      ? option => props.labelBy.split('.').reduce((value, key) => value[key], option)
      : option => option,
  )

  const valueBy = computed(() =>
    typeof props.valueBy === 'function'
      ? props.valueBy
      : typeof props.valueBy === 'string'
      ? option => props.valueBy.split('.').reduce((value, key) => value[key], option)
      : option => option,
  )

  const min = computed(() => (props.multiple ? props.min : Math.min(1, props.min)))
  const max = computed(() => (props.multiple ? props.max : 1))

  const options = isRef(props.options) || isReactive(props.options) ? toRef(props, 'options') : ref(props.options)

  return {
    trackBy,
    labelBy,
    valueBy,
    min,
    max,
    options,
  }
}
