<template>
  <pre>modelValue: {{ JSON.stringify(favoriteLanguages) }}</pre>

  <vue-select
    v-model="favoriteLanguages"
    :options="languages"
    multiple
    searchable
    clear-on-change
    clear-on-close
    @search:input="handleInput"
    search-placeholder="Type to add more"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VueSelect from 'vue-next-select'

export default defineComponent({
  components: { VueSelect },
  setup() {
    const favoriteLanguages = ref(['JavaScript'])

    const languages = ref(['JavaScript', 'Python', 'C++', 'Lisp'])

    const prevInput = ref('')
    function removeTemporaryOption(inputEvent: InputEvent) {
      if (favoriteLanguages.value.includes(prevInput.value) === false) {
        languages.value = languages.value.filter(option => option !== prevInput.value)
      }

      prevInput.value = (inputEvent.target! as HTMLInputElement).value
    }

    function addTemporaryOption(inputEvent: InputEvent) {
      const input = (inputEvent.target! as HTMLInputElement).value
      if (input === '') return
      if (languages.value.includes(input)) return

      languages.value.push(input)
    }

    function handleInput(inputEvent: InputEvent) {
      removeTemporaryOption(inputEvent)
      addTemporaryOption(inputEvent)
    }

    return {
      favoriteLanguages,
      languages,
      handleInput,
    }
  },
})
</script>
