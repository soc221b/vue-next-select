{
  const jsCode = `
import { ref, createApp } from 'vue'
import VueSelect from 'vue-next-select'

// for composition API
export default createApp({
  name: 'app',
  components: {
    VueSelect
  },
  setup() {
    const model = ref(['Sinatra', 'Vue.js'])

    const options = [
      { name: 'Vue.js', language: 'JavaScript' },
      { name: 'Rails', language: 'Ruby' },
      { name: 'Sinatra', language: 'Ruby' },
      { name: 'Laravel', language: 'PHP' },
      { name: 'Phoenix', language: 'Elixir', disabled: true },
    ]

    return {
      model,
      options,
    }
  },
})

// for option API
export default createApp({
  name: 'app',
  components: {
    VueSelect
  },
  data() {
    return {
      model: ['Sinatra', 'Vue.js'],
      options: [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
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
  multiple
  label-by="langauge"
  value-by="name"
  :min="1"
  :max="3"
  placeholder="Pick some"
></vue-select>
`.trim()

  const { ref, createApp } = Vue

  const app = createApp({
    name: 'app',
    setup() {
      const model = ref(['Sinatra', 'Vue.js'])

      const options = [
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir', disabled: true },
      ]

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
        multiple
        label-by="language"
        value-by="name"
        :min="1"
        :max="3"
        placeholder="Pick some"
      ></vue-select>
      <pre class="result"><code class="plaintext">{{ model }}</code></pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="javascript">{{ jsCode }}</code></pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount(document.querySelector('#multiple-select'))
}
