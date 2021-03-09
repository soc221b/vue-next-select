<template>
  <vue-select v-model="model" :options="options" label-by="language" :track-by="option => option.language"></vue-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VueSelect from 'vue-next-select'
import 'vue-next-select/dist/index.css'

// for composition API
export default defineComponent({
  components: {
    VueSelect,
  },
  setup() {
    const model = ref(null)

    const options = [{ language: 'JavaScript' }, { language: 'Python' }, { language: 'PHP' }]

    return {
      model,
      options,
    }
  },
})

// for option API
// export default defineComponent({
//   components: {
//     VueSelect
//   },
//   data() {
//     return {
//       model: null,
//       options: [
//         { language: 'JavaScript' },
//         { language: 'Python' },
//         { language: 'PHP' },
//       ],
//     }
//   },
// })
</script>
