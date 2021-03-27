import { ref, watch, onMounted, nextTick, watchEffect, computed } from 'vue'
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

interface Option {
  originalIndex: number
  disabled: boolean
  hidden: boolean
  visible: boolean
}
export const usePointer = (options: Ref<Option[]>, highlightedOriginalIndex: Ref<number | null>) => {
  const pointerForward = () => {
    if (isSomeSelectable.value === false) return
    if (highlightedOriginalIndex.value === null) return
    let tempOriginalIndex = highlightedOriginalIndex.value + 1
    while (tempOriginalIndex !== highlightedOriginalIndex.value) {
      if (options.value.length <= tempOriginalIndex) tempOriginalIndex = 0
      if (pointerSet(tempOriginalIndex)) break
      ++tempOriginalIndex
    }
  }
  const pointerBackward = () => {
    if (isSomeSelectable.value === false) return
    if (highlightedOriginalIndex.value === null) return
    let tempOriginalIndex = highlightedOriginalIndex.value - 1
    while (tempOriginalIndex !== highlightedOriginalIndex.value) {
      if (tempOriginalIndex < 0) tempOriginalIndex = options.value.length - 1
      if (pointerSet(tempOriginalIndex)) break
      --tempOriginalIndex
    }
  }

  const pointerSet = originalIndex => {
    const option = options.value.find(option => option.originalIndex === originalIndex)
    if (option === undefined) return false
    if (isSelectable(option) === false) return false
    highlightedOriginalIndex.value = originalIndex
    return true
  }

  const isSelectable = (option: Option) => !option.disabled && !option.hidden && option.visible
  const isSomeSelectable = computed(() => options.value.some(option => isSelectable(option)))

  watchEffect(() => {
    if (isSomeSelectable.value === false) highlightedOriginalIndex.value = null
    if (options.value.length <= highlightedOriginalIndex.value) {
      for (const option of options.value.reverse()) {
        if (pointerSet(option.originalIndex)) break
      }
    }
    if (
      highlightedOriginalIndex.value === null ||
      isSelectable(options.value[highlightedOriginalIndex.value]) === false
    ) {
      for (const option of options.value) {
        if (pointerSet(option.originalIndex)) break
      }
    }
  })

  return {
    pointerForward,
    pointerBackward,
    pointerSet,
  }
}
