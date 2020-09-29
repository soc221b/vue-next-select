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
      const model = ref(options.value[0])

      const searchInput = ref('')
      const hanldeSearchInput = event => {
        searchInput.value = event.target.value
      }

      const visibleOptions = computed(() => {
        const re = new RegExp(searchInput.value)
        return options.value.filter(option => re.test(option.name))
      })

      return {
        model,
        options,
        hanldeSearchInput,
        visibleOptions,
      }
    },
    template: `
      <vue-select
        v-model="model"
        :options="options"
        :visible-options="visibleOptions"
        label-by="name"
        track-by="name"
        searchable
        clear-on-select
        @search-input="hanldeSearchInput"
      ></vue-select>
      <pre>{{ model || 'null' }}</pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount(document.querySelector('#select-with-search'))
}
