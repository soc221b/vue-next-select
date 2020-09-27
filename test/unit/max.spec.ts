import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../../dist/vue-next-select.es'
import { clickAllDropdownItemElements, getAllDropdownItemElements, clickFirstDropdownItemElement } from '../dom-utils'

it('should not limit by default', async () => {
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
  await wrapper.trigger('click')

  await clickAllDropdownItemElements(wrapper)
  expect(getAllDropdownItemElements(wrapper).filter(element => element.classList.contains('selected')).length).toBe(3)
  expect(state.model).toStrictEqual([0, 1, 2])
})

it('should limit by given max length', async () => {
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
        :max="2"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')

  await clickAllDropdownItemElements(wrapper)
  expect(getAllDropdownItemElements(wrapper).filter(element => element.classList.contains('selected')).length).toBe(2)
  expect(state.model).toStrictEqual([0, 1])
})

it('should limit when init with greater length', async () => {
  const state = reactive({
    model: [0, 1, 2],
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
        :max="2"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')

  expect(getAllDropdownItemElements(wrapper).filter(element => element.classList.contains('selected')).length).toBe(3)

  await clickFirstDropdownItemElement(wrapper)
  expect(state.model).toStrictEqual([1, 2])
  expect(getAllDropdownItemElements(wrapper).filter(element => element.classList.contains('selected')).length).toBe(2)

  await clickFirstDropdownItemElement(wrapper)
  expect(state.model).toStrictEqual([1, 2])
  expect(getAllDropdownItemElements(wrapper).filter(element => element.classList.contains('selected')).length).toBe(2)
})
