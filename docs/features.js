{
  const { ref, createApp } = Vue

  const featureSelect = createApp({
    setup() {
      const model = ref(null)

      const options = ref([])

      setTimeout(() => {
        options.value = [
          {
            label: 'Getting started',
            id: 'getting-started',
          },
          {
            label: 'Examples',
            id: 'examples',
          },
          {
            label: 'API',
            id: 'api',
          },
        ]
      })

      const handleSelected = selectedOption => {
        location.hash = ''
        setTimeout(() => {
          model.value = null
          location.hash = selectedOption.id
        }, 100)
      }

      return {
        model,
        options,
        handleSelected,
      }
    },
    template: `
      <vue-select
        v-model="model"
        :options="options"
        label-by="label"
        placeholder="Jump to"
        @selected="handleSelected"
      ></vue-select>
    `,
  })

  featureSelect.component('vue-select', VueNextSelect)
  featureSelect.mount('#features')
}
