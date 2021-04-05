{
  const jsCode = Vue.computed(() =>
    isCompositionApi.value
      ? `
import { ref, createApp } from 'vue'
import VueSelect from 'vue-next-select'

createApp({
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
}).mount('#app')
`.trim()
      : `
import { ref, createApp } from 'vue'
import VueSelect from 'vue-next-select'

const app = new Vue({
  el: '#app',
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
`.trim(),
  )

  const htmlCode = `
<vue-select
  v-model="model"
  :options="options"
  label-by="name"
  searchable
  clear-on-select
></vue-select>
`.trim()

  const { ref, createApp } = Vue

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
  app.mount('#select-with-search')
}
