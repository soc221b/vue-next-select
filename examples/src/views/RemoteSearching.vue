<template>
  <pre>modelValue: {{ JSON.stringify(modelValue) }}</pre>

  <vue-select
    v-model="modelValue"
    :options="options"
    :visible-options="visibleOptions"
    searchable
    multiple
    clear-on-close
    :loading="loading"
    @search:input="handleInput"
    search-placeholder="Select user"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import VueSelect from 'vue-next-select'

const userNames = ref<string[]>([])
fetch('https://randomuser.me/api/?seed=0&results=1000&inc=name').then(async result => {
  const userResult = ((await result.json()).results ?? []).map(
    ({ name: { first, last } }: { name: { first: string; last: string } }) => first + ' ' + last,
  )
  userNames.value = [...new Set(userResult)] as string[]
})

export default defineComponent({
  components: { VueSelect },
  setup() {
    const modelValue = ref([])
    // options must includes modelValue, otherwise vue-next-select will remove those modelValue
    const options = computed(() => [...new Set([...visibleOptions.value].concat(modelValue.value))])
    const visibleOptions = ref<string[]>([])

    const latestTimestamp = ref()
    const loading = ref(false)
    async function handleInput(inputEvent: InputEvent) {
      const timestamp = (latestTimestamp.value = Date.now())
      const target = inputEvent.target as HTMLInputElement | null

      if (target?.value === '') {
        visibleOptions.value = [...modelValue.value]
        return
      }

      loading.value = true
      await new Promise(resolve => setTimeout(resolve, 500))
      if (timestamp === latestTimestamp.value) {
        visibleOptions.value = userNames.value.filter(name => name.includes(target?.value!))
      }
      loading.value = false
    }

    return {
      modelValue,
      options,
      visibleOptions,
      loading,
      handleInput,
    }
  },
})
</script>
