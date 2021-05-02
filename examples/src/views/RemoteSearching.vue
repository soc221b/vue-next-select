<template>
  <pre>modelValue: {{ JSON.stringify(selectedUser) }}</pre>

  <vue-select
    v-model="selectedUser"
    :options="users"
    searchable
    clear-on-close
    :loading="loading"
    @search:input="handleInput"
    search-placeholder="Select user"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const selectedUser = ref(null)

    const users = ref([])

    const loading = ref(false)

    async function handleInput(inputEvent) {
      if (inputEvent.target.value === '') return

      loading.value = true
      await new Promise(resolve => setTimeout(resolve, 500))
      fetch('https://randomuser.me/api/?results=5')
        .then(async result => {
          const userResult = ((await result.json()) as any).results.map(
            ({ name: { first, last } }) => first + ' ' + last,
          )
          users.value = selectedUser.value === null ? userResult : [selectedUser.value].concat(userResult)
        })
        .finally(() => {
          loading.value = false
        })
    }

    return {
      selectedUser,
      users,
      loading,
      handleInput,
    }
  },
})
</script>
