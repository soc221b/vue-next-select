{
  const { onMounted, onUnmounted, ref, createApp } = Vue

  const comp = createApp({
    name: 'app',
    setup() {
      const visible = ref(false)
      const handleScroll = e => {
        visible.value = parseFloat(document.documentElement.scrollTop) > document.documentElement.clientHeight
      }
      onMounted(() => window.addEventListener('scroll', handleScroll))
      onUnmounted(() => window.removeEventListener('scroll', handleScroll))

      const backToTop = () => {
        window.scrollTo({
          behavior: 'smooth',
          top: 0,
        })
      }

      return {
        visible,
        backToTop,
      }
    },
    template: `
      <button
        style="display: flex; align-items: center; justify-content: center; position: fixed; z-index: 1000; border-radius: 50%; height: 48px; width: 48px; border: 1px solid gray; color: #3ea277; margin-right: 20px; margin-bottom: 20px; bottom: 0; right: 0; background-color: #222; outline: none; cursor: pointer; transition: opacity .2s; user-select: none;"
        :style="{ opacity: visible ? 1 : 0 }"
        @click="backToTop"
      >Top</button>
    `,
  })

  comp.mount(document.querySelector('#back-to-top'))
}
