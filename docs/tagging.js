{
  const jsCode = `
createApp({
  name: 'app',
  setup() {
    const model = ref(['Vue.js', 'Rails', 'Phoenix'])

    const options = ref([
      { name: 'Vue.js', language: 'JavaScript' },
      { name: 'Rails', language: 'Ruby' },
      { name: 'Sinatra', language: 'Ruby' },
      { name: 'Laravel', language: 'PHP' },
      { name: 'Phoenix', language: 'Elixir' },
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
  multiple
  taggable
  hide-selected
  label-by="name"
  track-by="name"
  value-by="name"
  collapse-tags
></vue-select>
`.trim()

  const { ref, createApp } = Vue

  const app = createApp({
    name: 'app',
    setup() {
      const model = ref(['Vue.js', 'Rails', 'Phoenix'])

      const options = ref([
        { name: 'Vue.js', language: 'JavaScript' },
        { name: 'Rails', language: 'Ruby' },
        { name: 'Sinatra', language: 'Ruby' },
        { name: 'Laravel', language: 'PHP' },
        { name: 'Phoenix', language: 'Elixir' },
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
        multiple
        taggable
        hide-selected
        label-by="name"
        track-by="name"
        value-by="name"
        collapse-tags
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
