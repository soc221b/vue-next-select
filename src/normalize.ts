import { reactive, computed, toRef, watchEffect } from 'vue'

export const defaultLabelBySymbol = Symbol('labelBy')
export const defaultValueBySymbol = Symbol('valueBy')
export const defaultPlacement = 'bottom'
export const defaultTrigger = 'click-to-open'

const createComputedForGetterFunction = maybePathFunc =>
  computed(() => {
    return typeof maybePathFunc.value === 'function'
      ? maybePathFunc.value
      : typeof maybePathFunc.value === 'string'
      ? option => maybePathFunc.value.split('.').reduce((value, key) => value[key], option)
      : maybePathFunc.value === defaultLabelBySymbol || maybePathFunc.value === defaultValueBySymbol
      ? option => {
          const by = maybePathFunc.value === defaultLabelBySymbol ? 'label' : 'value'
          try {
            if (Object.prototype.hasOwnProperty.call(option, by)) return option[by]
          } catch {}
          return option
        }
      : typeof maybePathFunc.value === 'symbol'
      ? option => option[maybePathFunc.value]
      : option => option
  })

export default props => {
  const normalized = reactive(
    {} as {
      labelBy: any
      valueBy: any
      disabledBy: any
      groupBy: any
      min: any
      max: any
      options: any
    },
  )

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
