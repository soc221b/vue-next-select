import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../dist/vue-next-select.es'
import { getDropdownElement, clickFirstTagItemElement, clickFirstDeleteIconElement } from './dom-utils'

it('should open dropdown after click wrapper', async () => {
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

  expect(getDropdownElement(wrapper)).toBe(null)

  await wrapper.trigger('click')
  expect(getDropdownElement(wrapper)).not.toBe(null)

  await wrapper.element.parentElement.dispatchEvent(new Event('click'))
  expect(getDropdownElement(wrapper)).toBe(null)
})

it('should not open dropdown after delete tag', async () => {
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

  expect(getDropdownElement(wrapper)).toBe(null)

  await clickFirstDeleteIconElement(wrapper)
  expect(getDropdownElement(wrapper)).toBe(null)
})

it('should open dropdown after downward arrow icon', async () => {
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

  await wrapper.find('.icon-arrow-downward').trigger('click')
  expect(getDropdownElement(wrapper)).not.toBe(null)
})

it('should close dropdown after downward arrow icon', async () => {
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

  await wrapper.find('.icon-arrow-downward').trigger('click')
  expect(getDropdownElement(wrapper)).not.toBe(null)
  await wrapper.find('.icon-arrow-downward').trigger('click')
  await new Promise(resolve => setTimeout(resolve))
  expect(getDropdownElement(wrapper)).toBe(null)
})
