const { ref, createApp } = Vue
const deepCopy = value => JSON.parse(JSON.stringify(value))
const app = createApp({
  name: 'app',
  setup() {
    const selectedOptions = ref(['a'])
    const options = ref([
      {
        label: 'I',
        value: 'a',
      },
      {
        label: 'Love',
        value: 'b',
      },
      {
        label: 'Vue',
        value: 'c',
      },
      {
        label: 'D',
        value: 'd',
      },
      {
        label: 'E',
        value: 'e',
      },
      {
        label: 'F',
        value: 'f',
      },
      {
        label: 'G',
        value: 'g',
      },
    ])
    const visibleOptions = ref([...options.value])
    const isLoading = ref(false)
    const filter = async event => {
      isLoading.value = true
      await new Promise(resolve => setTimeout(resolve, 2000))
      const inputRe = new RegExp(event.target.value)
      visibleOptions.value = deepCopy(options.value.filter(option => inputRe.test(option.label)))
      isLoading.value = false
    }
    const valueBy = option => {
      return option.value
    }
    const labelBy = option => {
      return option.label
    }
    return {
      selectedOptions,
      options,
      visibleOptions,
      isLoading,
      filter,
      valueBy,
      labelBy,
    }
  },
  template: `
  <vue-select
    v-model="selectedOptions"
    :options="options"
    :visible-options="visibleOptions"
    searchable
    multiple
    taggable
    ellipsis
    tag-label-by="value"
    :loading="isLoading"
    :label-by="labelBy"
    :value-by="valueBy"
    :track-by="valueBy"
    hide-selected
    @search-input="filter"
  >
  </vue-select>
  `,
})

app.component('vue-select', VueSelect)
app.mount(document.querySelector('#app'))
