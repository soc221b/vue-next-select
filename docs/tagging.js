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
    const model = ref(['Jest', 'Puppeteer'])

    const options = [
      'Jest',
      'Mocha',
      'Selenium',
      'Puppeteer',
      'Jasmine',
      'Karma'
    ]

    return {
      model,
      options
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
    return {
      model: ['Jest', 'Puppeteer'],
      options: [
        'Jest',
        'Mocha',
        'Selenium',
        'Puppeteer',
        'Jasmine',
        'Karma',
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
  taggable
  hide-selected
></vue-select>
`.trim()

  const { ref, createApp } = Vue

  const app = createApp({
    name: 'app',
    setup() {
      const model = ref(['Jest', 'Puppeteer'])

      const options = ['Jest', 'Mocha', 'Selenium', 'Puppeteer', 'Jasmine', 'Karma']

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
        taggable
        hide-selected
      ></vue-select>
      <pre>{{ model }}</pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="javascript">{{ jsCode }}</code></pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount(document.querySelector('#tagging'))
}
