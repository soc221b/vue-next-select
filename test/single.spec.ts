import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../dist/vue-select.es'

it('it should select', async () => {
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

  expect(state.model).toBe(null)

  await wrapper.find('.vue-select-input').trigger('focus')
  await wrapper.find('.vue-select-dropdown-item').trigger('click')
  expect(state.model).toBe(0)
})

it('it should change', async () => {
  const state = reactive({
    model: 0,
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

  expect(state.model).toBe(0)

  await wrapper.find('.vue-select-input').trigger('focus')
  await wrapper.findAll('.vue-select-dropdown-item')[1].trigger('click')
  expect(state.model).toBe(1)
})

it('can not empty by default', async () => {
  const state = reactive({
    model: 0,
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

  expect(state.model).toBe(0)

  await wrapper.find('.vue-select-input').trigger('focus')
  await wrapper.find('.vue-select-dropdown-item').trigger('click')
  expect(state.model).toBe(0)
})

it('can be empty', async () => {
  const state = reactive({
    model: 0,
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
        can-be-empty
      ></vue-select>
    `,
  }
  const wrapper = mount(app)

  expect(state.model).toBe(0)

  await wrapper.find('.vue-select-input').trigger('focus')
  await wrapper.find('.vue-select-dropdown-item').trigger('click')
  expect(state.model).toBe(null)
})
