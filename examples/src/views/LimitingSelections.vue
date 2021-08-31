<template>
  <pre>modelValue: {{ JSON.stringify(artists) }}</pre>

  <vue-select v-model="artists" :options="languages" multiple searchable :min="1" :max="3" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VueSelect from 'vue-next-select'

export default defineComponent({
  components: { VueSelect },
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
