{
  const jsCode = `
import { ref, createApp } from 'vue'
import VueSelect from 'vue-next-select'

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

    const handleRemoved = (option) => {
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
      handleRemoved
    }
  }
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
      <pre>{{ model }}</pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="javascript">{{ jsCode }}</code></pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount(document.querySelector('#creatable'))
}
