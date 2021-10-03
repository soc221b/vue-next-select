<template>
  <pre>popperOptions: {{ popperOptions }}</pre>

  <vue-select v-model="techStack" :options="options" label-by="framework" :popper-options="popperOptions" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VueSelect from 'vue-next-select'

export default defineComponent({
  components: { VueSelect },
  setup() {
    const techStack = ref(undefined)

    const options = [
      { language: 'JavaScript', framework: 'Express' },
      { language: 'Python', framework: 'Django' },
      { language: 'PHP', framework: 'Laravel' },
    ]

    const popperOptions = {
      placement: 'top',
      trigger: 'hover',
    } as const

    return {
      techStack,
      options,
      popperOptions,
    }
  },
})
</script>

<style scoped>
.vue-select {
  margin-top: 100vh;
  margin-bottom: 100vh;
}
</style>
