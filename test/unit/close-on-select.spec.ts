import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../../dist/vue-next-select.es'
import { getAllDropdownItemElements, clickFirstDropdownItemElement } from '../dom-utils'

it('should not close by default', async () => {
  const state = reactive({
    model: [],
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
  await wrapper.trigger('focus')

  await clickFirstDropdownItemElement(wrapper)
  expect(getAllDropdownItemElements(wrapper).length).toBe(3)
})

it('should close on select', async () => {
  const state = reactive({
    model: [],
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
        close-on-select
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('focus')

  await clickFirstDropdownItemElement(wrapper)
  expect(getAllDropdownItemElements(wrapper).length).toBe(0)
})
