import { onMounted, onUnmounted, ref } from 'vue'

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

  onMounted(() => window.addEventListener('click', handleClickForWindow))
  onUnmounted(() => window.removeEventListener('click', handleClickForWindow))
  const disableFocus = () => {
    isFocusing.value = false
    window.removeEventListener('click', handleClickForWindow)
  }
  const enableFocus = () => {
    disableFocus()
    window.addEventListener('click', handleClickForWindow)
  }

  return {
    isFocusing,
    enableFocus,
    disableFocus,
  }
}
