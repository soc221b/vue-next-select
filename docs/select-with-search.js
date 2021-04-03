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
      { name: 'Sinatra', language: 'Ruby', disabled: true },
      { name: 'Laravel', language: 'PHP' },
      { name: 'Phoenix', language: 'Elixir', disabled: true }
    ])

    return {
      model,
      options,
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
        { name: 'Sinatra', language: 'Ruby', disabled: true },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir', disabled: true },
      ],
    }
  },
})
`.trim()

  const htmlCode = `
<vue-select
  v-model="model"
  :options="options"
  label-by="name"
  searchable
  clear-on-select
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
        { name: 'Sinatra', language: 'Ruby', disabled: true },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir', disabled: true },
      ])

      return {
        model,
        options,

        jsCode,
        htmlCode,
      }
    },
    template: `
      <vue-select
        v-model="model"
        :options="options"
        label-by="name"
        searchable
        clear-on-select
      ></vue-select>
      <pre class="result"><code class="plaintext">{{ model }}</code></pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="js">{{ jsCode }}</code></pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount(document.querySelector('#select-with-search'))
}
