{
  const jsCode = Vue.computed(() =>
    isCompositionApi.value
      ? `
import { ref, computed, createApp } from 'vue'
import VueSelect from 'vue-next-select'

createApp({
  components: {
    VueSelect
  },
  setup() {
    const model = ref(['express', 'koa'])

    const options = [
      { label: 'All', value: ['express', 'koa', 'django', 'flask'], group: true, level: 0 },
      { label: 'NodeJS', value: ['express', 'koa'], group: true, level: 1 },
      { label: 'Express', value: 'express', level: 2 },
      { label: 'Koa', value: 'koa', level: 2 },
      { label: 'Python', value: ['django', 'flask'], group: true, level: 1 },
      { label: 'Django', value: 'django', level: 2 },
      { label: 'Flask', value: 'flask', level: 2 },
    ]

    const searchInput = ref('')
    const hanldeSearchInput = event => {
      searchInput.value = event.target.value
    }
    const visibleOptions = computed(() => {
      if (searchInput.value === '') return options
      return options.filter(option => option.group || option.label.indexOf(searchInput.value) >= 0)
    })

    return {
      model,
      options,
      visibleOptions,
      hanldeSearchInput,
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
      model: ['express', 'koa'],
      options: [
        { label: 'All', value: ['express', 'koa', 'django', 'flask'], group: true, level: 0 },
        { label: 'NodeJS', value: ['express', 'koa'], group: true, level: 1 },
        { label: 'Express', value: 'express', level: 2 },
        { label: 'Koa', value: 'koa', level: 2 },
        { label: 'Python', value: ['django', 'flask'], group: true, level: 1 },
        { label: 'Django', value: 'django', level: 2 },
        { label: 'Flask', value: 'flask', level: 2 },
      ],
      searchInput: '',
    }
  },
  computed: {
    visibleOptions () {
      if (this.searchInput === '') return this.options
      return this.options.filter(option => option.group || option.label.indexOf(this.searchInput) >= 0)
    },
  },
  methods: {
    hanldeSearchInput (event) {
      this.searchInput = event.target.value
    },
  },
})
`.trim(),
  )

  const htmlCode = `
<vue-select
  v-model="model"
  :options="options"
  multiple
  label-by="label"
  value-by="value"
  group-by="group"
  placeholder="Pick some"
  :visible-options="visibleOptions"
  searchable
  @search:input="hanldeSearchInput"
>
  <template #dropdown-item="{ option }">
    <div :style="'padding-left: ' + option.level * 8 + 'px;'">{{ option.label }}</div>
  </template>
</vue-select>
`.trim()

  const { ref, computed, createApp } = Vue

  const app = createApp({
    name: 'app',
    setup() {
      const model = ref(['express', 'koa'])

      const options = [
        { label: 'All', value: ['express', 'koa', 'django', 'flask'], group: true, level: 0 },
        { label: 'NodeJS', value: ['express', 'koa'], group: true, level: 1 },
        { label: 'Express', value: 'express', level: 2 },
        { label: 'Koa', value: 'koa', level: 2 },
        { label: 'Python', value: ['django', 'flask'], group: true, level: 1 },
        { label: 'Django', value: 'django', level: 2 },
        { label: 'Flask', value: 'flask', level: 2 },
      ]

      const searchInput = ref('')
      const hanldeSearchInput = event => {
        searchInput.value = event.target.value
      }
      const visibleOptions = computed(() => {
        if (searchInput.value === '') return options
        return options.filter(option => option.group || option.label.indexOf(searchInput.value) >= 0)
      })

      return {
        model,
        options,
        visibleOptions,
        hanldeSearchInput,

        jsCode,
        htmlCode,
      }
    },
    template: `
      <vue-select
        v-model="model"
        :options="options"
        multiple
        label-by="label"
        value-by="value"
        group-by="group"
        placeholder="Pick some"
        :visible-options="visibleOptions"
        searchable
        @search:input="hanldeSearchInput"
      >
        <template #dropdown-item="{ option }">
          <div :style="'padding-left: ' + option.level * 8 + 'px;'">{{ option.label }}</div>
        </template>
      </vue-select>
      <pre class="result"><code class="plaintext">{{ model }}</code></pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="javascript">{{ jsCode }}</code></pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount('#group')
}
