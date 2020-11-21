{
  const jsCode = `
import { ref, createApp } from 'vue'
import VueSelect from 'vue-next-select'

export default createApp({
  name: 'app',
  components: {
    VueSelect
  },
  setup() {
    const model = ref(null)

    const options = [
      'element',
      'ant-design-vue',
      'vuetify'
    ]

    return {
      model,
      options
    }
  }
})
`.trim()

  const htmlCode = `
<vue-select
  v-model="model"
  :options="options"
></vue-select>
`.trim()

  const { ref, createApp } = Vue

  const singleSelect = createApp({
    name: 'app',
    setup() {
      const model = ref(null)

      const options = ['element', 'ant-design-vue', 'vuetify']

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
      ></vue-select>

      <pre>{{ model }}</pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="javascript">{{ jsCode }}</code></pre>
    `,
  })

  singleSelect.component('vue-select', VueNextSelect)
  singleSelect.mount(document.querySelector('#single-select'))
}
