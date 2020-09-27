import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import VueSelect from '../../dist/vue-next-select.es'
import { getFirstDropdownItemElement } from '../dom-utils'

it('should works by default', async () => {
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

  expect(getFirstDropdownItemElement(wrapper).innerHTML).toBe('<span>0</span>')
})

it('should works with string path', async () => {
  const state = reactive({
    model: [],
    options: [
      {
        nested: {
          label: 'a',
          value: 0,
        },
      },
      {
        nested: {
          label: 'a',
          value: 1,
        },
      },
      {
        nested: {
          label: 'c',
          value: 2,
        },
      },
    ],
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
        label-by="nested.label"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('focus')

  expect(getFirstDropdownItemElement(wrapper).innerHTML).toBe('<span>a</span>')
})

it('should works with function', async () => {
  const state = reactive({
    model: [],
    options: [
      {
        label: 'a',
        value: 0,
      },
      {
        label: 'a',
        value: 1,
      },
      {
        label: 'c',
        value: 2,
      },
    ],
  })
  const labelBy = option => option.label
  const app = {
    setup() {
      return {
        state,
        labelBy,
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
        :label-by="labelBy"
      ></vue-select>
    `,
  }
  const wrapper = mount(app)
  await wrapper.trigger('focus')

  expect(getFirstDropdownItemElement(wrapper).innerHTML).toBe('<span>a</span>')
})
