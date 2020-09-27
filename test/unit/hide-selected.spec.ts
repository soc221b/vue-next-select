import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../../dist/vue-next-select.es'
import { getAllDropdownItemElements, clickAllDropdownItemElements, clickFirstDropdownItemElement } from '../dom-utils'

it('should not hide by default', async () => {
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

  await clickAllDropdownItemElements(wrapper)
  expect(getAllDropdownItemElements(wrapper).length).toBe(3)
})

it('should hide selected after select', async () => {
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
        hide-selected
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('focus')

  await clickFirstDropdownItemElement(wrapper)
  expect(getAllDropdownItemElements(wrapper).length).toBe(2)
  await clickFirstDropdownItemElement(wrapper)
  expect(getAllDropdownItemElements(wrapper).length).toBe(1)
  await clickFirstDropdownItemElement(wrapper)
  expect(getAllDropdownItemElements(wrapper).length).toBe(0)
})

it('should not hide options when init with empty array', async () => {
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
        hide-selected
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('focus')

  expect(getAllDropdownItemElements(wrapper).length).toBe(3)
})

it('should hide selected when init with one option', async () => {
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
        hide-selected
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('focus')

  expect(getAllDropdownItemElements(wrapper).length).toBe(2)
})
