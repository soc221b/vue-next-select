<template>
  <pre>state: {{ JSON.stringify(state.techStack) }}</pre>

  <vue-select
    :model-value="state.techStack"
    @update:modelValue="value => commit('SET_TECH_STACK', value)"
    :options="options"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueSelect from 'vue-next-select'
import { useStore } from 'vuex'

export default defineComponent({
  components: { VueSelect },
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
