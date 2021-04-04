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
    update (state, value) {
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

    return {
      options,
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
    update (state, value) {
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
})

app.use(store)
`.trim()

  const htmlCode = `
<vue-select
  :options="options"
  :modelValue="$store.state.value"
  @update:modelValue="value => $store.commit('update', value)"
  close-on-select
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
      update(state, value) {
        state.value = value
      },
    },
  })

  const singleSelect = createApp({
    name: 'app',
    setup() {
      const options = ['State', 'Getters', 'Mutations', 'Actions']

      const store = useStore()

      return {
        store,
        options,

        jsCode,
        htmlCode,
      }
    },
    template: `
      <vue-select
        :options="options"
        :modelValue="store.state.value"
        @update:modelValue="value => store.commit('update', value)"
        close-on-select
      ></vue-select>

      <pre class="result"><code class="plaintext">{{ store.state.value }}</code></pre>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="javascript">{{ jsCode }}</code></pre>
    `,
  })

  singleSelect.use(store)
  singleSelect.component('vue-select', VueNextSelect)
  singleSelect.mount(document.querySelector('#vuex-support'))
}
