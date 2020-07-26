import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../dist/vue-select.es'

it('has default placeholder', async () => {
  const state = reactive({
    model: null,
    options: [0, 1, 2],
  })
  const app = {
    setup() {
      return {
        state,
      }
    },
    components: {
      VueSelect,
    },
    template: `
      <vue-select
        v-model="state.model"
        :options="state.options"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)

  expect(wrapper.find('.vue-select-input')).toBeDefined()
  expect(wrapper.find('.vue-select-input').attributes('placeholder')).not.toBe(undefined)
})

it('should use custom placeholder', async () => {
  const state = reactive({
    model: null,
    options: [0, 1, 2],
  })
  const app = {
    setup() {
      return {
        state,
      }
    },
    components: {
      VueSelect,
    },
    template: `
      <vue-select
        v-model="state.model"
        :options="state.options"
        placeholder="Click me to show all options"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)

  expect(wrapper.find('.vue-select-input').attributes('placeholder')).toBe('Click me to show all options')
})
