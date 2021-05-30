<template>
  <pre>state: {{ JSON.stringify(state.techStack) }}</pre>

  <vue-select
    :model-value="state.techStack"
    @update:modelValue="value => commit('SET_TECH_STACK', value)"
    :options="options"
  />
</template>

<script>
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const { state, commit } = useStore()

    const options = ['State', 'Getter', 'Mutation', 'Action']

    return {
      state,
      commit,
      options,
    }
  },
})
</script>
