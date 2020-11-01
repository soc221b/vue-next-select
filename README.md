# vue-next-select

**Status: WIP**

[![npm version](https://badge.fury.io/js/vue-next-select.svg)](https://badge.fury.io/js/vue-next-select)
[![CI](https://github.com/iendeavor/vue-next-select/workflows/CI/badge.svg)](https://github.com/iendeavor/vue-next-select/actions)
[![Coverage Status](https://coveralls.io/repos/github/iendeavor/vue-next-select/badge.svg?branch=develop)](https://coveralls.io/github/iendeavor/vue-next-select?branch=develop)
[![HitCount](http://hits.dwyl.com/iendeavor/vue-next-select.svg)](http://hits.dwyl.com/iendeavor/vue-next-select)

## Live Demo

[![Edit vue-next-select](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-next-select-01mxz?fontsize=14&hidenavigation=1&theme=dark)

## Features

- Fully configurable
- Single select
- Multiple select
- Searching
- Async options support

## Installation

```
$ npm install vue-next-select
```

```js
import { reactive, ref, createApp } from 'vue'
import VueSelect from 'vue-next-select'
import 'vue-next-select/dist/index.min.css'

const app = createApp({
  setup() {
    const value = ref(0)
    const options = reactive([0, 1, 2])
    return {
      value,
      options,
    }
  },
  components: {
    // Local registration
    VueSelect,
  },
  template: `
    <vue-select
      v-model="value"
      :options="options"
    ></vue-select
  `,
})
// Or global registration
app.component('vue-select', VueSelect)
app.mount(document.querySelector('#app'))
```

## Examples

### Single Select

```html
<vue-select v-model="selectedOptions" :options="options" close-on-select></vue-select>
```

```javascript
createApp({
  setup() {
    const selectedOptions = ref('I')
    const options = ref(['I', 'Love', 'Vue'])

    return {
      selectedOptions,
      options,
    }
  },
})
```

### Multiple Select

```html
<vue-select v-model="selectedOptions" :options="options" multiple :min="1" :max="2" close-on-select></vue-select>
```

```javascript
createApp({
  setup() {
    const selectedOptions = ref(['I'])
    const options = ref(['I', 'Love', 'Vue'])

    return {
      selectedOptions,
      options,
    }
  },
})
```

## Props

| Required | Prop                   | Type             | Default          | Arguments | Works if               |
| -------- | ---------------------- | ---------------- | ---------------- | --------- | ---------------------- |
| V        | v\-model / model-value | any              |                  |           |                        |
| V        | options                | Array            |                  |           |                        |
|          | visible-options        | Array            | props.options    |           |                        |
|          | multiple               | Boolean          | false            |           |                        |
|          | min                    | Number           | 0                |           |                        |
|          | max                    | Number           | Infinity         |           | props.multiple is true |
|          | close-on-select        | Boolean          | false            |           |                        |
|          | clear-on-select        | Boolean          | false            |           |                        |
|          | label-by               | Function, String | option           | option    |                        |
|          | value-by               | Function, String | option           | option    |                        |
|          | track-by               | Function, String | option           | option    |                        |
|          | hide-selected          | Boolean          | false            |           | props.multiple is true |
|          | disabled               | Boolean          | false            |           |                        |
|          | loading                | Boolean          | false            |           |                        |
|          | placeholder            | String           | "Select option"  |           |                        |
|          | search-placeholder     | String           | "Type to search" |           |                        |
|          | searchable             | Boolean          | false            |           |                        |
|          | taggable               | Boolean          | false            |           | props.multiple is true |
|          | collapse-tags          | Boolean          | false            |           |                        |

## Events

| Listener        | Arguments |
| --------------- | --------- |
| @select         | option    |
| @remove         | option    |
| @open           |           |
| @close          |           |
| @search\-input  | event     |
| @search\-change | event     |
| @focus          | event     |
| @blur           | event     |

## Slots

| Name           | Arguments |
| -------------- | --------- |
| #tag           | option    |
| #dropdown-item | option    |
