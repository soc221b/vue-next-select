# vue-next-select

[![npm version](https://badge.fury.io/js/vue-next-select.js.svg)](https://badge.fury.io/js/vue-next-select.js)
[![CI](https://github.com/iendeavor/vue-next-select.js/workflows/CI/badge.svg)](https://github.com/iendeavor/vue-next-select.js/actions)
[![Coverage Status](https://coveralls.io/repos/github/iendeavor/vue-next-select.js/badge.svg?branch=develop)](https://coveralls.io/github/iendeavor/vue-next-select.js?branch=develop)

## Props

| Name                  | Type    | Default        | Description |
| --------------------- | ------- | -------------- | ----------- |
| v\-model / modelValue | any     | required       |             |
| options               | Array   | required       |             |
| canBeEmpty            | Boolean | false          |             |
| isMultiple            | Boolean | false          |             |
| minLength             | Number  | 0              |             |
| maxLength             | Number  | Infinity       |             |
| isDisabled            | false   | false          |             |
| placeholder           | String  | "Pick a value" |             |

## Events

| Name   | Arguments | Listener        |     |
| ------ | --------- | --------------- | --- |
| Select | option    | @select         |     |
| Remove | option    | @remove         |     |
| Open   | \-        | @open           |     |
| Close  | \-        | @close          |     |
| Input  | event     | @search\-input  |     |
| Change | event     | @search\-change |     |
| Focus  | event     | @focus          |     |
| Blur   | event     | @blur           |     |
