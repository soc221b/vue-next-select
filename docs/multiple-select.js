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
    const model = ref(['Sinatra', 'Vue.js'])

    const options = [
      'Vue.js',
      'Rails',
      'Sinatra',
      'Laravel',
      'Phoenix',
    ]

    return {
      model,
      options,
    }
  },
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
    return {
      model: ['Sinatra', 'Vue.js'],
      options: [
        'Vue.js',
        'Rails',
        'Sinatra',
        'Laravel',
        'Phoenix',
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
  multiple
  :min="1"
  :max="3"
></vue-select>
`.trim()

  const { ref, createApp } = Vue

  const app = createApp({
    name: 'app',
    setup() {
      const model = ref(['Sinatra', 'Vue.js'])

      const options = ['Vue.js', 'Rails', 'Sinatra', 'Laravel', 'Phoenix']

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
        :min="1"
        :max="3"
      ></vue-select>
      <pre class="result"><code class="plaintext">{{ model }}</code></pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="javascript">{{ jsCode }}</code></pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount('#multiple-select')
}
