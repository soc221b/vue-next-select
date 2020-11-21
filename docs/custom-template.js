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
    const model = ref('bird')
    const options = ['bird', 'horse', 'monkey', 'squirrel']

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
>
  <template v-slot:dropdown-item="{ option }">
    <img
      :src="'./images/' + option + '.jpg'"
      style="width: 100%; vertical-align: middle;"
    />
  </template>
</vue-select>
`.trim()

  const { ref, createApp } = Vue

  const singleSelect = createApp({
    name: 'app',
    setup() {
      const model = ref('bird')
      const options = ['bird', 'horse', 'monkey', 'squirrel']

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
      >
        <template v-slot:dropdown-item="{ option }">
          <img
            :src="'./images/' + option + '.jpg'"
            style="width: 100%; vertical-align: middle;"
          />
        </template>
      </vue-select>
      <pre>{{ model }}</pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="javascript">{{ jsCode }}</code></pre>
    `,
  })

  singleSelect.component('vue-select', VueNextSelect)
  singleSelect.mount(document.querySelector('#custom-template'))
}
