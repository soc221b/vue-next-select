import { createStore } from 'vuex'

export default createStore({
  state: {
    techStack: undefined,
  },
  mutations: {
    SET_TECH_STACK(state, value) {
      state.techStack = value
    },
  },
})
