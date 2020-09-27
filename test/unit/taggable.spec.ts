import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../../dist/vue-next-select.es'
import { clickFirstDropdownItemElement, getAllTagItemElements, clickFirstDeleteIconElement } from '../dom-utils'

it('should works with taggable when init with empty array', async () => {
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
        taggable
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')

  expect(getAllTagItemElements(wrapper).filter(element => element.classList.contains('active')).length).toBe(0)
  expect(getAllTagItemElements(wrapper).filter(element => element.classList.contains('inactive')).length).toBe(3)

  await clickFirstDropdownItemElement(wrapper)
  expect(getAllTagItemElements(wrapper).filter(element => element.classList.contains('active')).length).toBe(1)
  expect(getAllTagItemElements(wrapper).filter(element => element.classList.contains('inactive')).length).toBe(2)
})

it('should works with taggable when init with one option', async () => {
  const state = reactive({
    model: [2],
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
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')

  expect(getAllTagItemElements(wrapper).filter(element => element.classList.contains('active')).length).toBe(1)
  expect(getAllTagItemElements(wrapper).filter(element => element.classList.contains('inactive')).length).toBe(2)

  await clickFirstDropdownItemElement(wrapper)
  expect(getAllTagItemElements(wrapper).filter(element => element.classList.contains('active')).length).toBe(2)
  expect(getAllTagItemElements(wrapper).filter(element => element.classList.contains('inactive')).length).toBe(1)
})

it('should delete option', async () => {
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
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')

  expect(getAllTagItemElements(wrapper).filter(element => element.classList.contains('active')).length).toBe(1)
  expect(getAllTagItemElements(wrapper).filter(element => element.classList.contains('inactive')).length).toBe(2)

  await clickFirstDeleteIconElement(wrapper)
  expect(getAllTagItemElements(wrapper).filter(element => element.classList.contains('active')).length).toBe(0)
  expect(getAllTagItemElements(wrapper).filter(element => element.classList.contains('inactive')).length).toBe(3)
})
