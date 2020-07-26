import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../dist/vue-select.es'
import { sleep } from './util'

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})

it('should update options', async () => {
  const state = reactive({
    model: null,
    options: [0, 1, 2],
  })
  const app = {
    setup() {
      const filterOptions = event => {
        const value = event.target.value
        state.options = state.options.filter(option => new RegExp(value).test(option + ''))
      }
      return {
        state,
        filterOptions,
      }
    },
    components: {
      VueSelect,
    },
    template: `
      <vue-select
        v-model="state.model"
        :options="state.options"
        @search-change="filterOptions"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)

  await wrapper.find('.vue-select-input').trigger('focus')
  expect((await wrapper.findAll('.vue-select-dropdown-item')).length).toBe(3)

  await wrapper.find('.vue-select-input').setValue('1')
  expect((await wrapper.findAll('.vue-select-dropdown-item')).length).toBe(1)
})

it('should loading', async () => {
  const state = reactive({
    model: null,
    options: [0, 1, 2],
    isLoading: false,
  })
  const app = {
    setup() {
      const filterOptions = async event => {
        const value = event.target.value
        state.isLoading = true
        await sleep(100)
        state.options = state.options.filter(option => new RegExp(value).test(option + ''))
        state.isLoading = false
      }
      return {
        state,
        filterOptions,
      }
    },
    components: {
      VueSelect,
    },
    template: `
      <vue-select
        v-model="state.model"
        :options="state.options"
        :isLoading="state.isLoading"
        @search-input="filterOptions"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)

  expect(wrapper.findAll('.vue-select-dropdown-loading').length).toBe(0)

  await wrapper.find('.vue-select-input').trigger('input')
  expect(wrapper.findAll('.vue-select-dropdown-loading').length).toBe(1)

  await sleep(100)
  expect(wrapper.findAll('.vue-select-dropdown-loading').length).toBe(0)
})
