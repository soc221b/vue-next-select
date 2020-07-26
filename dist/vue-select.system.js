System.register('VueSelect', ['vue'], function (exports) {
  'use strict';
  var ref, openBlock, createBlock, createVNode, withKeys, withModifiers, Fragment, renderList, toDisplayString, onMounted, onUnmounted, watch, resolveComponent, withDirectives, vShow;
  return {
    setters: [function (module) {
      ref = module.ref;
      openBlock = module.openBlock;
      createBlock = module.createBlock;
      createVNode = module.createVNode;
      withKeys = module.withKeys;
      withModifiers = module.withModifiers;
      Fragment = module.Fragment;
      renderList = module.renderList;
      toDisplayString = module.toDisplayString;
      onMounted = module.onMounted;
      onUnmounted = module.onUnmounted;
      watch = module.watch;
      resolveComponent = module.resolveComponent;
      withDirectives = module.withDirectives;
      vShow = module.vShow;
    }],
    execute: function () {

      var script = {
        inheritAttrs: false,
        name: 'vue-select-input',
        props: {
          modelValue: {
            required: true,
            type: String,
          },
          placeholder: {
            required: true,
            type: String,
          },
          isDisabled: {
            required: true,
            type: Boolean,
          },
          isLoading: {
            required: true,
            type: Boolean,
          },
          isOpen: {
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

          const input = ref(null);
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

      const _hoisted_1 = { class: "vue-select-input-wrapper" };
      const _hoisted_2 = {
        key: 0,
        class: "vue-select-dropdown-loading"
      };
      const _hoisted_3 = /*#__PURE__*/createVNode("div", null, null, -1 /* HOISTED */);
      const _hoisted_4 = /*#__PURE__*/createVNode("div", null, null, -1 /* HOISTED */);
      const _hoisted_5 = /*#__PURE__*/createVNode("div", null, null, -1 /* HOISTED */);

      function render(_ctx, _cache, $props, $setup, $data, $options) {
        return (openBlock(), createBlock("div", _hoisted_1, [
          createVNode("input", {
            ref: "input",
            class: "vue-select-input",
            modelValue: _ctx.modelValue,
            placeholder: _ctx.placeholder,
            disabled: _ctx.isDisabled,
            onInput: _cache[1] || (_cache[1] = (...args) => (_ctx.handleInput(...args))),
            onChange: _cache[2] || (_cache[2] = (...args) => (_ctx.handleChange(...args))),
            onFocus: _cache[3] || (_cache[3] = (...args) => (_ctx.handleFocus(...args))),
            onBlur: _cache[4] || (_cache[4] = (...args) => (_ctx.handleBlur(...args))),
            onKeyup: _cache[5] || (_cache[5] = withKeys(withModifiers((...args) => (_ctx.handleEscape(...args)), ["exact"]), ["esc"]))
          }, null, 40 /* PROPS, HYDRATE_EVENTS */, ["modelValue", "placeholder", "disabled"]),
          (_ctx.isLoading)
            ? (openBlock(), createBlock("span", _hoisted_2, [
                _hoisted_3,
                _hoisted_4,
                _hoisted_5
              ]))
            : (openBlock(), createBlock("span", {
                key: 1,
                class: ["vue-select-dropdown-icon", { active: _ctx.isOpen }]
              }, null, 2 /* CLASS */))
        ]))
      }

      script.render = render;
      script.__file = "src/components/input.vue";

      var script$1 = {
        name: 'vue-select-dropdown',
        props: {
          modelValue: {
            required: true,
            type: Array,
          },
          options: {
            required: true,
            type: Array,
          },
          canBeEmpty: {
            required: true,
            type: Boolean,
          },
          isMultiple: {
            required: true,
            type: Boolean,
          },
          minLength: {
            required: true,
            type: Number,
          },
          maxLength: {
            required: true,
            type: Number,
          },
        },
        setup(props, context) {
          const ul = ref(null);
          const handleClick = option => {
            if (props.isMultiple) {
              if (hasSelected(option)) {
                if (props.modelValue.length > props.minLength) {
                  context.emit('remove', option);
                  context.emit(
                    'update:modelValue',
                    props.modelValue.filter(op => isSame(op, option) === false),
                  );
                }
              } else {
                if (props.modelValue.length < props.maxLength) {
                  context.emit('select', option);
                  context.emit('update:modelValue', props.modelValue.concat(option));
                }
              }
            } else {
              if (props.modelValue.length === 1) {
                if (isSame(props.modelValue[0], option)) {
                  if (props.canBeEmpty) {
                    context.emit('remove', props.modelValue[0]);
                    context.emit('update:modelValue', []);
                  }
                } else {
                  context.emit('remove', props.modelValue[0]);
                  context.emit('update:modelValue', []);
                  context.emit('select', option);
                  context.emit('update:modelValue', [option]);
                }
              } else {
                context.emit('select', option);
                context.emit('update:modelValue', [option]);
              }
            }
          };

          const hasSelected = option => {
            return props.modelValue.some(_option => isSame(option, _option))
          };

          const isSame = (option1, option2) => {
            return option1 === option2
          };

          return {
            handleClick,
            hasSelected,
          }
        },
      };

      const _hoisted_1$1 = {
        ref: "ul",
        class: "vue-select-dropdown",
        style: {"outline":"none"}
      };

      function render$1(_ctx, _cache, $props, $setup, $data, $options) {
        return (openBlock(), createBlock("ul", _hoisted_1$1, [
          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.options, (option) => {
            return (openBlock(), createBlock("li", {
              class: "vue-select-dropdown-item",
              onClick: $event => (_ctx.handleClick(option)),
              selected: _ctx.hasSelected(option)
            }, toDisplayString(option), 9 /* TEXT, PROPS */, ["onClick", "selected"]))
          }), 256 /* UNKEYED_FRAGMENT */))
        ], 512 /* NEED_PATCH */))
      }

      script$1.render = render$1;
      script$1.__file = "src/components/dropdown.vue";

      var script$2 = exports('default', {
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
          canBeEmpty: {
            default: false,
            type: Boolean,
          },
          isMultiple: {
            default: false,
            type: Boolean,
          },
          minLength: {
            default: 0,
            type: Number,
          },
          maxLength: {
            default: Infinity,
            type: Number,
          },
          closeOnSelect: {
            default: false,
            type: Boolean,
          },

          isDisabled: {
            default: false,
            type: Boolean,
          },
          isLoading: {
            default: false,
            type: Boolean,
          },
          placeholder: {
            default: 'Select option',
            type: String,
          },
        },
        setup(props, context) {
          const wrapper = ref(null);
          const input = ref(null);
          const isOpen = ref(false);
          const handleEscapeForInput = event => {
            isOpen.value = false;
          };
          const handleClickForWindow = event => {
            if (!event) return
            if (!event.target) return

            let el = event.target;
            while (el) {
              if (el === wrapper.value) {
                isOpen.value = true;
                input.value._.refs.input.focus();
                return
              }
              el = el.parentElement;
            }
            isOpen.value = false;
          };
          onMounted(() => {
            window.addEventListener('click', handleClickForWindow);
          });
          onUnmounted(() => {
            window.removeEventListener('click', handleClickForWindow);
          });

          const searchingInputValue = ref('');
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

          const multipleSelectValue = ref(props.isMultiple ? [...props.modelValue] : [props.modelValue]);
          const handleOpenForDropdown = event => {
            context.emit('open', event);
          };
          const handleCloseForDropdown = event => {
            context.emit('close', event);
          };
          const handleSelectForDropdown = option => {
            context.emit('select', option);
          };
          const handleRemoveForDropdown = option => {
            context.emit('remove', option);
          };
          watch(
            () => multipleSelectValue,
            () => {
              if (props.isMultiple) {
                context.emit('update:modelValue', [...multipleSelectValue.value]);
              } else {
                if (multipleSelectValue.value.length) {
                  context.emit('update:modelValue', multipleSelectValue.value[0]);
                } else {
                  context.emit('update:modelValue', null);
                }
              }
            },
            { deep: true },
          );

          return {
            isOpen,
            input,
            wrapper,
            handleEscapeForInput,

            searchingInputValue,
            handleInputForInput,
            handleChangeForInput,
            handleFocusForInput,
            handleBlurForInput,

            multipleSelectValue,
            handleOpenForDropdown,
            handleCloseForDropdown,
            handleSelectForDropdown,
            handleRemoveForDropdown,
          }
        },
        components: {
          VInput: script,
          VDropdown: script$1,
        },
      });

      const _hoisted_1$2 = {
        ref: "wrapper",
        class: "vue-select"
      };

      function render$2(_ctx, _cache, $props, $setup, $data, $options) {
        const _component_v_input = resolveComponent("v-input");
        const _component_v_dropdown = resolveComponent("v-dropdown");

        return (openBlock(), createBlock("div", _hoisted_1$2, [
          createVNode(_component_v_input, {
            ref: "input",
            modelValue: _ctx.searchingInputValue,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.searchingInputValue = $event)),
            isOpen: _ctx.isOpen,
            isDisabled: _ctx.isDisabled,
            isLoading: _ctx.isLoading,
            placeholder: _ctx.placeholder,
            onInput: _ctx.handleInputForInput,
            onChange: _ctx.handleChangeForInput,
            onFocus: _ctx.handleFocusForInput,
            onBlur: _ctx.handleBlurForInput,
            onEscape: _ctx.handleEscapeForInput
          }, null, 8 /* PROPS */, ["modelValue", "isOpen", "isDisabled", "isLoading", "placeholder", "onInput", "onChange", "onFocus", "onBlur", "onEscape"]),
          withDirectives(createVNode(_component_v_dropdown, {
            modelValue: _ctx.multipleSelectValue,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (_ctx.multipleSelectValue = $event)),
            options: _ctx.options,
            canBeEmpty: _ctx.canBeEmpty,
            isMultiple: _ctx.isMultiple,
            minLength: _ctx.minLength,
            maxLength: _ctx.maxLength,
            onOpen: _ctx.handleOpenForDropdown,
            onClose: _ctx.handleCloseForDropdown,
            onSelect: _ctx.handleSelectForDropdown,
            onRemove: _ctx.handleRemoveForDropdown
          }, null, 8 /* PROPS */, ["modelValue", "options", "canBeEmpty", "isMultiple", "minLength", "maxLength", "onOpen", "onClose", "onSelect", "onRemove"]), [
            [vShow, _ctx.isOpen]
          ])
        ], 512 /* NEED_PATCH */))
      }

      script$2.render = render$2;
      script$2.__file = "src/index.vue";

    }
  };
});
