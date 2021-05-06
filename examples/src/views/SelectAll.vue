<template>
  <pre>modelValue: {{ JSON.stringify(option) }}</pre>

  <vue-select v-model="option" :options="options" multiple label-by="label" value-by="value" group-by="isGroup" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const option = ref([])

    const options: { isGroup?: boolean; label: string; value: string | string[] }[] = [
      { label: 'Facebook', value: 'facebook' },
      { label: 'LinkedIn', value: 'linked-in' },
      { label: 'Twiitter', value: 'twiitter' },
      { label: 'Youtube', value: 'youtube' },
    ]
    options.unshift({ isGroup: true, label: 'All', value: options.map(option => option.value as string) })

    return {
      option,
      options,
    }
  },
})
</script>
