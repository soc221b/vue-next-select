import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../../'
import { clickFirstDeleteIconElement } from '../dom-utils'

it('should disable tag', async () => {
  const state = reactive({
    model: [0],
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
        multiple
        disabled
        taggable
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('focus')

  await clickFirstDeleteIconElement(wrapper)
  expect(state.model).toStrictEqual([0])
})
