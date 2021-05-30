# Vue-next-select

The selecting solution for Vue 3

![MIT License](https://img.shields.io/github/license/iendeavor/vue-next-select?color=%236f41b8)&nbsp;
![Release](https://img.shields.io/npm/v/vue-next-select?color=%23414db8&label=release)&nbsp;
![Workflow status](https://github.com/iendeavor/vue-next-select/workflows/CI/badge.svg)&nbsp;
![Bundle size](https://img.shields.io/bundlephobia/minzip/vue-next-select)

## Features

- Single select
- Multiple select
- Tagging
- Group
- Filtering / Remote Searching
- Asynchronous support
- No dependencies

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

### Examples

<iframe src="https://codesandbox.io/embed/github/iendeavor/vue-next-select/tree/develop/examples?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="vue-next-select-example"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
