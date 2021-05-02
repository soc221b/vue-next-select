<template>
  <a :href="`https://iendeavor.github.io/vue-next-select/api-reference.html#${prop}`">{{ prop }}</a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    prop: {
      required: true,
      type: String,
    },
  },
})
</script>
