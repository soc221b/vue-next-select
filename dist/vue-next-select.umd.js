(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueNextSelect = factory(global.Vue));
}(this, (function (vue) { 'use strict';

  var script = {
    inheritAttrs: false,
    name: 'vue-input',
    props: {
      modelValue: {
        required: true,
        type: String,
      },
      placeholder: {
        required: true,
        type: String,
      },
      disabled: {
        required: true,
        type: Boolean,
      },
      tabindex: {
        required: true,
        type: Number,
      },
      autofocus: {
        required: true,
        type: Boolean,
      },
    },
    emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'escape'],
    setup(props, context) {
      const handleInput = event => {
        context.emit('input', event);
        context.emit('update:modelValue', event.target.value);
      };
      const handleChange = event => {
        context.emit('change', event);
        context.emit('update:modelValue', event.target.value);
      };
      const handleFocus = event => {
        context.emit('focus', event);
      };
      const handleBlur = event => {
        context.emit('blur', event);
      };

      const input = vue.ref(null);
      const handleEscape = event => {
        input.value.blur();
        context.emit('escape', event);
      };
      vue.onMounted(() => {
        if (props.autofocus) input.value.focus();
      });
      vue.onUpdated(() => {
        if (props.autofocus) input.value.focus();
      });

      return {
        handleInput,
        handleChange,
        handleFocus,
        handleBlur,

        input,
        handleEscape,
      }
    },
  };

  const _hoisted_1 = { class: "vue-input" };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
      vue.renderSlot(_ctx.$slots, "prepend"),
      vue.createVNode("input", {
        ref: "input",
        modelValue: $props.modelValue,
        placeholder: $props.placeholder,
        disabled: $props.disabled,
        onInput: _cache[1] || (_cache[1] = (...args) => ($setup.handleInput(...args))),
        onChange: _cache[2] || (_cache[2] = (...args) => ($setup.handleChange(...args))),
        onFocus: _cache[3] || (_cache[3] = (...args) => ($setup.handleFocus(...args))),
        onBlur: _cache[4] || (_cache[4] = (...args) => ($setup.handleBlur(...args))),
        onKeyup: _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers((...args) => ($setup.handleEscape(...args)), ["exact"]), ["esc"])),
        tabindex: $props.tabindex,
        autofocus: $props.autofocus
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["modelValue", "placeholder", "disabled", "tabindex", "autofocus"]),
      vue.renderSlot(_ctx.$slots, "append")
    ]))
  }

  script.render = render;
  script.__file = "src/components/input.vue";

  var script$1 = {
    inheritAttrs: false,
    name: 'vue-tags',
    props: {
      modelValue: {
        required: true,
        type: Array,
        validator(modelValue) {
          return modelValue.every(option => {
            return typeof option.key !== undefined && option.label !== undefined && typeof option.selected === 'boolean'
          })
        },
      },
      collapseTags: {
        type: Boolean,
      },
    },
    emits: ['click'],
    setup(props, context) {
      const dataAttrs = vue.inject('dataAttrs');

      const handleClick = event => {
        context.emit('click', event);
      };

      return {
        dataAttrs,
        handleClick,
      }
    },
  };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("ul", {
      class: ["vue-tags", { collapsed: $props.collapseTags }],
      onMousedown: _cache[1] || (_cache[1] = vue.withModifiers(() => {}, ["prevent"])),
      tabindex: "-1",
      onClick: _cache[2] || (_cache[2] = (...args) => ($setup.handleClick(...args))),
      "data-is-focusing": $setup.dataAttrs.isFocusing,
      "data-visible-length": $setup.dataAttrs.visibleLength,
      "data-not-selected-length": $setup.dataAttrs.notSelectedLength,
      "data-selected-length": $setup.dataAttrs.selectedLength,
      "data-total-length": $setup.dataAttrs.totalLength
    }, [
      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.modelValue, (option) => {
        return (vue.openBlock(), vue.createBlock("li", {
          key: option.key,
          class: ["vue-tag", { selected: option.selected }]
        }, [
          vue.renderSlot(_ctx.$slots, "default", { option: option }, () => [
            vue.createVNode("span", null, vue.toDisplayString(option.label), 1 /* TEXT */)
          ])
        ], 2 /* CLASS */))
      }), 128 /* KEYED_FRAGMENT */))
    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["data-is-focusing", "data-visible-length", "data-not-selected-length", "data-selected-length", "data-total-length"]))
  }

  script$1.render = render$1;
  script$1.__file = "src/components/tags.vue";

  var script$2 = {
    inheritAttrs: false,
    name: 'vue-dropdown',
    props: {
      modelValue: {
        required: true,
        type: Array,
        validator(modelValue) {
          return modelValue.every(option => {
            return typeof option.key !== undefined && option.label !== undefined && typeof option.selected === 'boolean'
          })
        },
      },
      headerHeight: {
        required: true,
        type: String,
      },
    },
    emits: ['click'],
    setup(props, context) {
      const dataAttrs = vue.inject('dataAttrs');

      const handleClick = (event, option) => {
        context.emit('click', event, option);
      };

      return {
        dataAttrs,
        handleClick,
      }
    },
  };

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("ul", {
      class: "vue-dropdown",
      onMousedown: _cache[1] || (_cache[1] = vue.withModifiers(() => {}, ["prevent"])),
      style: { top: $props.headerHeight },
      "data-is-focusing": $setup.dataAttrs.isFocusing,
      "data-visible-length": $setup.dataAttrs.visibleLength,
      "data-not-selected-length": $setup.dataAttrs.notSelectedLength,
      "data-selected-length": $setup.dataAttrs.selectedLength,
      "data-total-length": $setup.dataAttrs.totalLength
    }, [
      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.modelValue, (option) => {
        return (vue.openBlock(), vue.createBlock(vue.Fragment, {
          key: option.key
        }, [
          (option.visible && option.hidden === false)
            ? (vue.openBlock(), vue.createBlock("li", {
                key: 0,
                onClick: $event => ($setup.handleClick($event, option)),
                class: ["vue-dropdown-item", { selected: option.selected }]
              }, [
                vue.renderSlot(_ctx.$slots, "default", { option: option }, () => [
                  vue.createVNode("span", null, vue.toDisplayString(option.label), 1 /* TEXT */)
                ])
              ], 10 /* CLASS, PROPS */, ["onClick"]))
            : vue.createCommentVNode("v-if", true)
        ], 64 /* STABLE_FRAGMENT */))
      }), 128 /* KEYED_FRAGMENT */))
    ], 44 /* STYLE, PROPS, HYDRATE_EVENTS */, ["data-is-focusing", "data-visible-length", "data-not-selected-length", "data-selected-length", "data-total-length"]))
  }

  script$2.render = render$2;
  script$2.__file = "src/components/dropdown.vue";

  const isSameOption = (option1, option2, { valueBy }) => {
    return valueBy(option1) === valueBy(option2)
  };

  const hasOption = (options, option, { valueBy }) => {
    return options.findIndex(_option => isSameOption(_option, option, { valueBy })) !== -1
  };

  const getOptionByValue = (options, value, { valueBy }) => {
    return options.find(option => valueBy(option) === value)
  };

  const addOption = (selectedOptions, option, { max, valueBy }) => {
    if (hasOption(selectedOptions, option, { valueBy })) return selectedOptions
    if (selectedOptions.length + 1 > max) return selectedOptions

    return selectedOptions.concat(option)
  };

  const removeOption = (selectedOptions, option, { min, valueBy }) => {
    if (hasOption(selectedOptions, option, { valueBy }) === false) return selectedOptions
    if (selectedOptions.length - 1 < min) return selectedOptions

    return selectedOptions.filter(_option => isSameOption(_option, option, { valueBy }) === false)
  };

  var normalize = props => {
    const trackBy =
      typeof props.trackBy === 'function'
        ? props.trackBy
        : typeof props.trackBy === 'string'
        ? option => props.trackBy.split('.').reduce((value, key) => value[key], option)
        : option => option;

    const labelBy =
      typeof props.labelBy === 'function'
        ? props.labelBy
        : typeof props.labelBy === 'string'
        ? option => props.labelBy.split('.').reduce((value, key) => value[key], option)
        : option => option;

    const valueBy =
      typeof props.valueBy === 'function'
        ? props.valueBy
        : typeof props.valueBy === 'string'
        ? option => props.valueBy.split('.').reduce((value, key) => value[key], option)
        : option => option;

    const min = props.multiple ? props.min : Math.min(1, props.min);
    const max = props.multiple ? props.max : 1;

    return {
      trackBy,
      labelBy,
      valueBy,
      min,
      max,
    }
  };

  var useHeight = function (element, watchSource) {
      var height = vue.ref('0');
      var calcHeaderHeight = function () {
          setTimeout(function () {
              if (!element.value)
                  return;
              height.value = window.getComputedStyle(element.value).height;
          });
      };
      vue.watch(watchSource, calcHeaderHeight);
      vue.onMounted(calcHeaderHeight);
      return height;
  };

  var script$3 = {
    name: 'vue-select',
    inheritAttrs: false,
    props: {
      modelValue: {
        required: true,
      },
      options: {
        required: true,
        type: Array,
      },
      visibleOptions: {
        type: [Array, null],
        default: null,
      },
      multiple: {
        default: false,
        type: Boolean,
      },
      min: {
        default: 0,
        type: Number,
      },
      max: {
        default: Infinity,
        type: Number,
      },
      closeOnSelect: {
        default: false,
        type: Boolean,
      },
      clearOnSelect: {
        default: false,
        type: Boolean,
      },
      trackBy: {
        type: [String, Function],
      },
      hideSelected: {
        default: false,
        type: Boolean,
      },
      labelBy: {
        type: [String, Function],
      },
      valueBy: {
        type: [String, Function],
      },

      disabled: {
        default: false,
        type: Boolean,
      },
      loading: {
        default: false,
        type: Boolean,
      },
      placeholder: {
        default: 'Select option',
        type: String,
      },
      searchPlaceholder: {
        default: 'Type to search',
        type: String,
      },
      searchable: {
        default: false,
        type: Boolean,
      },

      taggable: {
        default: false,
        type: Boolean,
      },
      collapseTags: {
        default: false,
        type: Boolean,
      },
      tabindex: {
        default: 0,
        type: Number,
      },
      autofocus: {
        default: false,
        type: Boolean,
      },
    },
    emits: [
      'update:modelValue',
      'selected',
      'removed',
      'opened',
      'closed',
      'search:input',
      'search:change',
      'search:focus',
      'search:blur',
    ],
    setup(props, context) {
      const { trackBy, labelBy, valueBy, min, max } = normalize(props);

      const wrapper = vue.ref(null);
      const input = vue.ref(null);
      const isFocusing = vue.ref(false);
      vue.watch(
        () => isFocusing.value,
        () => {
          if (isFocusing.value) {
            context.emit('opened');
            if (props.searchable) context.emit('search:focus');
            // toggle arrow downward icon
            if (props.searchable) {
              if (input.value && input.value._.refs.input !== document.activeElement) {
                input.value._.refs.input.focus();
              }
            } else if (props.searchable === false) {
              wrapper.value.focus();
            }
          } else {
            // toggle arrow downward icon
            if (input.value && input.value._.refs.input === document.activeElement) {
              input.value._.refs.input.blur();
            }
            if (wrapper.value && wrapper.value === document.activeElement) {
              wrapper.value.blur();
            }
            if (props.searchable) context.emit('search:blur');
            context.emit('closed');
          }
        },
      );
      const focus = () => {
        if (props.disabled) return
        isFocusing.value = true;
      };
      const blur = () => {
        isFocusing.value = false;
      };
      const toggle = () => {
        if (isFocusing.value) blur();
        else focus();
      };
      vue.watch(
        () => props.disabled,
        () => blur(),
      );

      const header = vue.ref(null);
      const headerHeight = useHeight(header, () => props.modelValue);
      const inputHeight = vue.computed(() => (props.searchable && props.multiple && props.taggable ? '22px' : '0px'));
      const headerAndInputHeight = vue.computed(() => parseFloat(headerHeight.value) + parseFloat(inputHeight.value) + 'px');

      // input
      const searchingInputValue = vue.ref('');
      const handleInputForInput = event => {
        context.emit('search:input', event);
      };
      const handleChangeForInput = event => {
        context.emit('search:change', event);
      };
      const handleFocusForInput = event => {
        focus();
      };
      const handleBlurForInput = event => {
        blur();
      };

      // sync model value
      const innerModelValue = vue.ref([]);
      const isSynchronoused = () => {
        if (props.multiple) {
          if (Array.isArray(props.modelValue) === false) return false
          if (innerModelValue.value.length !== props.modelValue.length) return false
          if (
            Object.keys(innerModelValue.value).some(
              index =>
                innerModelValue.value[index] !== getOptionByValue(props.options, props.modelValue[index], { valueBy }),
            )
          )
            return false
        } else {
          if (innerModelValue.value.length === 0 && props.modelValue !== null) return false
          if (innerModelValue.value.length === 1 && props.modelValue === null) return false
          if (innerModelValue.value[0] !== getOptionByValue(props.options, props.modelValue, { valueBy })) return false
        }
        return true
      };
      const syncFromModelValue = () => {
        if (isSynchronoused()) return
        innerModelValue.value = [];
        const modelValue = props.multiple ? props.modelValue : props.modelValue === null ? [] : [props.modelValue];
        for (const value of modelValue) {
          const option = getOptionByValue(props.options, value, { valueBy });
          // guarantee options has modelValue
          if (hasOption(props.options, option, { valueBy }) === false) continue
          innerModelValue.value = addOption(innerModelValue.value, option, { max: Infinity, valueBy });
        }
      };
      syncFromModelValue();
      vue.watch(
        () => props.modelValue,
        () => {
          syncFromModelValue();
        },
        { deep: true },
      );

      const syncFromInnerModelValue = () => {
        if (isSynchronoused()) return
        const selectedValues = innerModelValue.value.map(option => valueBy(option));
        if (props.multiple) {
          context.emit('update:modelValue', selectedValues);
        } else {
          if (selectedValues.length) context.emit('update:modelValue', selectedValues[0]);
          else context.emit('update:modelValue', null);
        }
      };
      vue.watch(
        () => innerModelValue,
        () => {
          syncFromInnerModelValue();
        },
        { deep: true },
      );

      // guarantee options has modelValue
      vue.watch(
        () => props.options,
        () => {
          const selectedValueSet = new Set(innerModelValue.value.map(option => valueBy(option)));
          innerModelValue.value = props.options.filter(option => selectedValueSet.has(valueBy(option)));
        },
        { deep: true },
      );

      const addOrRemoveOption = (event, option) => {
        if (props.disabled) return

        option = option.originalOption;
        if (hasOption(innerModelValue.value, option, { valueBy })) {
          innerModelValue.value = removeOption(innerModelValue.value, option, { min, valueBy });
          context.emit('removed', option);
        } else {
          if (!props.multiple) {
            const removingOption = innerModelValue.value[0];
            innerModelValue.value = removeOption(innerModelValue.value, innerModelValue.value[0], { min: 0, valueBy });
            context.emit('removed', removingOption);
          }
          innerModelValue.value = addOption(innerModelValue.value, option, { max, valueBy });
          context.emit('selected', option);
        }
        if (props.closeOnSelect === true) isFocusing.value = false;
        if (props.clearOnSelect === true && searchingInputValue.value) {
          // simulate clear input value
          input.value._.refs.input.value = '';
          input.value._.refs.input.dispatchEvent(new Event('input'));
          input.value._.refs.input.dispatchEvent(new Event('change'));
        }
      };
      const handleClickForDropdown = (event, option) => addOrRemoveOption(event, option);
      const handleClickForTag = (event, option) => addOrRemoveOption(event, option);

      const optionsWithInfo = vue.computed(() => {
        const selectedValueSet = new Set(innerModelValue.value.map(option => valueBy(option)));
        const visibleValueSet =
          props.visibleOptions !== null
            ? new Set(props.visibleOptions.map(option => valueBy(option)))
            : new Set(props.options.map(option => valueBy(option)));

        return props.options.map(option => ({
          key: trackBy(option),
          label: labelBy(option),
          selected: selectedValueSet.has(valueBy(option)),
          visible: visibleValueSet.has(valueBy(option)),
          hidden: props.hideSelected ? selectedValueSet.has(valueBy(option)) : false,
          originalOption: option,
        }))
      });

      const dataAttrs = vue.computed(() => ({
        isFocusing: isFocusing.value,
        visibleLength: optionsWithInfo.value.filter(option => option.visible && option.hidden === false).length,
        notSelectedLength: props.options.length - optionsWithInfo.value.filter(option => option.selected).length,
        selectedLength: optionsWithInfo.value.filter(option => option.selected).length,
        totalLength: props.options.length,
      }));
      vue.provide('dataAttrs', dataAttrs);

      return {
        isFocusing,
        wrapper,
        input,
        focus,
        blur,
        toggle,

        header,
        headerAndInputHeight,

        searchingInputValue,
        handleInputForInput,
        handleChangeForInput,
        handleFocusForInput,
        handleBlurForInput,

        handleClickForDropdown,
        handleClickForTag,

        optionsWithInfo,
        addOrRemoveOption,

        dataAttrs,
      }
    },
    components: {
      VInput: script,
      VTags: script$1,
      VDropdown: script$2,
    },
  };

  var _imports_0 = 'data:image/svg+xml;base64,PHN2ZyBpZD0iZGVsZXRlIiBkYXRhLW5hbWU9ImRlbGV0ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHRpdGxlPmRlbGV0ZTwvdGl0bGU+PHBhdGggZD0iTTI1NiwyNEMzODMuOSwyNCw0ODgsMTI4LjEsNDg4LDI1NlMzODMuOSw0ODgsMjU2LDQ4OCwyNC4wNiwzODMuOSwyNC4wNiwyNTYsMTI4LjEsMjQsMjU2LDI0Wk0wLDI1NkMwLDM5Ny4xNiwxMTQuODQsNTEyLDI1Niw1MTJTNTEyLDM5Ny4xNiw1MTIsMjU2LDM5Ny4xNiwwLDI1NiwwLDAsMTE0Ljg0LDAsMjU2WiIgZmlsbD0iIzViNWI1ZiIvPjxwb2x5Z29uIHBvaW50cz0iMzgyIDE3Mi43MiAzMzkuMjkgMTMwLjAxIDI1NiAyMTMuMjkgMTcyLjcyIDEzMC4wMSAxMzAuMDEgMTcyLjcyIDIxMy4yOSAyNTYgMTMwLjAxIDMzOS4yOCAxNzIuNzIgMzgyIDI1NiAyOTguNzEgMzM5LjI5IDM4MS45OSAzODIgMzM5LjI4IDI5OC43MSAyNTYgMzgyIDE3Mi43MiIgZmlsbD0iIzViNWI1ZiIvPjwvc3ZnPg==';

  const _hoisted_1$1 = {
    ref: "header",
    class: "vue-select-header"
  };
  const _hoisted_2 = {
    key: 0,
    class: "vue-input"
  };
  const _hoisted_3 = { class: "icon loading" };
  const _hoisted_4 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);
  const _hoisted_5 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);
  const _hoisted_6 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);
  const _hoisted_7 = { class: "icon loading" };
  const _hoisted_8 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);
  const _hoisted_9 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);
  const _hoisted_10 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_v_tags = vue.resolveComponent("v-tags");
    const _component_v_input = vue.resolveComponent("v-input");
    const _component_v_dropdown = vue.resolveComponent("v-dropdown");

    return (vue.openBlock(), vue.createBlock("div", {
      ref: "wrapper",
      class: ["vue-select", { disabled: $props.disabled }],
      tabindex: $setup.isFocusing ? -1 : $props.tabindex,
      onFocus: _cache[8] || (_cache[8] = (...args) => ($setup.focus(...args))),
      onBlur: _cache[9] || (_cache[9] = () => ($props.searchable ? false : $setup.blur())),
      "data-is-focusing": $setup.dataAttrs.isFocusing,
      "data-visible-length": $setup.dataAttrs.visibleLength,
      "data-not-selected-length": $setup.dataAttrs.notSelectedLength,
      "data-selected-length": $setup.dataAttrs.selectedLength,
      "data-total-length": $setup.dataAttrs.totalLength
    }, [
      vue.createVNode("div", _hoisted_1$1, [
        (($props.multiple && $props.taggable && $props.modelValue.length === 0) || ($props.searchable === false && $props.taggable === false))
          ? (vue.openBlock(), vue.createBlock("div", _hoisted_2, [
              vue.createVNode("input", {
                placeholder: $props.placeholder,
                disabled: ""
              }, null, 8 /* PROPS */, ["placeholder"])
            ]))
          : vue.createCommentVNode("v-if", true),
        ($props.multiple && $props.taggable)
          ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
              vue.createVNode(_component_v_tags, {
                modelValue: $setup.optionsWithInfo,
                "collapse-tags": $props.collapseTags,
                tabindex: "-1",
                onClick: $setup.focus
              }, {
                default: vue.withCtx(({ option }) => [
                  vue.renderSlot(_ctx.$slots, "tag", {
                    option: option.originalOption
                  }, () => [
                    vue.createVNode("span", null, vue.toDisplayString(option.label), 1 /* TEXT */),
                    vue.createVNode("img", {
                      src: _imports_0,
                      alt: "delete tag",
                      class: "icon delete",
                      onClick: vue.withModifiers(() => $setup.addOrRemoveOption(_ctx.$event, option), ["prevent","stop"])
                    }, null, 8 /* PROPS */, ["onClick"])
                  ])
                ]),
                _: 1
              }, 8 /* PROPS */, ["modelValue", "collapse-tags", "onClick"]),
              vue.createVNode("span", {
                class: ["icon arrow-downward", { active: $setup.isFocusing }],
                onClick: _cache[1] || (_cache[1] = (...args) => ($setup.toggle(...args))),
                onMousedown: _cache[2] || (_cache[2] = vue.withModifiers(() => {}, ["prevent","stop"]))
              }, null, 34 /* CLASS, HYDRATE_EVENTS */)
            ], 64 /* STABLE_FRAGMENT */))
          : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 2 }, [
              ($props.searchable)
                ? (vue.openBlock(), vue.createBlock(_component_v_input, {
                    key: 0,
                    ref: "input",
                    modelValue: $setup.searchingInputValue,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ($setup.searchingInputValue = $event)),
                    disabled: $props.disabled,
                    placeholder: $props.searchPlaceholder,
                    onInput: $setup.handleInputForInput,
                    onChange: $setup.handleChangeForInput,
                    onFocus: $setup.handleFocusForInput,
                    onBlur: $setup.handleBlurForInput,
                    onEscape: $setup.blur,
                    autofocus: $props.autofocus || ($props.taggable && $props.searchable),
                    tabindex: $props.tabindex
                  }, null, 8 /* PROPS */, ["modelValue", "disabled", "placeholder", "onInput", "onChange", "onFocus", "onBlur", "onEscape", "autofocus", "tabindex"]))
                : vue.createCommentVNode("v-if", true),
              vue.withDirectives(vue.createVNode("span", _hoisted_3, [
                _hoisted_4,
                _hoisted_5,
                _hoisted_6
              ], 512 /* NEED_PATCH */), [
                [vue.vShow, $props.loading]
              ]),
              vue.withDirectives(vue.createVNode("span", {
                class: ["icon arrow-downward", { active: $setup.isFocusing }],
                onClick: _cache[4] || (_cache[4] = (...args) => ($setup.toggle(...args))),
                onMousedown: _cache[5] || (_cache[5] = vue.withModifiers(() => {}, ["prevent","stop"]))
              }, null, 34 /* CLASS, HYDRATE_EVENTS */), [
                [vue.vShow, $props.loading === false]
              ])
            ], 64 /* STABLE_FRAGMENT */))
      ], 512 /* NEED_PATCH */),
      ($props.multiple && $props.taggable && $props.searchable)
        ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_v_input, {
            key: 0,
            ref: "input",
            modelValue: $setup.searchingInputValue,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ($setup.searchingInputValue = $event)),
            disabled: $props.disabled,
            placeholder: $props.searchPlaceholder,
            onInput: $setup.handleInputForInput,
            onChange: $setup.handleChangeForInput,
            onFocus: $setup.handleFocusForInput,
            onBlur: $setup.handleBlurForInput,
            onEscape: $setup.blur,
            tabindex: $props.tabindex,
            autofocus: $props.autofocus || ($props.taggable && $props.searchable)
          }, {
            append: vue.withCtx(() => [
              vue.withDirectives(vue.createVNode("span", _hoisted_7, [
                _hoisted_8,
                _hoisted_9,
                _hoisted_10
              ], 512 /* NEED_PATCH */), [
                [vue.vShow, $props.loading]
              ])
            ]),
            _: 1
          }, 8 /* PROPS */, ["modelValue", "disabled", "placeholder", "onInput", "onChange", "onFocus", "onBlur", "onEscape", "tabindex", "autofocus"])), [
            [vue.vShow, $setup.isFocusing]
          ])
        : vue.createCommentVNode("v-if", true),
      vue.withDirectives(vue.createVNode(_component_v_dropdown, {
        modelValue: $setup.optionsWithInfo,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ($setup.optionsWithInfo = $event)),
        onClick: $setup.handleClickForDropdown,
        "header-height": $setup.headerAndInputHeight
      }, {
        default: vue.withCtx(({ option }) => [
          vue.renderSlot(_ctx.$slots, "dropdown-item", {
            option: option.originalOption
          }, () => [
            vue.createVNode("span", null, vue.toDisplayString(option.label), 1 /* TEXT */)
          ])
        ]),
        _: 1
      }, 8 /* PROPS */, ["modelValue", "onClick", "header-height"]), [
        [vue.vShow, $setup.isFocusing]
      ])
    ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["tabindex", "data-is-focusing", "data-visible-length", "data-not-selected-length", "data-selected-length", "data-total-length"]))
  }

  script$3.render = render$3;
  script$3.__file = "src/index.vue";

  return script$3;

})));
