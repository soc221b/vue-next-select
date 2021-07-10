<template>
  <pre>modelValue: {{ JSON.stringify(colors) }}</pre>

  <vue-select v-model="colors" :options="colorOptions" multiple taggable>
    <template #tag="{ option, remove }">
      <div :style="`border-radius: 4px; padding: 0 4px; background-color: ${option};`">
        {{ option }}
        <span @click.stop="remove">x</span>
      </div>
    </template>
  </vue-select>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const colors = ref(['gold', 'lime'])

    const colorOptions = ref(['gold', 'lime', 'coral', 'cyan'])

    return {
      colors,
      colorOptions,
    }
  },
})
</script>

<style scoped>
:deep(.vue-tag) {
  background-color: transparent;
}
</style>
