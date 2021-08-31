<template>
  <form @submit.prevent="handleSubmit">
    <label for="v-pet-select">Choose a pet:</label>
    <vue-select v-model="pet" :options="pets" />
    <div class="red" v-if="v$.pet.$error">This field is required.</div>

    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VueSelect from 'vue-next-select'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default defineComponent({
  components: { VueSelect },
  setup() {
    const pet = ref(null)

    const pets = ref(['Dog', 'Cat', 'Parrot', 'Goldfish'])

    const v$ = useVuelidate(
      {
        pet: {
          required: required,
        },
      },
      { pet },
    )

    const handleSubmit = () => {
      v$.value.$touch()
      if (v$.value.$invalid) return

      alert('Submit!')
    }

    return {
      pet,
      pets,
      v$,
      handleSubmit,
    }
  },
})
</script>

<style scoped>
.red {
  color: red;
}
</style>
