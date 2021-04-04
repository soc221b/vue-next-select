{
  const jsCode = `
import { ref, createApp } from 'vue'
import VueSelect from 'vue-next-select'

const originalOptions = ['HTML', 'CSS', 'JavaScript']

// for composition API
export default createApp({
  name: 'app',
  setup() {
    const model = ref([])

    const options = ref(originalOptions.slice())

    const tempOption = ref('')
    const handleSearchInput = async event => {
      // if temp option is not selected, remove it.
      if (model.value.includes(tempOption.value) === false && originalOptions.includes(tempOption.value) === false) {
        options.value = options.value.filter(option => option !== tempOption.value)
      }

      // only show original options and selecting options
      tempOption.value = event.target.value.trim()
      if (tempOption.value === '') {
        return
      }

      // to make created option selectable and visible, we need to add it to options
      if (options.value.includes(tempOption.value) === false) {
        options.value.push(tempOption.value)
      }

      const re = new RegExp(tempOption.value, 'i')
    }

    // remove dynamically created option if it is no longer be selected
    const handleRemoved = option => {
      if (originalOptions.includes(option)) {
        return
      }

      options.value = options.value.filter(o => o !== option)
    }

    return {
      model,
      options,
      handleSearchInput,
      handleRemoved,
    }
  },
})

// for option API
export default createApp({
  name: 'app',
  data() {
    const options = originalOptions.slice()
    return {
      model: [],
      options,
      tempOption: '',
    }
  },
  methods: {
    handleSearchInput (event) {
      // if temp option is not selected, remove it.
      if (this.model.includes(this.tempOption) === false && originalOptions.includes(this.tempOption) === false) {
        this.options = this.options.filter(option => option !== this.tempOption)
      }

      // only show original options and selecting options
      this.tempOption = event.target.value.trim()
      if (this.tempOption === '') {
        return
      }

      // to make created option selectable and visible, we need to add it to options
      if (this.options.includes(this.tempOption) === false) {
        this.options.push(this.tempOption)
      }
    },

    handleRemoved(option) {
      if (originalOptions.includes(option)) {
        return
      }

      // remove dynamically created option if it is no longer be selected
      this.options = this.options.filter(o => o !== option)
    }
  },
})
`.trim()

  const htmlCode = `
<vue-select
  v-model="model"
  :options="options"
  multiple
  searchable
  clear-on-close
  @search:input="handleSearchInput"
  @removed="handleRemoved"
></vue-select>
`.trim()

  const { ref, createApp } = Vue

  const originalOptions = ['HTML', 'CSS', 'JavaScript']

  const app = createApp({
    name: 'app',
    setup() {
      const model = ref([])

      const options = ref(originalOptions.slice())

      const tempOption = ref('')
      const handleSearchInput = async event => {
        // if temp option is not selected, remove it.
        if (model.value.includes(tempOption.value) === false && originalOptions.includes(tempOption.value) === false) {
          options.value = options.value.filter(option => option !== tempOption.value)
        }

        // only show original options and selecting options
        tempOption.value = event.target.value.trim()
        if (tempOption.value === '') {
          return
        }

        // to make created option selectable and visible, we need to add it to options
        if (options.value.includes(tempOption.value) === false) {
          options.value.push(tempOption.value)
        }
      }

      // remove dynamically created option if it is no longer be selected
      const handleRemoved = option => {
        if (originalOptions.includes(option)) {
          return
        }

        options.value = options.value.filter(o => o !== option)
      }

      return {
        model,
        options,
        handleSearchInput,
        handleRemoved,

        jsCode,
        htmlCode,
      }
    },
    template: `
      <vue-select
        v-model="model"
        :options="options"
        multiple
        searchable
        clear-on-close
        @search:input="handleSearchInput"
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
