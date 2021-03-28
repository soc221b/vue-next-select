{
  const jsCode = `
import { ref, createApp } from 'vue'
import VueSelect from 'vue-next-select'

// for composition API
export default createApp({
  name: 'app',
  setup() {
    const model = ref([])

    const originalOptions = ['HTML', 'CSS', 'JavaScript']
    const options = ref(originalOptions.slice())
    const visibleOptions = ref(options.value)

    const tempOption = ref('')
    const handleSearchInput = async event => {
      // remove temp option
      if (model.value.includes(tempOption.value) === false && originalOptions.includes(tempOption.value) === false) {
        options.value = options.value.filter(option => option !== tempOption.value)
      }

      tempOption.value = event.target.value.trim()
      if (tempOption.value === '') {
        visibleOptions.value = options.value
        return
      }

      // add temp option
      if (options.value.includes(tempOption.value) === false) {
        options.value.push(tempOption.value)
      }

      const re = new RegExp(tempOption.value.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&'))
      const foundOptions = options.value.filter(option => re.test(option))
      visibleOptions.value = foundOptions
    }

    const handleSelected = () => {
      // keep selected option in options
      tempOption.value = ''
    }

    const handleRemoved = option => {
      if (originalOptions.includes(option)) {
        return
      }

      options.value = options.value.filter(o => o !== option)
      visibleOptions.value = visibleOptions.value.filter(o => o !== option)
    }

    return {
      model,
      options,
      visibleOptions,
      handleSearchInput,
      handleSelected,
      handleRemoved,
    }
  },
})

// for option API
const originalOptions = ['HTML', 'CSS', 'JavaScript']

export default createApp({
  name: 'app',
  data() {
    const options = originalOptions.slice()
    return {
      model: [],
      options,
      visibleOptions: options,
      tempOption: '',
    }
  },
  methods: {
    async handleSearchInput(event) {
      // remove temp option
      if (this.model.includes(this.tempOption) === false && originalOptions.includes(this.tempOption) === false) {
        this.options = this.options.filter(option => option !== this.tempOption)
      }

      this.tempOption = event.target.value.trim()
      if (this.tempOption === '') {
        this.visibleOptions = this.options
        return
      }

      // add temp option
      if (this.options.includes(this.tempOption) === false) {
        this.options.push(this.tempOption)
      }

      const re = new RegExp(this.tempOption.replace(/[.*+?^\${}()|[\]\\]/g, '\\$&'))
      const foundOptions = this.options.filter(option => re.test(option))
      this.visibleOptions = foundOptions
    },

    handleSelected() {
      // keep selected option in options
      this.tempOption = ''
    },

    handleRemoved(option) {
      if (originalOptions.includes(option)) {
        return
      }

      this.options = this.options.filter(o => o !== option)
      this.visibleOptions = this.visibleOptions.filter(o => o !== option)
    },
  },
})
`.trim()

  const htmlCode = `
<vue-select
  v-model="model"
  :options="options"
  :visible-options="visibleOptions"
  multiple
  searchable
  @search:input="handleSearchInput"
  @selected="handleSelected"
  @removed="handleRemoved"
></vue-select>
`.trim()

  const { ref, createApp } = Vue

  const app = createApp({
    name: 'app',
    setup() {
      const model = ref([])

      const originalOptions = ['HTML', 'CSS', 'JavaScript']
      const options = ref(originalOptions.slice())
      const visibleOptions = ref(options.value)

      const tempOption = ref('')
      const handleSearchInput = async event => {
        // remove temp option
        if (model.value.includes(tempOption.value) === false && originalOptions.includes(tempOption.value) === false) {
          options.value = options.value.filter(option => option !== tempOption.value)
        }

        tempOption.value = event.target.value.trim()
        if (tempOption.value === '') {
          visibleOptions.value = options.value
          return
        }

        // add temp option
        if (options.value.includes(tempOption.value) === false) {
          options.value.push(tempOption.value)
        }

        const re = new RegExp(tempOption.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        const foundOptions = options.value.filter(option => re.test(option))
        visibleOptions.value = foundOptions
      }

      const handleSelected = () => {
        // keep selected option in options
        tempOption.value = ''
      }

      const handleRemoved = option => {
        if (originalOptions.includes(option)) {
          return
        }

        options.value = options.value.filter(o => o !== option)
        visibleOptions.value = visibleOptions.value.filter(o => o !== option)
      }

      return {
        model,
        options,
        visibleOptions,
        handleSearchInput,
        handleSelected,
        handleRemoved,

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
        @selected="handleSelected"
        @removed="handleRemoved"
      ></vue-select>
      <pre class="result"><code class="plaintext">{{ model }}</code></pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="javascript">{{ jsCode }}</code></pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount(document.querySelector('#creatable'))
}
