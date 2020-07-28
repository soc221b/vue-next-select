const { reactive, ref, watch, createApp } = Vue

const app = createApp({
  name: 'app',
  setup() {
    const selectedOptions = ref('')
    const originalOptions = ['I', 'Love', 'Vue']
    const options = ref([...originalOptions])
    const isLoading = ref(false)
    const filter = async event => {
      isLoading.value = true
      await new Promise(resolve => setTimeout(resolve, 2000))
      const inputRe = new RegExp(event.target.value)
      options.value = originalOptions.filter(option => inputRe.test(option))
      isLoading.value = false
    }
    const allowEmpty = ref(false)
    return {
      selectedOptions,
      options,
      isLoading,
      filter,
      allowEmpty,
    }
  },
  template: `
  <button style="margin:50px 0; display:block;" @click="options.push('test')">addOption test</button>
  <vue-select
    v-model="selectedOptions"
    :options="options"
    is-multiple
    :is-loading="isLoading"
    :min-length="1"
    :max-length="2"
    close-on-select
    :allowEmpty="allowEmpty"
    @search-input="filter"
  ></vue-select>
 
  `,
})

app.component('vue-select', VueSelect)
app.mount(document.querySelector('#app'))
