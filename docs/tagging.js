{
  const getCountryList = async name => {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', `https://restcountries.eu/rest/v2/name/${name}`)
      xhr.send()
      xhr.onloadend = () => {
        try {
          resolve(JSON.parse(xhr.response).map(info => info.name))
        } catch (error) {
          resolve([])
        }
      }
    })
  }
  const { ref, createApp } = Vue

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
      const model = ref(['Vue.js', 'Rails', 'Phoenix'])

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
        taggable
        hide-selected
        label-by="name"
        track-by="name"
        value-by="name"
        collapse-tags
      ></vue-select>
      <pre>{{ model }}</pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount(document.querySelector('#tagging'))
}
