{
  const jsCode = `
createApp({
  name: 'app',
  setup() {
    const model = ref(null)

    const options = ref([
      { label: 'Select option' },
      { label: 'Option' },
      { label: 'Label by' },
      { label: 'Track by' },
      { label: 'Value by' },
      { label: 'Close on select' },
    ])

    return {
      model,
      options,
    }
  }
})
`.trim()

  const htmlCode = `
<vue-select
  v-model="model"
  :options="options"
  label-by="label"
  :track-by="option => option.value"
></vue-select>
`.trim()

  const { ref, createApp } = Vue

  const app = createApp({
    name: 'app',
    setup() {
      const model = ref(null)

      const options = ref([
        { label: 'Select option' },
        { label: 'Option' },
        { label: 'Label by' },
        { label: 'Track by' },
        { label: 'Value by' },
        { label: 'Close on select' },
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
        label-by="label"
        :track-by="option => option.value"
      ></vue-select>
      <pre>{{ model }}</pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="javascript">{{ jsCode }}</code></pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount(document.querySelector('#single-select-object'))
}
