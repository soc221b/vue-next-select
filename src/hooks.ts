import { ref, watch, onMounted, nextTick, watchEffect } from 'vue'
import { Ref } from 'vue'

export const useHeight = (element: Ref<Element>, watchSource: any) => {
  const height = ref('0')
  const calcHeaderHeight = () => {
    nextTick(() => {
      if (!element.value) return
      height.value = window.getComputedStyle(element.value).height
    })
  }
  watch(watchSource, calcHeaderHeight)
  onMounted(calcHeaderHeight)
  return height
}

export const usePointer = (endIndex: Ref<number>) => {
  const highlightedIndex = ref()
  const pointerForward = () => ++highlightedIndex.value
  const pointerBackward = () => --highlightedIndex.value
  const pointerSet = index => (highlightedIndex.value = index)
  watchEffect(() => {
    if (endIndex.value <= 0) {
      highlightedIndex.value = undefined
    } else if (highlightedIndex.value === undefined) {
      highlightedIndex.value = 0
    } else if (highlightedIndex.value < 0) {
      highlightedIndex.value = endIndex.value - 1
    } else if (endIndex.value <= highlightedIndex.value) {
      highlightedIndex.value = 0
    }
  })

  return {
    highlightedIndex,
    pointerForward,
    pointerBackward,
    pointerSet,
  }
}
