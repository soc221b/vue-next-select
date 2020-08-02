import { onMounted, onUnmounted, ref, computed } from 'vue'

export default ({ wrapperRef, ignoreClasses = [] }) => {
  const isIgnoreEl = el => ignoreClasses.some(cls => el.classList.contains(cls))

  const isFocusing = ref(false)
  const handleClickForWindow = event => {
    if (!event) return
    if (!event.target) return

    let el = event.target
    while (el) {
      if (isIgnoreEl(el)) return
      if (el === wrapperRef.value) {
        isFocusing.value = true
        return
      }
      el = el.parentElement
    }

    isFocusing.value = false
  }

  // rootElement is documentElement in browser or VTU_ROOT in vue-test-utils
  const rootElement = computed(() => {
    if (!wrapperRef.value) return
    let rootElement = wrapperRef.value
    while (rootElement.parentElement) {
      rootElement = rootElement.parentElement
    }
    return rootElement
  })

  const addEventListener = () => {
    if (!rootElement.value) return
    rootElement.value.addEventListener('click', handleClickForWindow)
  }
  const removeEventListener = () => {
    if (!rootElement.value) return
    rootElement.value.removeEventListener('click', handleClickForWindow)
  }

  const disableFocus = () => {
    removeEventListener()
    isFocusing.value = false
  }
  const enableFocus = () => {
    disableFocus()
    addEventListener()
  }

  onMounted(enableFocus)
  onUnmounted(disableFocus)

  return {
    isFocusing,
    enableFocus,
    disableFocus,
  }
}
