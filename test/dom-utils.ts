export const isNullEl = any => {
  return Object.keys(any).length === 0
}

export const getElement = (wrapper, selector) => {
  const dropdownEl = wrapper.findComponent(selector)
  if (isNullEl(dropdownEl)) return null
  return dropdownEl.element as any
}

export const getAllElements = parentEl => {
  if (parentEl === null) return []
  return Array.from(parentEl.children) as any
}

export const clickAllElements = async allElements => {
  await allElements.forEach(el => el.dispatchEvent(new Event('click')))
}

export const getFirstElement = allElements => {
  if (allElements.length === 0) return null
  return allElements[0]
}

export const clickFirstElement = async element => {
  if (element === null) return
  await element.dispatchEvent(new Event('click'))
}

// dropdown
export const getDropdownElement = wrapper => {
  return getElement(wrapper, '.vue-dropdown')
}

export const getAllDropdownItemElements = wrapper => {
  return getAllElements(getDropdownElement(wrapper))
}

export const clickAllDropdownItemElements = async wrapper => {
  await clickAllElements(getAllDropdownItemElements(wrapper))
}

export const getFirstDropdownItemElement = wrapper => {
  return getFirstElement(getAllDropdownItemElements(wrapper))
}

export const clickFirstDropdownItemElement = async wrapper => {
  await clickFirstElement(getFirstDropdownItemElement(wrapper))
}

// tag
export const getTagElement = wrapper => {
  return getElement(wrapper, '.vue-tags')
}

export const getAllTagItemElements = wrapper => {
  return getAllElements(getTagElement(wrapper))
}

export const clickAllTagItemElements = async wrapper => {
  await clickAllElements(getAllTagItemElements(wrapper))
}

export const getFirstTagItemElement = wrapper => {
  return getFirstElement(getAllTagItemElements(wrapper))
}

export const clickFirstTagItemElement = async wrapper => {
  await clickFirstElement(getFirstTagItemElement(wrapper))
}

// delete-icon elements
export const getAllDeleteIconElements = wrapper => {
  return getAllElements(getTagElement(wrapper)).map(deleteIconElement => deleteIconElement.children[1])
}

export const clickAllDeleteIconElements = async wrapper => {
  await clickAllElements(getAllDeleteIconElements(wrapper))
}

export const getFirstDeleteIconElement = wrapper => {
  return getFirstElement(getAllDeleteIconElements(wrapper))
}

export const clickFirstDeleteIconElement = async wrapper => {
  await clickFirstElement(getFirstDeleteIconElement(wrapper))
}
