{
  const jsCode = `
import { ref, computed, createApp } from 'vue'
import VueSelect from 'vue-next-select'

// for composition API
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
      { name: 'Phoenix', language: 'Elixir' }
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
      visibleOptions
    }
  }
})

// for option API
export default createApp({
  name: 'app',
  components: {
    VueSelect
  },
  data() {
    const model = { name: 'Vue.js', language: 'JavaScript' }

    return {
      model,
      options: [
        model,
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' },
      ],
      searchInput: '',
    }
  },
  computed: {
    visibleOptions() {
      const re = new RegExp(this.searchInput.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&'))
      return this.options.filter(option => re.test(option.name))
    },
  },
  methods: {
    hanldeSearchInput(event) {
      this.searchInput = event.target.value
    },
  },
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
        clear-on-close
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
