{
  const jsCode = Vue.computed(() =>
    isCompositionApi.value
      ? `
import { ref, computed, createApp } from 'vue'
import VueSelect from 'vue-next-select'

const getCountryList = async name => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', \`https://restcountries.eu/rest/v2/name/${name}\`)
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

const useLoading = () => {
  const loading = ref(0)
  return {
    loading: computed(() => loading.value !== 0 ),
    load: () => { loading.value++ },
    unload: () => { loading.value-- },
  }
}

createApp({
  components: {
    VueSelect
  },
  setup() {
    const model = ref([])

    const options = ref([])
    const visibleOptions = ref([])

    const { loading, load, unload } = useLoading()
    const searchInput = ref('')
    const handleSearchInput = async event => {
      searchInput.value = event.target.value
      if (searchInput.value === '') {
        visibleOptions.value = model.value
        return
      }

      load()
      const currentSearchInput = searchInput.value
      const foundOptions = await getCountryList(searchInput.value)
      if (currentSearchInput === searchInput.value) {
        options.value = model.value.concat(foundOptions)
        options.value = Array.from(new Set(options.value))
        visibleOptions.value = foundOptions
      }
      unload()
    }

    return {
      model,
      options,
      visibleOptions,
      loading,
      handleSearchInput,
    }
  },
}).mount('#app')
`.trim()
      : `
import { ref, computed, createApp } from 'vue'
import VueSelect from 'vue-next-select'

const getCountryList = async name => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', \`https://restcountries.eu/rest/v2/name/${name}\`)
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

const app = new Vue({
  el: '#app',
  components: {
    VueSelect
  },
  data() {
    return {
      model: [],
      options: [],
      visibleOptions: [],
      loadingCount: 0,
      searchInput: '',
    }
  },
  computed: {
    loading() {
      return this.loadingCount !== 0
    },
  },
  methods: {
    async handleSearchInput(event) {
      this.searchInput = event.target.value
      if (this.searchInput === '') {
        this.visibleOptions = this.model
        return
      }

      this.load()
      const currentSearchInput = this.searchInput
      const foundOptions = await getCountryList(this.searchInput)
      if (currentSearchInput === this.searchInput) {
        this.options = this.model.concat(foundOptions)
        this.option = Array.from(new Set(this.options))
        this.visibleOptions = foundOptions
      }
      this.unload()
    },
    load() {
      ++this.loadingCount
    },
    unload() {
      --this.loadingCount
    },
  },
})
`.trim(),
  )

  const htmlCode = `
<vue-select
  v-model="model"
  :options="options"
  :visible-options="visibleOptions"
  multiple
  searchable
  @search:input="handleSearchInput"
  :loading="loading"
></vue-select>
`.trim()

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

  const { ref, computed, createApp } = Vue

  const useLoading = () => {
    const loadingCount = ref(0)
    return {
      loading: computed(() => loadingCount.value !== 0),
      load: () => {
        loadingCount.value++
      },
      unload: () => {
        loadingCount.value--
      },
    }
  }

  const app = createApp({
    name: 'app',
    setup() {
      const model = ref([])

      const options = ref([])
      const visibleOptions = ref([])

      const { loading, load, unload } = useLoading()
      const searchInput = ref('')
      const handleSearchInput = async event => {
        searchInput.value = event.target.value
        if (searchInput.value === '') {
          visibleOptions.value = model.value
          return
        }

        load()
        const currentSearchInput = searchInput.value
        const foundOptions = await getCountryList(searchInput.value)
        if (currentSearchInput === searchInput.value) {
          options.value = model.value.concat(foundOptions)
          options.value = Array.from(new Set(options.value))
          visibleOptions.value = foundOptions
        }
        unload()
      }

      return {
        model,
        options,
        visibleOptions,
        loading,
        handleSearchInput,

        jsCode,
        htmlCode,
      }
    },
    template: `
      <vue-select
        v-model="model"
        :options="options"
        :visible-options="visibleOptions"
        multiple
        searchable
        @search:input="handleSearchInput"
        :loading="loading"
      ></vue-select>
      <pre class="result"><code class="plaintext">{{ model }}</code></pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="javascript">{{ jsCode }}</code></pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount('#asynchronous-select')
}
