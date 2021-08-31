<template>
  <pre>modelValue: {{ JSON.stringify(country) }}</pre>

  <vue-select v-model="country" :options="countryOptions" label-by="label">
    <template #label="{ selected }">
      <template v-if="selected">
        <div>{{ selected.flag }} {{ selected.label }}</div>
      </template>
      <template v-else>Select option</template>
    </template>
    <template #dropdown-item="{ option }">
      <div>{{ option.flag }} {{ option.label }}</div>
    </template>
  </vue-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VueSelect from 'vue-next-select'

export default defineComponent({
  components: { VueSelect },
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
