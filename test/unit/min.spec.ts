import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../../dist/vue-next-select.es'
import {
  clickAllDropdownItemElements,
  getAllDropdownItemElements,
  clickFirstDropdownItemElement,
  clickFirstDeleteIconElement,
} from '../dom-utils'

it('should not limit by default', async () => {
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
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')

  await clickAllDropdownItemElements(wrapper)
  expect(state.model).toStrictEqual([])
})

it('should limit by given min length', async () => {
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
        :min="1"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')

  await clickAllDropdownItemElements(wrapper)
  expect(state.model).toStrictEqual([2])

  await clickAllDropdownItemElements(wrapper)
  expect(state.model).toStrictEqual([0, 1])
})

it('should limit when init with smaller length', async () => {
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
        :min="1"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')

  expect(getAllDropdownItemElements(wrapper).filter(element => element.classList.contains('selected')).length).toBe(0)

  await clickFirstDropdownItemElement(wrapper)
  expect(state.model).toStrictEqual([0])
  expect(getAllDropdownItemElements(wrapper).filter(element => element.classList.contains('selected')).length).toBe(1)

  await clickFirstDropdownItemElement(wrapper)
  expect(state.model).toStrictEqual([0])
  expect(getAllDropdownItemElements(wrapper).filter(element => element.classList.contains('selected')).length).toBe(1)
})

it('should work with delete icon', async () => {
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
        taggable
        :min="1"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')

  await clickFirstDeleteIconElement(wrapper)
  expect(state.model).toStrictEqual([0])
  expect(getAllDropdownItemElements(wrapper).filter(element => element.classList.contains('selected')).length).toBe(1)
})
