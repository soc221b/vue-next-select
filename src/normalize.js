import { reactive, computed, toRef, watchEffect } from 'vue'

const createComputedForGetterFunction = maybePathFunc =>
  computed(() => {
    return typeof maybePathFunc.value === 'function'
      ? maybePathFunc.value
      : typeof maybePathFunc.value === 'string'
      ? option => maybePathFunc.value.split('.').reduce((value, key) => value[key], option)
      : option => option
  })

export default props => {
  const normalized = reactive({})

  const labelBy = createComputedForGetterFunction(toRef(props, 'labelBy'))
  watchEffect(() => (normalized.labelBy = labelBy.value))
  const valueBy = createComputedForGetterFunction(toRef(props, 'valueBy'))
  watchEffect(() => (normalized.valueBy = valueBy.value))
  const disabledBy = createComputedForGetterFunction(toRef(props, 'disabledBy'))
  watchEffect(() => (normalized.disabledBy = disabledBy.value))
  const groupBy = createComputedForGetterFunction(toRef(props, 'groupBy'))
  watchEffect(() => (normalized.groupBy = groupBy.value))

  const min = computed(() => (props.multiple ? props.min : Math.min(1, props.min)))
  watchEffect(() => (normalized.min = min.value))
  const max = computed(() => (props.multiple ? props.max : 1))
  watchEffect(() => (normalized.max = max.value))

  watchEffect(() => (normalized.options = props.options))

  return normalized
}
