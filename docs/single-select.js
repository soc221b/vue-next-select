{
  const { ref, createApp } = Vue

  const singleSelect = createApp({
    name: 'app',
    setup() {
      const model = ref(null)
      const options = ref([
        'Select option',
        'Option',
        'Mulitple',
        'Searchable',
        'Taggable',
        'Close on select',
        'Hide selected',
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
        close-on-select
        :min="1"
      ></vue-select>
      <pre>{{ model || 'null' }}</pre>
    `,
  })

  singleSelect.component('vue-select', VueNextSelect)
  singleSelect.mount(document.querySelector('#single-select'))
}
