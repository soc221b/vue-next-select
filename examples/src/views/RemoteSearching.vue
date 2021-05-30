<template>
  <pre>modelValue: {{ JSON.stringify(modelValue) }}</pre>

  <vue-select
    v-model="modelValue"
    :options="options"
    searchable
    multiple
    clear-on-close
    :loading="loading"
    @search:input="handleInput"
    search-placeholder="Select user"
  />
</template>

<script>
import { defineComponent, ref } from 'vue'

const userNames = ref([])
fetch('https://randomuser.me/api/?seed=0&results=1000&inc=name').then(async result => {
  const userResult = ((await result.json()).results ?? []).map(({ name: { first, last } }) => first + ' ' + last)
  userNames.value = [...new Set(userResult)]
})

export default defineComponent({
  setup() {
    const modelValue = ref([])
    const options = ref([])

    const loading = ref(false)
    async function handleInput(inputEvent) {
      if (inputEvent.target.value === '') {
        options.value = [...modelValue.value]
        return
      }

      loading.value = true
      await new Promise(resolve => setTimeout(resolve, 500))
      options.value = userNames.value.filter(name => name.includes(inputEvent.target.value))
      loading.value = false
    }

    return {
      modelValue,
      options,
      loading,
      handleInput,
    }
  },
})
</script>
