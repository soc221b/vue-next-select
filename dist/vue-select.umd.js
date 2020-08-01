(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueSelect = factory(global.Vue));
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
    },
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
        context.emit('escape', event);
        input.value.blur();
      };

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
        modelValue: _ctx.modelValue,
        placeholder: _ctx.placeholder,
        disabled: _ctx.disabled,
        onInput: _cache[1] || (_cache[1] = (...args) => (_ctx.handleInput(...args))),
        onChange: _cache[2] || (_cache[2] = (...args) => (_ctx.handleChange(...args))),
        onFocus: _cache[3] || (_cache[3] = (...args) => (_ctx.handleFocus(...args))),
        onBlur: _cache[4] || (_cache[4] = (...args) => (_ctx.handleBlur(...args))),
        onKeyup: _cache[5] || (_cache[5] = vue.withKeys(vue.withModifiers((...args) => (_ctx.handleEscape(...args)), ["exact"]), ["esc"]))
      }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["modelValue", "placeholder", "disabled"]),
      vue.renderSlot(_ctx.$slots, "append")
    ]))
  }

  script.render = render;
  script.__file = "src/components/input.vue";

  var script$1 = {
    name: 'vue-tag',
    props: {
      modelValue: {
        required: true,
        type: Array,
        validator(modelValue) {
          return modelValue.every(option => {
            return typeof option.id === 'string' && typeof option.label === 'string' && typeof option.active === 'boolean'
          })
        },
      },
    },
    setup(props, context) {
      const handleClick = (event, option) => {
        context.emit('click', event, option);
      };

      return {
        handleClick,
      }
    },
  };

  const _hoisted_1$1 = { class: "vue-tag" };

  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("ul", _hoisted_1$1, [
      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.modelValue, (option) => {
        return (vue.openBlock(), vue.createBlock("li", {
          key: option.id,
          onClick: $event => (_ctx.handleClick($event, option)),
          class: ["vue-tag-item", { active: option.active, inactive: !option.active }]
        }, [
          vue.renderSlot(_ctx.$slots, "default", { option: option }, () => [
            vue.createVNode("span", null, vue.toDisplayString(option.label), 1 /* TEXT */)
          ])
        ], 10 /* CLASS, PROPS */, ["onClick"]))
      }), 256 /* UNKEYED_FRAGMENT */))
    ]))
  }

  script$1.render = render$1;
  script$1.__file = "src/components/tag.vue";

  var script$2 = {
    inheritAttrs: false,
    name: 'vue-dropdown',
    props: {
      modelValue: {
        required: true,
        type: Array,
        validator(modelValue) {
          return modelValue.every(option => {
            return typeof option.id === 'string' && typeof option.label === 'string' && typeof option.active === 'boolean'
          })
        },
      },
    },
    setup(props, context) {
      const handleClick = (event, option) => {
        context.emit('click', event, option);
      };

      return {
        handleClick,
      }
    },
  };

  const _hoisted_1$2 = { class: "vue-dropdown" };

  function render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createBlock("ul", _hoisted_1$2, [
      (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.modelValue, (option) => {
        return (vue.openBlock(), vue.createBlock("li", {
          key: option.id,
          onClick: $event => (_ctx.handleClick($event, option)),
          class: ["vue-dropdown-item", { active: option.active, inactive: !option.active }]
        }, [
          vue.renderSlot(_ctx.$slots, "default", { option: option }, () => [
            vue.createVNode("span", null, vue.toDisplayString(option.label), 1 /* TEXT */)
          ])
        ], 10 /* CLASS, PROPS */, ["onClick"]))
      }), 256 /* UNKEYED_FRAGMENT */))
    ]))
  }

  script$2.render = render$2;
  script$2.__file = "src/components/dropdown.vue";

  const isSameOption = (option1, option2, { valueBy }) => {
    return valueBy(option1) === valueBy(option2)
  };

  const hasOption = (selectedOptions, option, { valueBy }) => {
    return selectedOptions.find(_option => isSameOption(_option, option, { valueBy })) !== undefined
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

  var useFocus = ({ wrapperRef, ignoreClasses = [] }) => {
    const isIgnoreEl = el => ignoreClasses.some(cls => el.classList.contains(cls));

    const isFocusing = vue.ref(false);
    const handleClickForWindow = event => {
      if (!event) return
      if (!event.target) return

      let el = event.target;
      while (el) {
        if (isIgnoreEl(el)) return
        if (el === wrapperRef.value) {
          isFocusing.value = true;
          return
        }
        el = el.parentElement;
      }

      isFocusing.value = false;
    };

    vue.onMounted(() => window.addEventListener('click', handleClickForWindow));
    vue.onUnmounted(() => window.removeEventListener('click', handleClickForWindow));
    const disableFocus = () => {
      isFocusing.value = false;
      window.removeEventListener('click', handleClickForWindow);
    };
    const enableFocus = () => {
      disableFocus();
      window.addEventListener('click', handleClickForWindow);
    };

    return {
      isFocusing,
      enableFocus,
      disableFocus,
    }
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

    const min = props.multiple ? props.min : props.allowEmpty ? 0 : 1;
    const max = props.multiple ? props.max : 1;

    return {
      trackBy,
      labelBy,
      valueBy,
      min,
      max,
    }
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
        type: Array,
      },
      allowEmpty: {
        default: false,
        type: Boolean,
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
      searchable: {
        default: false,
        type: Boolean,
      },

      taggable: {
        default: false,
        type: Boolean,
      },
      ellipsis: {
        default: false,
        type: Boolean,
      },
    },
    setup(props, context) {
      const { trackBy, labelBy, valueBy, min, max } = normalize(props);

      // focus
      const wrapper = vue.ref(null);
      const ignoreClasses = ['icon-delete'];
      const { isFocusing, disableFocus, enableFocus } = useFocus({ wrapperRef: wrapper, ignoreClasses });
      vue.watch(
        () => props.disabled,
        () => {
          if (props.disabled) disableFocus();
          else enableFocus();
        },
        { immediate: true },
      );
      const input = vue.ref(null);
      vue.watch(
        () => isFocusing.value,
        () => {
          if (isFocusing.value) context.emit('open');
          else context.emit('close');
          setTimeout(() => focus());
        },
      );
      const focus = () => {
        if (isFocusing.value && input.value && input.value._) input.value._.refs.input.focus();
      };
      const close = () => {
        const oldIsFocusing = isFocusing.value;
        setTimeout(() => {
          if (oldIsFocusing === true) isFocusing.value = false;
        });
      };

      // input
      const searchingInputValue = vue.ref('');
      const handleInputForInput = event => {
        searchingInputValue.value = event.target.value;
        context.emit('search-input', event);
      };
      const handleChangeForInput = event => {
        searchingInputValue.value = event.target.value;
        context.emit('search-change', event);
      };
      const handleFocusForInput = event => {
        context.emit('focus', event);
      };
      const handleBlurForInput = event => {
        context.emit('blur', event);
      };

      const selectedOptions = vue.ref([]);
      if (props.multiple) {
        props.modelValue.forEach(value => {
          const option = getOptionByValue(props.options, value, { valueBy });
          selectedOptions.value = addOption(selectedOptions.value, option, { max, valueBy });
        });
      } else {
        const option = getOptionByValue(props.options, props.modelValue, { valueBy });
        selectedOptions.value = addOption(selectedOptions.value, option, { max, valueBy });
      }
      const addOrRemoveOption = (event, option) => {
        if (props.disabled) return

        option = getOptionByValue(props.options, option.id, { valueBy });
        if (hasOption(selectedOptions.value, option, { valueBy })) {
          selectedOptions.value = removeOption(selectedOptions.value, option, { min, valueBy });
          context.emit('remove', option);
        } else {
          if (!props.multiple) {
            selectedOptions.value = removeOption(selectedOptions.value, selectedOptions.value[0], { min: 0, valueBy });
          }
          selectedOptions.value = addOption(selectedOptions.value, option, { max, valueBy });
          context.emit('select', option);
          if (props.closeOnSelect === true) close();
        }
      };
      vue.watch(
        () => selectedOptions,
        () => {
          const selectedValues = selectedOptions.value.map(option => valueBy(option));
          if (props.multiple) {
            context.emit('update:modelValue', selectedValues);
          } else {
            if (selectedValues.length) context.emit('update:modelValue', selectedValues[0]);
            else context.emit('update:modelValue', null);
          }
          focus();
        },
        { deep: true },
      );

      const handleClickForDropdown = (event, option) => addOrRemoveOption(event, option);
      const handleClickForTag = (event, option) => addOrRemoveOption(event, option);
      const dropdownSelectedOptions = vue.computed(() => {
        const selectedValueSet = new Set(selectedOptions.value.map(option => valueBy(option)));
        if (props.hideSelected && isFocusing.value) {
          // effect
          setTimeout(() => (isFocusing.value = true));
        }
        return (props.visibleOptions || props.options)
          .filter(option => (props.hideSelected ? selectedValueSet.has(option.value) === false : true))
          .map(option => ({
            id: trackBy(option),
            label: labelBy(option),
            active: selectedValueSet.has(option.value),
            originalOption: option,
          }))
      });
      const tagSelectedOptions = vue.computed(() => {
        const selectedValueSet = new Set(selectedOptions.value.map(option => valueBy(option)));
        return props.options.map(option => ({
          id: trackBy(option),
          label: labelBy(option),
          active: selectedValueSet.has(option.value),
          originalOption: option,
        }))
      });
      vue.watch(
        () => props.options,
        () => {
          const selectedValueSet = new Set(selectedOptions.value.map(option => option.value));
          selectedOptions.value = props.options.filter(option => selectedValueSet.has(valueBy(option)));
        },
        { deep: true },
      );

      return {
        isFocusing,
        input,
        wrapper,
        close,

        searchingInputValue,
        handleInputForInput,
        handleChangeForInput,
        handleFocusForInput,
        handleBlurForInput,

        handleClickForDropdown,
        handleClickForTag,
        dropdownSelectedOptions,
        tagSelectedOptions,

        addOrRemoveOption,
        focus,
      }
    },
    components: {
      VInput: script,
      VTag: script$1,
      VDropdown: script$2,
    },
  };

  var _imports_0 = 'data:image/svg+xml;base64,PHN2ZyBpZD0iZGVsZXRlIiBkYXRhLW5hbWU9ImRlbGV0ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHRpdGxlPmRlbGV0ZTwvdGl0bGU+PHBhdGggZD0iTTI1NiwyNEMzODMuOSwyNCw0ODgsMTI4LjEsNDg4LDI1NlMzODMuOSw0ODgsMjU2LDQ4OCwyNC4wNiwzODMuOSwyNC4wNiwyNTYsMTI4LjEsMjQsMjU2LDI0Wk0wLDI1NkMwLDM5Ny4xNiwxMTQuODQsNTEyLDI1Niw1MTJTNTEyLDM5Ny4xNiw1MTIsMjU2LDM5Ny4xNiwwLDI1NiwwLDAsMTE0Ljg0LDAsMjU2WiIgZmlsbD0iIzViNWI1ZiIvPjxwb2x5Z29uIHBvaW50cz0iMzgyIDE3Mi43MiAzMzkuMjkgMTMwLjAxIDI1NiAyMTMuMjkgMTcyLjcyIDEzMC4wMSAxMzAuMDEgMTcyLjcyIDIxMy4yOSAyNTYgMTMwLjAxIDMzOS4yOCAxNzIuNzIgMzgyIDI1NiAyOTguNzEgMzM5LjI5IDM4MS45OSAzODIgMzM5LjI4IDI5OC43MSAyNTYgMzgyIDE3Mi43MiIgZmlsbD0iIzViNWI1ZiIvPjwvc3ZnPg==';

  const _hoisted_1$3 = { class: "vue-select-header" };
  const _hoisted_2 = {
    key: 2,
    class: "icon-loading"
  };
  const _hoisted_3 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);
  const _hoisted_4 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);
  const _hoisted_5 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);
  const _hoisted_6 = {
    key: 0,
    class: "icon-loading"
  };
  const _hoisted_7 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);
  const _hoisted_8 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);
  const _hoisted_9 = /*#__PURE__*/vue.createVNode("div", null, null, -1 /* HOISTED */);

  function render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_v_tag = vue.resolveComponent("v-tag");
    const _component_v_input = vue.resolveComponent("v-input");
    const _component_v_dropdown = vue.resolveComponent("v-dropdown");

    return (vue.openBlock(), vue.createBlock("div", {
      ref: "wrapper",
      class: ["vue-select", { disabled: _ctx.disabled }],
      onClick: _cache[6] || (_cache[6] = (...args) => (_ctx.focus(...args)))
    }, [
      vue.createVNode("div", _hoisted_1$3, [
        (_ctx.taggable)
          ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
              vue.createVNode(_component_v_tag, {
                modelValue: _ctx.tagSelectedOptions,
                class: ["vue-select-tag", { ellipsis: _ctx.ellipsis }]
              }, {
                default: vue.withCtx(({ option }) => [
                  vue.renderSlot(_ctx.$slots, "tag-item", {
                    option: option.originalOption
                  }, () => [
                    vue.createVNode("span", null, vue.toDisplayString(option.label), 1 /* TEXT */),
                    vue.createVNode("img", {
                      src: _imports_0,
                      alt: "delete tag",
                      class: "icon-delete",
                      onClick: () => _ctx.addOrRemoveOption(_ctx.$event, option)
                    }, null, 8 /* PROPS */, ["onClick"])
                  ])
                ]),
                _: 1
              }, 8 /* PROPS */, ["modelValue", "class"]),
              vue.createVNode("span", {
                class: ["icon-arrow-downward", { active: _ctx.isFocusing }],
                onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.close(...args)))
              }, null, 2 /* CLASS */)
            ], 64 /* STABLE_FRAGMENT */))
          : (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 1 }, [
              (_ctx.searchable)
                ? vue.createVNode(_component_v_input, {
                    key: 0,
                    ref: "input",
                    modelValue: _ctx.searchingInputValue,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (_ctx.searchingInputValue = $event)),
                    disabled: _ctx.disabled,
                    placeholder: _ctx.placeholder,
                    onInput: _ctx.handleInputForInput,
                    onChange: _ctx.handleChangeForInput,
                    onFocus: _ctx.handleFocusForInput,
                    onBlur: _ctx.handleBlurForInput,
                    onEscape: _ctx.close,
                    class: "vue-select-input"
                  }, null, 8 /* PROPS */, ["modelValue", "disabled", "placeholder", "onInput", "onChange", "onFocus", "onBlur", "onEscape"])
                : (vue.openBlock(), vue.createBlock("div", {
                    key: 1,
                    ref: "input"
                  }, vue.toDisplayString(_ctx.placeholder), 513 /* TEXT, NEED_PATCH */)),
              (_ctx.loading)
                ? (vue.openBlock(), vue.createBlock("span", _hoisted_2, [
                    _hoisted_3,
                    _hoisted_4,
                    _hoisted_5
                  ]))
                : (vue.openBlock(), vue.createBlock("span", {
                    key: 3,
                    class: ["icon-arrow-downward", { active: _ctx.isFocusing }],
                    onClick: _cache[3] || (_cache[3] = (...args) => (_ctx.close(...args)))
                  }, null, 2 /* CLASS */))
            ], 64 /* STABLE_FRAGMENT */))
      ]),
      (_ctx.isFocusing)
        ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
            (_ctx.taggable && _ctx.searchable)
              ? vue.createVNode(_component_v_input, {
                  key: 0,
                  ref: "input",
                  modelValue: _ctx.searchingInputValue,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => (_ctx.searchingInputValue = $event)),
                  disabled: _ctx.disabled,
                  placeholder: _ctx.placeholder,
                  onInput: _ctx.handleInputForInput,
                  onChange: _ctx.handleChangeForInput,
                  onFocus: _ctx.handleFocusForInput,
                  onBlur: _ctx.handleBlurForInput,
                  onEscape: _ctx.close,
                  class: "vue-select-input"
                }, {
                  append: vue.withCtx(() => [
                    (_ctx.loading)
                      ? (vue.openBlock(), vue.createBlock("span", _hoisted_6, [
                          _hoisted_7,
                          _hoisted_8,
                          _hoisted_9
                        ]))
                      : vue.createCommentVNode("v-if", true)
                  ]),
                  _: 1
                }, 8 /* PROPS */, ["modelValue", "disabled", "placeholder", "onInput", "onChange", "onFocus", "onBlur", "onEscape"])
              : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_v_dropdown, {
              modelValue: _ctx.dropdownSelectedOptions,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => (_ctx.dropdownSelectedOptions = $event)),
              onClick: _ctx.handleClickForDropdown,
              class: "vue-select-dropdown"
            }, {
              default: vue.withCtx(({ option }) => [
                vue.renderSlot(_ctx.$slots, "dropdown-item", {
                  option: option.originalOption
                }, () => [
                  vue.createVNode("span", null, vue.toDisplayString(option.label), 1 /* TEXT */)
                ])
              ]),
              _: 1
            }, 8 /* PROPS */, ["modelValue", "onClick"])
          ], 64 /* STABLE_FRAGMENT */))
        : vue.createCommentVNode("v-if", true)
    ], 2 /* CLASS */))
  }

  script$3.render = render$3;
  script$3.__file = "src/index.vue";

  return script$3;

})));
