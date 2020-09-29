{
  const { ref, computed, createApp } = Vue

  const app = createApp({
    name: 'app',
    setup() {
      const options = ref([
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' },
      ])
      const model = ref(['Sinatra', 'Vue.js'])

      return {
        model,
        options,
      }
    },
    template: `
      <vue-select
        v-model="model"
        :options="options"
        multiple
        label-by="name"
        track-by="name"
        value-by="name"
        :max="2"
        placeholder="Pick some"
      ></vue-select>
      <pre>{{ model }}</pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount(document.querySelector('#multiple-select'))
}
