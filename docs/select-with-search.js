{
  const jsCode = `
import { ref, computed, createApp } from 'vue'
import VueSelect from 'vue-next-select'

export default createApp({
  name: 'app',
  components: {
    VueSelect
  },
  setup() {
    const model = ref({ name: 'Vue.js', language: 'JavaScript' })

    const options = ref([
      model.value,
      { name: 'Rails', language: 'Ruby' },
      { name: 'Sinatra', language: 'Ruby' },
      { name: 'Laravel', language: 'PHP' },
      { name: 'Phoenix', language: 'Elixir' },
    ])

    const searchInput = ref('')
    const hanldeSearchInput = event => {
      searchInput.value = event.target.value
    }

    const visibleOptions = computed(() => {
      const re = new RegExp(searchInput.value.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&'))
      return options.value.filter(option => re.test(option.name))
    })

    return {
      model,
      options,
      hanldeSearchInput,
      visibleOptions,
    }
  }
})
`.trim()

  const htmlCode = `
<vue-select
  v-model="model"
  :options="options"
  :visible-options="visibleOptions"
  label-by="name"
  track-by="name"
  searchable
  clear-on-select
  @search:input="hanldeSearchInput"
></vue-select>
`.trim()

  const { ref, computed, createApp } = Vue

  const app = createApp({
    name: 'app',
    setup() {
      const model = ref({ name: 'Vue.js', language: 'JavaScript' })

      const options = ref([
        model.value,
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' },
      ])

      const searchInput = ref('')
      const hanldeSearchInput = event => {
        searchInput.value = event.target.value
      }

      const visibleOptions = computed(() => {
        const re = new RegExp(searchInput.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        return options.value.filter(option => re.test(option.name))
      })

      return {
        model,
        options,
        hanldeSearchInput,
        visibleOptions,

        jsCode,
        htmlCode,
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
        @search:input="hanldeSearchInput"
      ></vue-select>
      <pre>{{ model }}</pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="js">{{ jsCode }}</code></pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount(document.querySelector('#select-with-search'))
}
