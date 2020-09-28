System.register('VueNextSelect', ['vue'], function (exports) {
  'use strict';
  var ref, onMounted, openBlock, createBlock, renderSlot, createVNode, withKeys, withModifiers, Fragment, renderList, toDisplayString, watch, computed, resolveComponent, createCommentVNode, withCtx;
  return {
    setters: [function (module) {
      ref = module.ref;
      onMounted = module.onMounted;
      openBlock = module.openBlock;
      createBlock = module.createBlock;
      renderSlot = module.renderSlot;
      createVNode = module.createVNode;
      withKeys = module.withKeys;
      withModifiers = module.withModifiers;
      Fragment = module.Fragment;
      renderList = module.renderList;
      toDisplayString = module.toDisplayString;
      watch = module.watch;
      computed = module.computed;
      resolveComponent = module.resolveComponent;
      createCommentVNode = module.createCommentVNode;
      withCtx = module.withCtx;
    }],
    execute: function () {

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

          const input = ref(null);
          const handleEscape = event => {
            input.value.blur();
            context.emit('escape', event);
          };
          onMounted(() => {
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
        return (openBlock(), createBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "prepend"),
          createVNode("input", {
            ref: "input",
            modelValue: $props.modelValue,
            placeholder: $props.placeholder,
            disabled: $props.disabled,
            onInput: _cache[1] || (_cache[1] = (...args) => ($setup.handleInput(...args))),
            onChange: _cache[2] || (_cache[2] = (...args) => ($setup.handleChange(...args))),
            onFocus: _cache[3] || (_cache[3] = (...args) => ($setup.handleFocus(...args))),
            onBlur: _cache[4] || (_cache[4] = (...args) => ($setup.handleBlur(...args))),
            onKeyup: _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => ($setup.handleEscape(...args)), ["exact"]), ["esc"])),
            tabindex: $props.tabindex,
            autofocus: $props.autofocus
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["modelValue", "placeholder", "disabled", "tabindex", "autofocus"]),
          renderSlot(_ctx.$slots, "append")
        ]))
      }

      script.render = render;
      script.__file = "src/components/input.vue";

      var script$1 = {
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
        },
        emits: ['click'],
        setup(props, context) {
          const handleClick = (event, option) => {
            context.emit('click', event, option);
          };

          return {
            handleClick,
          }
        },
      };

      function render$1(_ctx, _cache, $props, $setup, $data, $options) {
        return (openBlock(), createBlock("ul", {
          class: "vue-tags",
          onMousedown: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent"]))
        }, [
          (openBlock(true), createBlock(Fragment, null, renderList($props.modelValue, (option) => {
            return (openBlock(), createBlock("li", {
              key: option.key,
              onClick: $event => ($setup.handleClick($event, option)),
              class: ["vue-tag", { selected: option.selected }]
            }, [
              renderSlot(_ctx.$slots, "default", { option: option }, () => [
                createVNode("span", null, toDisplayString(option.label), 1 /* TEXT */)
              ])
            ], 10 /* CLASS, PROPS */, ["onClick"]))
          }), 128 /* KEYED_FRAGMENT */))
        ], 32 /* HYDRATE_EVENTS */))
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
                return typeof option.key !== undefined && option.label !== undefined && typeof option.selected === 'boolean'
              })
            },
          },
        },
        emits: ['click'],
        setup(props, context) {
          const handleClick = (event, option) => {
            context.emit('click', event, option);
          };

          return {
            handleClick,
          }
        },
      };

      function render$2(_ctx, _cache, $props, $setup, $data, $options) {
        return (openBlock(), createBlock("ul", {
          class: "vue-dropdown",
          onMousedown: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent"]))
        }, [
          (openBlock(true), createBlock(Fragment, null, renderList($props.modelValue, (option) => {
            return (openBlock(), createBlock("li", {
              key: option.key,
              onClick: $event => ($setup.handleClick($event, option)),
              class: ["vue-dropdown-item", { selected: option.selected }]
            }, [
              renderSlot(_ctx.$slots, "default", { option: option }, () => [
                createVNode("span", null, toDisplayString(option.label), 1 /* TEXT */)
              ])
            ], 10 /* CLASS, PROPS */, ["onClick"]))
          }), 128 /* KEYED_FRAGMENT */))
        ], 32 /* HYDRATE_EVENTS */))
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

      var script$3 = exports('default', {
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
        emits: ['update:modelValue', 'select', 'remove', 'open', 'close', 'search-input', 'search-change', 'focus', 'blur'],
        setup(props, context) {
          const { trackBy, labelBy, valueBy, min, max } = normalize(props);

          const wrapper = ref(null);
          const input = ref(null);
          const isFocusing = ref(false);
          watch(
            () => isFocusing.value,
            () => {
              if (isFocusing.value) {
                context.emit('open');
                if (props.searchable) context.emit('focus');
                // toggle arrow downward icon
                if (input.value && input.value._.refs.input !== document.activeElement) {
                  input.value._.refs.input.focus();
                }
              } else {
                // toggle arrow downward icon
                if (input.value && input.value._.refs.input === document.activeElement) {
                  input.value._.refs.input.blur();
                }
                if (props.searchable) context.emit('blur');
                context.emit('close');
              }
            },
          );
          const focus = () => {
            if (props.disabled) return
            isFocusing.value = true;
          };
          const blur = event => {
            isFocusing.value = false;
          };
          const toggle = event => {
            isFocusing.value = !isFocusing.value;
          };

          // input
          const searchingInputValue = ref('');
          const handleInputForInput = event => {
            context.emit('search-input', event);
          };
          const handleChangeForInput = event => {
            context.emit('search-change', event);
          };
          const handleFocusForInput = event => {
            focus();
          };
          const handleBlurForInput = event => {
            blur();
          };

          const selectedOptions = ref([]);
          if (props.multiple) {
            props.modelValue.forEach(value => {
              const option = getOptionByValue(props.options, value, { valueBy });
              selectedOptions.value = addOption(selectedOptions.value, option, { max: Infinity, valueBy });
            });
          } else {
            if (props.modelValue !== null) {
              const option = getOptionByValue(props.options, props.modelValue, { valueBy });
              selectedOptions.value = addOption(selectedOptions.value, option, { max: Infinity, valueBy });
            }
          }
          const addOrRemoveOption = (event, option) => {
            if (props.disabled) return

            option = option.originalOption;
            if (hasOption(selectedOptions.value, option, { valueBy })) {
              selectedOptions.value = removeOption(selectedOptions.value, option, { min, valueBy });
              context.emit('remove', option);
            } else {
              if (!props.multiple) {
                const removingOption = selectedOptions.value[0];
                selectedOptions.value = removeOption(selectedOptions.value, selectedOptions.value[0], { min: 0, valueBy });
                context.emit('remove', removingOption);
              }
              selectedOptions.value = addOption(selectedOptions.value, option, { max, valueBy });
              context.emit('select', option);
            }
            if (props.closeOnSelect === true) isFocusing.value = false;
          };
          watch(
            () => selectedOptions,
            () => {
              const selectedValues = selectedOptions.value.map(option => valueBy(option));
              if (props.multiple) {
                context.emit('update:modelValue', selectedValues);
              } else {
                if (selectedValues.length) context.emit('update:modelValue', selectedValues[0]);
                else context.emit('update:modelValue', null);
              }
            },
            { deep: true },
          );

          const handleClickForDropdown = (event, option) => addOrRemoveOption(event, option);
          const handleClickForTag = (event, option) => addOrRemoveOption(event, option);
          const dropdownSelectedOptions = computed(() => {
            const selectedValueSet = new Set(selectedOptions.value.map(option => valueBy(option)));
            return (props.visibleOptions || props.options)
              .filter(option => (props.hideSelected ? selectedValueSet.has(valueBy(option)) === false : true))
              .map(option => ({
                key: trackBy(option),
                label: labelBy(option),
                selected: selectedValueSet.has(valueBy(option)),
                originalOption: option,
              }))
          });
          const tagSelectedOptions = computed(() => {
            const selectedValueSet = new Set(selectedOptions.value.map(option => valueBy(option)));
            return props.options.map(option => ({
              key: trackBy(option),
              label: labelBy(option),
              selected: selectedValueSet.has(valueBy(option)),
              originalOption: option,
            }))
          });
          watch(
            () => props.options,
            () => {
              const selectedValueSet = new Set(selectedOptions.value.map(option => option.value));
              selectedOptions.value = props.options.filter(option => selectedValueSet.has(valueBy(option)));
            },
            { deep: true },
          );

          return {
            isFocusing,
            wrapper,
            input,
            focus,
            blur,
            toggle,

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
          }
        },
        components: {
          VInput: script,
          VTag: script$1,
          VDropdown: script$2,
        },
      });

      var _imports_0 = 'data:image/svg+xml;base64,PHN2ZyBpZD0iZGVsZXRlIiBkYXRhLW5hbWU9ImRlbGV0ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHRpdGxlPmRlbGV0ZTwvdGl0bGU+PHBhdGggZD0iTTI1NiwyNEMzODMuOSwyNCw0ODgsMTI4LjEsNDg4LDI1NlMzODMuOSw0ODgsMjU2LDQ4OCwyNC4wNiwzODMuOSwyNC4wNiwyNTYsMTI4LjEsMjQsMjU2LDI0Wk0wLDI1NkMwLDM5Ny4xNiwxMTQuODQsNTEyLDI1Niw1MTJTNTEyLDM5Ny4xNiw1MTIsMjU2LDM5Ny4xNiwwLDI1NiwwLDAsMTE0Ljg0LDAsMjU2WiIgZmlsbD0iIzViNWI1ZiIvPjxwb2x5Z29uIHBvaW50cz0iMzgyIDE3Mi43MiAzMzkuMjkgMTMwLjAxIDI1NiAyMTMuMjkgMTcyLjcyIDEzMC4wMSAxMzAuMDEgMTcyLjcyIDIxMy4yOSAyNTYgMTMwLjAxIDMzOS4yOCAxNzIuNzIgMzgyIDI1NiAyOTguNzEgMzM5LjI5IDM4MS45OSAzODIgMzM5LjI4IDI5OC43MSAyNTYgMzgyIDE3Mi43MiIgZmlsbD0iIzViNWI1ZiIvPjwvc3ZnPg==';

      const _hoisted_1$1 = { class: "vue-select-header" };
      const _hoisted_2 = {
        key: 0,
        class: "vue-input"
      };
      const _hoisted_3 = {
        key: 1,
        class: "icon loading"
      };
      const _hoisted_4 = /*#__PURE__*/createVNode("div", null, null, -1 /* HOISTED */);
      const _hoisted_5 = /*#__PURE__*/createVNode("div", null, null, -1 /* HOISTED */);
      const _hoisted_6 = /*#__PURE__*/createVNode("div", null, null, -1 /* HOISTED */);
      const _hoisted_7 = {
        key: 0,
        class: "icon loading"
      };
      const _hoisted_8 = /*#__PURE__*/createVNode("div", null, null, -1 /* HOISTED */);
      const _hoisted_9 = /*#__PURE__*/createVNode("div", null, null, -1 /* HOISTED */);
      const _hoisted_10 = /*#__PURE__*/createVNode("div", null, null, -1 /* HOISTED */);

      function render$3(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_v_tag = resolveComponent("v-tag");
        const _component_v_input = resolveComponent("v-input");
        const _component_v_dropdown = resolveComponent("v-dropdown");

        return (openBlock(), createBlock("div", {
          ref: "wrapper",
          class: ["vue-select", { disabled: $props.disabled }],
          tabindex: $setup.isFocusing ? -1 : $props.tabindex,
          onFocus: _cache[8] || (_cache[8] = (...args) => ($setup.focus(...args))),
          onBlur: _cache[9] || (_cache[9] = () => ($props.searchable ? false : $setup.blur()))
        }, [
          createVNode("div", _hoisted_1$1, [
            (($props.multiple && $props.taggable && $props.modelValue.length === 0) || ($props.searchable === false && $props.taggable === false))
              ? (openBlock(), createBlock("div", _hoisted_2, [
                  createVNode("input", {
                    placeholder: $props.placeholder,
                    disabled: ""
                  }, null, 8 /* PROPS */, ["placeholder"])
                ]))
              : createCommentVNode("v-if", true),
            ($props.multiple && $props.taggable)
              ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode(_component_v_tag, {
                    modelValue: $setup.tagSelectedOptions,
                    class: ["vue-select-tag", { collapsed: $props.collapseTags }]
                  }, {
                    default: withCtx(({ option }) => [
                      renderSlot(_ctx.$slots, "tag", {
                        option: option.originalOption
                      }, () => [
                        createVNode("span", null, toDisplayString(option.label), 1 /* TEXT */),
                        createVNode("img", {
                          src: _imports_0,
                          alt: "delete tag",
                          class: "icon delete",
                          onClick: () => $setup.addOrRemoveOption(_ctx.$event, option)
                        }, null, 8 /* PROPS */, ["onClick"])
                      ])
                    ]),
                    _: 1
                  }, 8 /* PROPS */, ["modelValue", "class"]),
                  createVNode("span", {
                    class: ["icon arrow-downward", { active: $setup.isFocusing }],
                    onClick: _cache[1] || (_cache[1] = (...args) => ($setup.toggle(...args))),
                    onMousedown: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent","stop"]))
                  }, null, 34 /* CLASS, HYDRATE_EVENTS */)
                ], 64 /* STABLE_FRAGMENT */))
              : (openBlock(), createBlock(Fragment, { key: 2 }, [
                  ($props.searchable)
                    ? (openBlock(), createBlock(_component_v_input, {
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
                        autofocus: $props.autofocus || ($props.taggable && $setup.isFocusing),
                        tabindex: $props.tabindex,
                        class: "vue-select-input"
                      }, null, 8 /* PROPS */, ["modelValue", "disabled", "placeholder", "onInput", "onChange", "onFocus", "onBlur", "onEscape", "autofocus", "tabindex"]))
                    : createCommentVNode("v-if", true),
                  ($props.loading)
                    ? (openBlock(), createBlock("span", _hoisted_3, [
                        _hoisted_4,
                        _hoisted_5,
                        _hoisted_6
                      ]))
                    : (openBlock(), createBlock("span", {
                        key: 2,
                        class: ["icon arrow-downward", { active: $setup.isFocusing }],
                        onClick: _cache[4] || (_cache[4] = (...args) => ($setup.toggle(...args))),
                        onMousedown: _cache[5] || (_cache[5] = withModifiers(() => {}, ["prevent","stop"]))
                      }, null, 34 /* CLASS, HYDRATE_EVENTS */))
                ], 64 /* STABLE_FRAGMENT */))
          ]),
          ($setup.isFocusing)
            ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                ($props.multiple && $props.taggable && $props.searchable)
                  ? (openBlock(), createBlock(_component_v_input, {
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
                      autofocus: $props.autofocus || ($props.taggable && $setup.isFocusing),
                      class: "vue-select-input"
                    }, {
                      append: withCtx(() => [
                        ($props.loading)
                          ? (openBlock(), createBlock("span", _hoisted_7, [
                              _hoisted_8,
                              _hoisted_9,
                              _hoisted_10
                            ]))
                          : createCommentVNode("v-if", true)
                      ]),
                      _: 1
                    }, 8 /* PROPS */, ["modelValue", "disabled", "placeholder", "onInput", "onChange", "onFocus", "onBlur", "onEscape", "tabindex", "autofocus"]))
                  : createCommentVNode("v-if", true),
                createVNode(_component_v_dropdown, {
                  modelValue: $setup.dropdownSelectedOptions,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ($setup.dropdownSelectedOptions = $event)),
                  onClick: $setup.handleClickForDropdown,
                  class: "vue-select-dropdown"
                }, {
                  default: withCtx(({ option }) => [
                    renderSlot(_ctx.$slots, "dropdown-item", {
                      option: option.originalOption
                    }, () => [
                      createVNode("span", null, toDisplayString(option.label), 1 /* TEXT */)
                    ])
                  ]),
                  _: 1
                }, 8 /* PROPS */, ["modelValue", "onClick"])
              ], 64 /* STABLE_FRAGMENT */))
            : createCommentVNode("v-if", true)
        ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, ["tabindex"]))
      }

      script$3.render = render$3;
      script$3.__file = "src/index.vue";

    }
  };
});
