<template>
  <pre>modelValue: {{ JSON.stringify(techStack) }}</pre>

  <vue-select v-model="techStack" :options="options" label-by="framework" />
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const techStack = ref(null)

    const options = [
      { language: 'JavaScript', framework: 'Express' },
      { language: 'Python', framework: 'Django' },
      { language: 'PHP', framework: 'Laravel' },
    ]

    return {
      techStack,
      options,
    }
  },
})
</script>
