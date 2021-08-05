<template>
  <pre>modelValue: {{ JSON.stringify(country) }}</pre>

  <vue-select v-model="country" :options="countryOptions" label-by="label">
    <template #label="{ label, selected }">
      <template v-if="selected">
        <div>{{ selected.flag }} {{ selected.label }}</div>
      </template>
      <template v-else>
        {{ label }}
      </template>
    </template>
    <template #dropdown-item="{ option }">
      <div>{{ option.flag }} {{ option.label }}</div>
    </template>
  </vue-select>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const country = ref(null)

    const countryOptions = ref([
      {
        label: 'France',
        flag: '🇫🇷',
      },
      {
        label: 'Japan',
        flag: '🇯🇵',
      },
      {
        label: 'India',
        flag: '🇫🇮',
      },
    ])

    return {
      country,
      countryOptions,
    }
  },
})
</script>
