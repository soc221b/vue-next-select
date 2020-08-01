export const isSameOption = (option1, option2, { valueBy }) => {
  return valueBy(option1) === valueBy(option2)
}

export const hasOption = (selectedOptions, option, { valueBy }) => {
  return selectedOptions.find(_option => isSameOption(_option, option, { valueBy })) !== undefined
}

export const getOptionByValue = (options, value, { valueBy }) => {
  return options.find(option => valueBy(option) === value)
}

export const addOption = (selectedOptions, option, { max, valueBy }) => {
  if (hasOption(selectedOptions, option, { valueBy })) return selectedOptions
  if (selectedOptions.length + 1 > max) return selectedOptions

  return selectedOptions.concat(option)
}

export const removeOption = (selectedOptions, option, { min, valueBy }) => {
  if (hasOption(selectedOptions, option, { valueBy }) === false) return selectedOptions
  if (selectedOptions.length - 1 < min) return selectedOptions

  return selectedOptions.filter(_option => isSameOption(_option, option, { valueBy }) === false)
}
