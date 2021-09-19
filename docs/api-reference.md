# API Reference

## Props

### model-value

- **Type**:

  - `(OptionType)[]` if `multiple` is `true`
  - `(OptionType | EmptyModelValueType)` if `multiple` is `false`

- **Details**:

  Required.

  The selected options.

### empty-model-value

- **Type**: `EmptyModelValueType = any`

- **Default**: `undefined`

- **Details**:

  Only works if `multiple` is `false`.

  If there is no selecting option, `update:modelValue` event will emit this value.

### options

- **Type**: `OptionType[] = any[]`

- **Details**:

  Required.

### visible-options

- **Type**: `OptionType[]`

- **Details**:

  This would be useful if you have options, but you only want to display partial of those option.

  You could use this feature to implement customize filtering, remote searching, etc.

  > Options in `options` and `visible-options` must be the same **raw** object.

### disabled

- **Type**: `boolean`

- **Default**: `false`

  Whether to disable the select.

### loading

- **Type**: `boolean`

- **Default**: `false`

  Whether to show the loading spinner.

### label-by

- **Type**: `string | (option => string)`

- **Default**: `"label"`

- **Details**:

  This will be used in dropdown and tags.

  It accepts path, or function to locate the label.

  For example, if you have options like this: `[{ details: { name: 'bar' } }]`

  You could pass `details.name` or `option => option.detail.name` to set label to `'bar'`.

### value-by

- **Type**: `string | (option => string)`

- **Details**:

  Same as `label-by` but for `value`

### disabled-by

- **Type**: `string | (option => boolean)`

- **Default**: `'disabled'`

- **Details**:

  Same as `label-by` but for `disabled`

### group-by

- **Type**: `string | (option => boolean)`

- **Default**: `'group'`

- **Details**:

  Same as `label-by` but for `group`

  If one option is group, its `value` must be type `OptionType[]`.

  When a group option is selected, those `value`s will be selected, and if all of those `value`s are already selected,
  it will be deselected.

### placeholder

- **Type**: `string`

- **Default**: `'Select option'`

### searchable

- **Type**: `boolean`

- **Default**: `false`

- **Details**:

  When `true`, `options` (or `visible-options` if passed) will be filtered by the search text.

### search-placeholder

- **Type**: `string`

- **Default**: `'Type to search'`

### clear-on-close

- **Type**: `boolean`

- **Default**: `false`

- **Details**:

  Whether to clear search text after collapsing dropdown.

### clear-on-select

- **Type**: `boolean`

- **Default**: `false`

- **Details**:

  Whether to clear search text after selected/removed.

### multiple

- **Type**: `boolean`

- **Default**: `false`

### min

- **Type**: `number`

- **Default**: `0`

- **Details**:

  If `multiple` is `false`, `0` means clearable, `1` means non-clearable.

### max

- **Type**: `boolean`

- **Default**: `Infinity`

- **Details**:

  Only works if `multiple` is `true`.

### taggable

- **Type**: `boolean`

- **Default**: `false`

- **Details**:

  Only works if `multiple` is `true`.

### collapse-tags

- **Type**: `boolean`

- **Default**: `false`

  Only works if `taggable` is `true`.

### hide-selected

- **Type**: `boolean`

- **Default**: `false`

- **Details**:

  Only works if `multiple` is `true`.

  Whether to Hide already selected options in the dropdown.

### close-on-select

- **Type**: `boolean`

- **Default**: `false`

- **Details**:

  Whether to collapse dropdown after selected/removed.

### maxHeight

New in `v2.5.0+`

- **Type**: `number`

- **Default**: `300`

- **Details**:

  Max height of dropdown.

### openDirection

New in `v2.5.0+`

- **Type**: `'top' | 'bottom'`

- **Details**:

  Fixed opening direction.

  If it is not set, it will be automatically calculated based on `maxHeight`.

## Events

### update:modelValue

- **Arguments**:

  - `{(OptionType | EmptyModelValueType) | (OptionType | EmptyModelValueType)[]}` modelValue

### selected

- **Arguments**:

  - `{OptionType}` option

### removed

- **Arguments**:

  - `{OptionType}` option

### focus

New in `v2.4.0+`

### blur

New in `v2.4.0+`

### toggle

New in `2.6.0+`

### search:input

- **Arguments**:

  - `{Event}` event

### search:change

- **Arguments**:

  - `{Event}` event

### search:focus

- **Arguments**:

  - `{Event}` event

### search:blur

- **Arguments**:

  - `{Event}` event

## Slots

### dropdown-item

- **Attributes**:

  - `{OptionType}` option

### label

New in `v2.9.0+`

- **Attributes**:

  - `{(OptionType | EmptyModelValueType) | (OptionType | EmptyModelValueType)[]}` selected

### tag

- **Attributes**:

  - `{OptionType}` option
  - `{Function}` remove

    New in `v2.7.0+`

### toggle

- **Attributes**:

  - `{boolean}` isFocusing
  - `{Function}` toggle

  When using this slot, you often need to bind the `toggle` function to click event or else to enable open/close
  functionality.

  In addition, you may also have to prevent **mousedown** event by adding `@mousedown.prevent` to prevent default
  behavior (fire focus event). See more details [here](https://github.com/iendeavor/vue-next-select/issues/239).

### loading
