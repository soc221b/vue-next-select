import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../../dist/vue-select.es'
import { clickFirstDropdownItemElement } from '../dom-utils'

it('should emit select event with option', async () => {
  const state = reactive({
    model: null,
    options: [0, 1, 2],
  })
  const handleSelect = jest.fn()
  const app = {
    setup() {
      return {
        state,
        handleSelect,
      }
    },
    components: {
      VueSelect,
    },
    template: `
      <vue-select
        v-model="state.model"
        :options="state.options"
        @select="handleSelect"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')
  await clickFirstDropdownItemElement(wrapper)
  expect(handleSelect.mock.calls[0][0]).toBe(0)
})

it('should emit remove event with option', async () => {
  const state = reactive({
    model: 0,
    options: [0, 1, 2],
  })
  const handleRemove = jest.fn()
  const app = {
    setup() {
      return {
        state,
        handleRemove,
      }
    },
    components: {
      VueSelect,
    },
    template: `
      <vue-select
        v-model="state.model"
        :options="state.options"
        @remove="handleRemove"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')
  await clickFirstDropdownItemElement(wrapper)
  expect(handleRemove.mock.calls[0][0]).toBe(0)
})

it('should emit open event', async () => {
  const state = reactive({
    model: null,
    options: [0, 1, 2],
  })
  const handleOpen = jest.fn()
  const app = {
    setup() {
      return {
        state,
        handleOpen,
      }
    },
    components: {
      VueSelect,
    },
    template: `
      <vue-select
        v-model="state.model"
        :options="state.options"
        @open="handleOpen"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')
  expect(handleOpen).toBeCalled()
})

it('should emit close event', async () => {
  const state = reactive({
    model: null,
    options: [0, 1, 2],
  })
  const handleClose = jest.fn()
  const app = {
    setup() {
      return {
        state,
        handleClose,
      }
    },
    components: {
      VueSelect,
    },
    template: `
      <vue-select
        v-model="state.model"
        :options="state.options"
        @close="handleClose"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('click')
  await wrapper.element.parentElement.dispatchEvent(new Event('click'))
  expect(handleClose).toBeCalled()
})
