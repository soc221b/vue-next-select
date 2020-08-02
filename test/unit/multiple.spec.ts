import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../../dist/vue-select.es'
import { clickAllDropdownItemElements } from '../dom-utils'

it('it should select when init with one option', async () => {
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
      ></vue-select>
    `,
  }
  const wrapper = mount(app)

  await wrapper.trigger('click')
  await clickAllDropdownItemElements(wrapper)
  expect(state.model).toStrictEqual([1, 2])
})
