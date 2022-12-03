import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
// @ts-ignore
import VueSelect from '../../'
import { clickAllDropdownItemElements } from '../dom-utils'

it('should works', async () => {
  const state = reactive({
    model: [],
    options: [0, 1, 2],
    visibleOptions: [0, 1],
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
        :visible-options="state.visibleOptions"
        multiple
      ></vue-select>
    `,
  }
  const wrapper = mount(app)

  await wrapper.trigger('focus')
  await clickAllDropdownItemElements(wrapper)
  expect(state.model).toStrictEqual([0, 1])
})
