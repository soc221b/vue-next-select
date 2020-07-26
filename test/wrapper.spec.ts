import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../dist/vue-select.es'

it('should open the dropdown after focus and close it after blur', async () => {
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

  expect(wrapper.find('.vue-select-dropdown').attributes('style')).toContain('display: none;')

  await wrapper.find('.vue-select-input').trigger('click')
  expect(wrapper.find('.vue-select-dropdown').attributes('style')).not.toContain('display: none;')

  await wrapper.find('.vue-select-dropdown').trigger('click')
  expect(wrapper.find('.vue-select-dropdown').attributes('style')).not.toContain('display: none;')

  await wrapper.find('body').trigger('click')
  expect(wrapper.find('.vue-select-dropdown').attributes('style')).toContain('display: none;')
})
