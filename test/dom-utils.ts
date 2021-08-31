import { VueWrapper } from '@vue/test-utils'
import { ComponentPublicInstance } from 'vue'

export const isNullEl = (object: object) => {
  return Object.keys(object).length === 0
}

export const getElement = <T extends ComponentPublicInstance>(wrapper: VueWrapper<T>, selector: any) => {
  const dropdownEl = wrapper.findComponent(selector)
  if (isNullEl(dropdownEl)) return null
  return dropdownEl.element as Element
}

export const getAllElements = (parentEl: Element | null) => {
  if (parentEl === null) return []
  return Array.from(parentEl.children) as Element[]
}

export const clickAllElements = async (allElements: Element[]) => {
  await allElements.forEach(el => el.dispatchEvent(new Event('click')))
}

export const getFirstElement = (allElements: Element[]) => {
  if (allElements.length === 0) return null
  return allElements[0]
}

export const clickFirstElement = async (element: Element | null) => {
  if (element === null) return
  await element.dispatchEvent(new Event('click'))
}

// dropdown
export const getDropdownElement = <T extends ComponentPublicInstance>(wrapper: VueWrapper<T>) => {
  const element = getElement(wrapper, '.vue-dropdown')
  return element === null || getComputedStyle(element).display === 'none' ? null : element
}

export const getAllDropdownItemElements = <T extends ComponentPublicInstance>(wrapper: VueWrapper<T>) => {
  return getAllElements(getDropdownElement(wrapper))
}

export const clickAllDropdownItemElements = async <T extends ComponentPublicInstance>(wrapper: VueWrapper<T>) => {
  await clickAllElements(getAllDropdownItemElements(wrapper))
}

export const getFirstDropdownItemElement = <T extends ComponentPublicInstance>(wrapper: VueWrapper<T>) => {
  return getFirstElement(getAllDropdownItemElements(wrapper))
}

export const clickFirstDropdownItemElement = async <T extends ComponentPublicInstance>(wrapper: VueWrapper<T>) => {
  await clickFirstElement(getFirstDropdownItemElement(wrapper))
}

// tag
export const getTagElement = <T extends ComponentPublicInstance>(wrapper: VueWrapper<T>) => {
  return getElement(wrapper, '.vue-tags')
}

export const getAllTagItemElements = <T extends ComponentPublicInstance>(wrapper: VueWrapper<T>) => {
  return getAllElements(getTagElement(wrapper))
}

// delete-icon elements
export const getAllDeleteIconElements = <T extends ComponentPublicInstance>(wrapper: VueWrapper<T>) => {
  return getAllElements(getTagElement(wrapper)).map(deleteIconElement => deleteIconElement.children[1])
}

export const getFirstDeleteIconElement = <T extends ComponentPublicInstance>(wrapper: VueWrapper<T>) => {
  return getFirstElement(getAllDeleteIconElements(wrapper))
}

export const clickFirstDeleteIconElement = async <T extends ComponentPublicInstance>(wrapper: VueWrapper<T>) => {
  await clickFirstElement(getFirstDeleteIconElement(wrapper))
}
