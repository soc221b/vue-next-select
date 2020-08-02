import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../../dist/vue-select.es'
import { clickFirstDropdownItemElement } from '../dom-utils'

it('should not allow empty by default', async () => {
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
  await wrapper.trigger('click')

  await clickFirstDropdownItemElement(wrapper)
  expect(state.model).toStrictEqual(0)

  await clickFirstDropdownItemElement(wrapper)
  expect(state.model).toStrictEqual(0)
})

it('should works with allow empty', async () => {
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
        allow-empty
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')

  await clickFirstDropdownItemElement(wrapper)
  expect(state.model).toStrictEqual(0)

  await clickFirstDropdownItemElement(wrapper)
  expect(state.model).toStrictEqual(null)
})
