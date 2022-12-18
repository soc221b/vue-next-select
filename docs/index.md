# Vue-next-select

The selecting solution for Vue 3

![MIT License](https://img.shields.io/github/license/iendeavor/vue-next-select?color=%236f41b8)&nbsp;
![Release](https://img.shields.io/npm/v/vue-next-select?color=%23414db8&label=release)&nbsp;
![Workflow status](https://github.com/iendeavor/vue-next-select/workflows/CI/badge.svg)&nbsp;
![Bundle size](https://img.shields.io/bundlephobia/minzip/vue-next-select)&nbsp;
[![donate](https://img.shields.io/badge/sponsor-paypal-orange)](https://www.paypal.com/paypalme/iendeavor)

## Features

- Single select
- Multiple select
- Tagging
- Group
- Filtering / Remote Searching
- Asynchronous support
- No dependencies
- Aims to follow WAI-ARIA for the `combobox` and `listbox` widget

## Installation

### NPM / Yarn

```shell
npm install vue-next-select

# or, using yarn
yarn add vue-next-select
```

### CDN

```html
<!-- import style -->
<link type="text/css" rel="stylesheet" href="https://unpkg.com/vue-next-select/dist/index.min.css" />

<!-- import script -->
<script src="https://unpkg.com/vue-next-select/dist/vue-next-select.iife.prod.js"></script>
```

> You can access select component via the global variable `VueNextSelect`

### Component Registration

Global Registration:

```ts
import { createApp } from 'vue'
import VueNextSelect from 'vue-next-select'

const app = createApp({})
app.component('vue-select', VueNextSelect)
```

Local Registration:

```ts
import { createApp } from 'vue'
import VueNextSelect from 'vue-next-select'

const app = Vue.createApp({
  components: {
    'vue-select': VueNextSelect,
  },
})
```

## Getting Started

### Options

In HTML, each menu option is defined by an `option` element nested inside the `select` element:

```html
<select>
  <option>Red</option>
  <option>Green</option>
</select>
```

In `vue-next-select`, you need to pass an `array` of **primitive value**s through an `options` prop:

```html
<vue-select :options="['Red', 'Green']"> </vue-select>
```

The `options` prop also accepts an `array` of **object**s. In this case, you need to pass an additional prop: `label-by`
to display the options:

```html
<vue-select :options="[{ color: 'Red' }, { color: 'Green' }]" label-by="color"> </vue-select>
```

`vue-next-select` requires the `options` prop to be an `array`, if there are no options, you must pass an empty `array`:

```html
<vue-select :options="[]"> </vue-select>
```

See more details about [options](/api-reference#options) and [label-by](/api-reference#label-by) in API reference.
