{
  const jsCode = `
import { computed, createApp } from 'vue'
import { createStore, useStore } from 'vuex'
import VueSelect from 'vue-next-select'

// for composition API
const store = createStore({
  state: {
    value: 'State'
  },
  mutations: {
    updateValue (state, value) {
      state.value = value
    }
  }
})

const app = createApp({
  name: 'app',
  components: {
    VueSelect
  },
  setup() {
    const options = ['State', 'Getters', 'Mutations', 'Actions']

    const store = useStore()
    const model = computed(() => store.state.value)
    const handleSelected = selectedOption => store.commit('updateValue', selectedOption)
    const handleRemoved = removedOption => store.commit('updateValue', null)

    return {
      model,
      options,
      handleSelected,
      handleRemoved,
    }
  },
})

app.use(store)

// for option API
const store = createStore({
  state: {
    value: 'State'
  },
  mutations: {
    updateValue (state, value) {
      state.value = value
    }
  }
})

const app = createApp({
  name: 'app',
  components: {
    VueSelect
  },
  data() {
    return {
      options: ['State', 'Getters', 'Mutations', 'Actions'],
    }
  },
  computed: {
    model() {
      return this.$store.state.value
    },
  },
  methods: {
    handleSelected(selectedOption) {
      this.$store.commit('updateValue', selectedOption)
    },
    handleRemoved(removedOption) {
      this.$store.commit('updateValue', null)
    },
  },
})

app.use(store)
`.trim()

  const htmlCode = `
<vue-select
  :options="options"
  :modelValue="model"
  @selected="handleSelected"
  @removed="handleRemoved"
></vue-select>
`.trim()

  const { computed, createApp } = Vue
  const { createStore, useStore } = Vuex

  // Create a new store instance.
  const store = createStore({
    state: {
      value: 'State',
    },
    mutations: {
      updateValue(state, value) {
        state.value = value
      },
    },
  })

  const singleSelect = createApp({
    name: 'app',
    setup() {
      const options = ['State', 'Getters', 'Mutations', 'Actions']

      const store = useStore()
      const model = computed(() => store.state.value)
      const handleSelected = selectedOption => store.commit('updateValue', selectedOption)
      const handleRemoved = removedOption => store.commit('updateValue', null)

      return {
        model,
        options,
        handleSelected,
        handleRemoved,

        jsCode,
        htmlCode,
      }
    },
    template: `
      <vue-select
        :options="options"
        :modelValue="model"
        @selected="handleSelected"
        @removed="handleRemoved"
      ></vue-select>

      <pre class="result"><code class="plaintext">{{ model }}</code></pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="javascript">{{ jsCode }}</code></pre>
    `,
  })

  singleSelect.use(store)
  singleSelect.component('vue-select', VueNextSelect)
  singleSelect.mount(document.querySelector('#vuex-support'))
}
