const { reactive, ref, watchEffect, createApp } = Vue
const deepCopy = (value) => JSON.parse(JSON.stringify(value))
const app = createApp({
  name: 'app',
  setup() {
    const selectedOptions = ref(['I'])
    const originalOptions = [{ value: 'I' },{ value: 'Love'},{ value: 'Vue' }]
    const options = ref([...originalOptions])
    const isLoading = ref(false)
    const filter = async event => {
      isLoading.value = true
      await new Promise(resolve => setTimeout(resolve, 2000))
      const inputRe = new RegExp(event.target.value)
      options.value = deepCopy(originalOptions.filter(option => inputRe.test(option.value)))
      isLoading.value = false
    }
    watchEffect(() => {
      console.log(selectedOptions.value)
    }, {
      deep:true,
    })
    const valueBy = (option) => {
      return option.value
    }
    return {
      selectedOptions,
      options,
      isLoading,
      filter,
      valueBy
    }
  },
  template: `
  <vue-select
    v-model="selectedOptions"
    :options="options"
    multiple
    :is-loading="isLoading"
    :min="1"
    :max="2"
    close-on-select
    :value-by="valueBy"
    hide-selected
    @search-input="filter"
  >
    <template #label="{ scope }">
      <div>Value: {{ scope.option.value }}</div>
      <div>Index: {{ scope.index }}</div>
      <div>Selected: {{ scope.selected }}</div>
    </template>
  </vue-select>
  `,
})

app.component('vue-select', VueSelect)
app.mount(document.querySelector('#app'))
