import { computed, ref, isReactive, isRef, toRef } from 'vue'

const createComputedForGetterFunction = maybePathFunc =>
  computed(() => {
    return typeof maybePathFunc.value === 'function'
      ? maybePathFunc.value
      : typeof maybePathFunc.value === 'string'
      ? option => maybePathFunc.value.split('.').reduce((value, key) => value[key], option)
      : option => option
  })

export default props => {
  const trackBy = createComputedForGetterFunction(toRef(props, 'trackBy'))
  const labelBy = createComputedForGetterFunction(toRef(props, 'labelBy'))
  const valueBy = createComputedForGetterFunction(toRef(props, 'valueBy'))

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
