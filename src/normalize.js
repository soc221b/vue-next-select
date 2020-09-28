export default props => {
  const trackBy =
    typeof props.trackBy === 'function'
      ? props.trackBy
      : typeof props.trackBy === 'string'
      ? option => props.trackBy.split('.').reduce((value, key) => value[key], option)
      : option => option

  const labelBy =
    typeof props.labelBy === 'function'
      ? props.labelBy
      : typeof props.labelBy === 'string'
      ? option => props.labelBy.split('.').reduce((value, key) => value[key], option)
      : option => option

  const valueBy =
    typeof props.valueBy === 'function'
      ? props.valueBy
      : typeof props.valueBy === 'string'
      ? option => props.valueBy.split('.').reduce((value, key) => value[key], option)
      : option => option

  const min = props.multiple ? props.min : Math.min(1, props.min)
  const max = props.multiple ? props.max : 1

  return {
    trackBy,
    labelBy,
    valueBy,
    min,
    max,
  }
}
