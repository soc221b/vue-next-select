export const isSameOption = (option1, option2, { valueBy }) => {
  return valueBy(option1) === valueBy(option2)
}

export const hasOption = (options, option, { valueBy }) => {
  return options.some(_option => isSameOption(_option, option, { valueBy }))
}

export const getOptionByValue = (options, value, { valueBy }) => {
  return options.find(option => valueBy(option) === value)
}

export const addOption = (selectedOptions, option, { max, valueBy }) => {
  if (hasOption(selectedOptions, option, { valueBy })) return selectedOptions
  if (selectedOptions.length >= max) return selectedOptions

  return selectedOptions.concat(option)
}

export const removeOption = (selectedOptions, option, { min, valueBy }) => {
  if (hasOption(selectedOptions, option, { valueBy }) === false) return selectedOptions
  if (selectedOptions.length <= min) return selectedOptions

  return selectedOptions.filter(_option => isSameOption(_option, option, { valueBy }) === false)
}
