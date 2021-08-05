import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../../dist/vue-next-select.es'
import { clickFirstDropdownItemElement, clickAllDropdownItemElements } from '../dom-utils'

it('it shouldnt be clearable', async () => {
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
        :clearable="false"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('focus')
  await clickFirstDropdownItemElement(wrapper)
  expect(state.model).toStrictEqual(0)
  await clickFirstDropdownItemElement(wrapper)
  expect(state.model).toStrictEqual(0)
})

it('multiple shouldnt be clearable', async () => {
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
        :clearable="false"
        multiple
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('focus')
  await clickAllDropdownItemElements(wrapper)
  expect(state.model).toStrictEqual([0, 1, 2])
  await clickAllDropdownItemElements(wrapper)
  expect(state.model).toStrictEqual([0, 1, 2])
})
