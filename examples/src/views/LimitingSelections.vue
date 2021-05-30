<template>
  <pre>modelValue: {{ JSON.stringify(artists) }}</pre>

  <vue-select v-model="artists" :options="languages" multiple searchable :min="1" :max="3" />
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const artists = ref(['Sia'])

    const languages = ref(['Sia', 'Britney Spears', 'Lady Gaga', 'Kate Perry', 'Dua Lipa'])

    return {
      artists,
      languages,
    }
  },
})
</script>
