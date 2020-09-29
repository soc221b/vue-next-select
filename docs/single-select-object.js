{
  const { ref, createApp } = Vue

  const app = createApp({
    name: 'app',
    setup() {
      const model = ref(null)
      const options = ref([
        { label: 'Select option' },
        { label: 'Option' },
        { label: 'Label by' },
        { label: 'Track by' },
        { label: 'Value by' },
        { label: 'Close on select' },
      ])
      return {
        model,
        options,
      }
    },
    template: `
      <vue-select
        v-model="model"
        :options="options"
        label-by="label"
        :track-by="option => option.value"
      ></vue-select>
      <pre>{{ model || 'null' }}</pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount(document.querySelector('#single-select-object'))
}
