System.register("VueNextSelect",["vue"],(function(e){"use strict";var l,a,n,t,o,u,i,d,s,r,p,c,y,v,m,g;return{setters:[function(e){l=e.ref,a=e.onMounted,n=e.openBlock,t=e.createBlock,o=e.renderSlot,u=e.createVNode,i=e.withKeys,d=e.withModifiers,s=e.Fragment,r=e.renderList,p=e.toDisplayString,c=e.watch,y=e.computed,v=e.resolveComponent,m=e.createCommentVNode,g=e.withCtx}],execute:function(){var h={inheritAttrs:!1,name:"vue-input",props:{modelValue:{required:!0,type:String},placeholder:{required:!0,type:String},disabled:{required:!0,type:Boolean},tabindex:{required:!0,type:Number}},emits:["update:modelValue","input","change","focus","blur","escape"],setup(e,n){const t=l(null);return a(()=>{t.value.focus()}),{handleInput:e=>{n.emit("input",e),n.emit("update:modelValue",e.target.value)},handleChange:e=>{n.emit("change",e),n.emit("update:modelValue",e.target.value)},handleFocus:e=>{n.emit("focus",e)},handleBlur:e=>{n.emit("blur",e)},input:t,handleEscape:e=>{t.value.blur(),n.emit("escape",e)}}}};const b={class:"vue-input"};h.render=function(e,l,a,s,r,p){return n(),t("div",b,[o(e.$slots,"prepend"),u("input",{ref:"input",modelValue:a.modelValue,placeholder:a.placeholder,disabled:a.disabled,onInput:l[1]||(l[1]=(...e)=>s.handleInput(...e)),onChange:l[2]||(l[2]=(...e)=>s.handleChange(...e)),onFocus:l[3]||(l[3]=(...e)=>s.handleFocus(...e)),onBlur:l[4]||(l[4]=(...e)=>s.handleBlur(...e)),onKeyup:l[5]||(l[5]=i(d((...e)=>s.handleEscape(...e),["exact"]),["esc"])),tabindex:a.tabindex},null,40,["modelValue","placeholder","disabled","tabindex"]),o(e.$slots,"append")])},h.__file="src/components/input.vue";var I={name:"vue-tags",props:{modelValue:{required:!0,type:Array,validator:e=>e.every(e=>void 0!==typeof e.key&&void 0!==e.label&&"boolean"==typeof e.selected)}},emits:["click"],setup:(e,l)=>({handleClick:(e,a)=>{l.emit("click",e,a)}})};I.render=function(e,l,a,i,c,y){return n(),t("ul",{class:"vue-tags",onMousedown:l[1]||(l[1]=d(()=>{},["prevent"]))},[(n(!0),t(s,null,r(a.modelValue,l=>(n(),t("li",{key:l.key,onClick:e=>i.handleClick(e,l),class:["vue-tag",{selected:l.selected}]},[o(e.$slots,"default",{option:l},()=>[u("span",null,p(l.label),1)])],10,["onClick"]))),128))],32)},I.__file="src/components/tag.vue";var f={inheritAttrs:!1,name:"vue-dropdown",props:{modelValue:{required:!0,type:Array,validator:e=>e.every(e=>void 0!==typeof e.key&&void 0!==e.label&&"boolean"==typeof e.selected)}},emits:["click"],setup:(e,l)=>({handleClick:(e,a)=>{l.emit("click",e,a)}})};f.render=function(e,l,a,i,c,y){return n(),t("ul",{class:"vue-dropdown",onMousedown:l[1]||(l[1]=d(()=>{},["prevent"]))},[(n(!0),t(s,null,r(a.modelValue,l=>(n(),t("li",{key:l.key,onClick:e=>i.handleClick(e,l),class:["vue-dropdown-item",{selected:l.selected}]},[o(e.$slots,"default",{option:l},()=>[u("span",null,p(l.label),1)])],10,["onClick"]))),128))],32)},f.__file="src/components/dropdown.vue";const B=(e,l,{valueBy:a})=>a(e)===a(l),w=(e,l,{valueBy:a})=>void 0!==e.find(e=>B(e,l,{valueBy:a})),M=(e,l,{valueBy:a})=>e.find(e=>a(e)===l),k=(e,l,{max:a,valueBy:n})=>w(e,l,{valueBy:n})||e.length+1>a?e:e.concat(l),V=(e,l,{min:a,valueBy:n})=>!1===w(e,l,{valueBy:n})||e.length-1<a?e:e.filter(e=>!1===B(e,l,{valueBy:n}));var x=e("default",{name:"vue-select",inheritAttrs:!1,props:{modelValue:{required:!0},options:{required:!0,type:Array},visibleOptions:{type:Array},allowEmpty:{default:!1,type:Boolean},multiple:{default:!1,type:Boolean},min:{default:0,type:Number},max:{default:1/0,type:Number},closeOnSelect:{default:!1,type:Boolean},trackBy:{type:[String,Function]},hideSelected:{default:!1,type:Boolean},labelBy:{type:[String,Function]},valueBy:{type:[String,Function]},disabled:{default:!1,type:Boolean},loading:{default:!1,type:Boolean},placeholder:{default:"Select option",type:String},searchPlaceholder:{default:"Type to search",type:String},searchable:{default:!1,type:Boolean},taggable:{default:!1,type:Boolean},collapseTags:{default:!1,type:Boolean},tabindex:{default:0,type:Number}},emits:["update:modelValue","select","remove","open","close","search-input","search-change","focus","blur"],setup(e,a){const{trackBy:n,labelBy:t,valueBy:o,min:u,max:i}=(e=>({trackBy:"function"==typeof e.trackBy?e.trackBy:"string"==typeof e.trackBy?l=>e.trackBy.split(".").reduce((e,l)=>e[l],l):e=>e,labelBy:"function"==typeof e.labelBy?e.labelBy:"string"==typeof e.labelBy?l=>e.labelBy.split(".").reduce((e,l)=>e[l],l):e=>e,valueBy:"function"==typeof e.valueBy?e.valueBy:"string"==typeof e.valueBy?l=>e.valueBy.split(".").reduce((e,l)=>e[l],l):e=>e,min:e.multiple?e.min:e.allowEmpty?0:1,max:e.multiple?e.max:1}))(e),d=l(null),s=l(!1);c(()=>s.value,()=>{s.value?a.emit("open"):a.emit("close")});const r=()=>{e.disabled||(s.value=!0)},p=e=>{s.value=!1},v=l(""),m=l([]);if(e.multiple)e.modelValue.forEach(l=>{const a=M(e.options,l,{valueBy:o});m.value=k(m.value,a,{max:1/0,valueBy:o})});else if(null!==e.modelValue){const l=M(e.options,e.modelValue,{valueBy:o});m.value=k(m.value,l,{max:1/0,valueBy:o})}const g=(l,n)=>{if(!e.disabled){if(n=n.originalOption,w(m.value,n,{valueBy:o}))m.value=V(m.value,n,{min:u,valueBy:o}),a.emit("remove",n);else{if(!e.multiple){const e=m.value[0];m.value=V(m.value,m.value[0],{min:0,valueBy:o}),a.emit("remove",e)}m.value=k(m.value,n,{max:i,valueBy:o}),a.emit("select",n)}!0===e.closeOnSelect&&(s.value=!1)}};c(()=>m,()=>{const l=m.value.map(e=>o(e));e.multiple?a.emit("update:modelValue",l):l.length?a.emit("update:modelValue",l[0]):a.emit("update:modelValue",null)},{deep:!0});const h=y(()=>{const l=new Set(m.value.map(e=>o(e)));return(e.visibleOptions||e.options).filter(a=>!e.hideSelected||!1===l.has(o(a))).map(e=>({key:n(e),label:t(e),selected:l.has(o(e)),originalOption:e}))}),b=y(()=>{const l=new Set(m.value.map(e=>o(e)));return e.options.map(e=>({key:n(e),label:t(e),selected:l.has(o(e)),originalOption:e}))});return c(()=>e.options,()=>{const l=new Set(m.value.map(e=>e.value));m.value=e.options.filter(e=>l.has(o(e)))},{deep:!0}),{isFocusing:s,wrapper:d,focus:r,blur:p,toggle:e=>{s.value=!s.value},searchingInputValue:v,handleInputForInput:e=>{a.emit("search-input",e)},handleChangeForInput:e=>{a.emit("search-change",e)},handleFocusForInput:e=>{r(),a.emit("focus",e)},handleBlurForInput:e=>{p(),a.emit("blur",e)},handleClickForDropdown:(e,l)=>g(0,l),handleClickForTag:(e,l)=>g(0,l),dropdownSelectedOptions:h,tagSelectedOptions:b,addOrRemoveOption:g}},components:{VInput:h,VTag:I,VDropdown:f}});const D={class:"vue-select-header"},N={key:0,class:"vue-input"},C={key:1,class:"icon loading"},O=u("div",null,null,-1),S=u("div",null,null,-1),F=u("div",null,null,-1),T={key:0,class:"icon loading"},L=u("div",null,null,-1),A=u("div",null,null,-1),z=u("div",null,null,-1);x.render=function(e,l,a,i,r,c){const y=v("v-tag"),h=v("v-input"),b=v("v-dropdown");return n(),t("div",{ref:"wrapper",class:["vue-select",{disabled:a.disabled}],tabindex:a.searchable?-1:a.tabindex,onFocus:l[8]||(l[8]=(...e)=>i.focus(...e)),onBlur:l[9]||(l[9]=()=>!a.searchable&&i.blur())},[u("div",D,[a.multiple&&a.taggable&&0===a.modelValue.length||!1===a.searchable&&!1===a.taggable?(n(),t("div",N,[u("input",{placeholder:a.placeholder,disabled:""},null,8,["placeholder"])])):m("v-if",!0),a.multiple&&a.taggable?(n(),t(s,{key:1},[u(y,{modelValue:i.tagSelectedOptions,class:["vue-select-tag",{collapsed:a.collapseTags}]},{default:g(({option:l})=>[o(e.$slots,"tag",{option:l.originalOption},()=>[u("span",null,p(l.label),1),u("img",{src:"data:image/svg+xml;base64,PHN2ZyBpZD0iZGVsZXRlIiBkYXRhLW5hbWU9ImRlbGV0ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHRpdGxlPmRlbGV0ZTwvdGl0bGU+PHBhdGggZD0iTTI1NiwyNEMzODMuOSwyNCw0ODgsMTI4LjEsNDg4LDI1NlMzODMuOSw0ODgsMjU2LDQ4OCwyNC4wNiwzODMuOSwyNC4wNiwyNTYsMTI4LjEsMjQsMjU2LDI0Wk0wLDI1NkMwLDM5Ny4xNiwxMTQuODQsNTEyLDI1Niw1MTJTNTEyLDM5Ny4xNiw1MTIsMjU2LDM5Ny4xNiwwLDI1NiwwLDAsMTE0Ljg0LDAsMjU2WiIgZmlsbD0iIzViNWI1ZiIvPjxwb2x5Z29uIHBvaW50cz0iMzgyIDE3Mi43MiAzMzkuMjkgMTMwLjAxIDI1NiAyMTMuMjkgMTcyLjcyIDEzMC4wMSAxMzAuMDEgMTcyLjcyIDIxMy4yOSAyNTYgMTMwLjAxIDMzOS4yOCAxNzIuNzIgMzgyIDI1NiAyOTguNzEgMzM5LjI5IDM4MS45OSAzODIgMzM5LjI4IDI5OC43MSAyNTYgMzgyIDE3Mi43MiIgZmlsbD0iIzViNWI1ZiIvPjwvc3ZnPg==",alt:"delete tag",class:"icon delete",onClick:()=>i.addOrRemoveOption(e.$event,l)},null,8,["onClick"])])]),_:1},8,["modelValue","class"]),u("span",{class:["icon arrow-downward",{active:i.isFocusing}],onClick:l[1]||(l[1]=(...e)=>i.toggle(...e)),onMousedown:l[2]||(l[2]=d(()=>{},["prevent","stop"]))},null,34)],64)):(n(),t(s,{key:2},[a.searchable?(n(),t(h,{key:0,modelValue:i.searchingInputValue,"onUpdate:modelValue":l[3]||(l[3]=e=>i.searchingInputValue=e),disabled:a.disabled,placeholder:a.searchPlaceholder,onInput:i.handleInputForInput,onChange:i.handleChangeForInput,onFocus:i.handleFocusForInput,onBlur:i.handleBlurForInput,onEscape:i.blur,tabindex:a.tabindex,class:"vue-select-input"},null,8,["modelValue","disabled","placeholder","onInput","onChange","onFocus","onBlur","onEscape","tabindex"])):m("v-if",!0),a.loading?(n(),t("span",C,[O,S,F])):(n(),t("span",{key:2,class:["icon arrow-downward",{active:i.isFocusing}],onClick:l[4]||(l[4]=(...e)=>i.toggle(...e)),onMousedown:l[5]||(l[5]=d(()=>{},["prevent","stop"]))},null,34))],64))]),i.isFocusing?(n(),t(s,{key:0},[a.multiple&&a.taggable&&a.searchable?(n(),t(h,{key:0,modelValue:i.searchingInputValue,"onUpdate:modelValue":l[6]||(l[6]=e=>i.searchingInputValue=e),disabled:a.disabled,placeholder:a.searchPlaceholder,onInput:i.handleInputForInput,onChange:i.handleChangeForInput,onFocus:i.handleFocusForInput,onBlur:i.handleBlurForInput,onEscape:i.blur,tabindex:a.tabindex,class:"vue-select-input"},{append:g(()=>[a.loading?(n(),t("span",T,[L,A,z])):m("v-if",!0)]),_:1},8,["modelValue","disabled","placeholder","onInput","onChange","onFocus","onBlur","onEscape","tabindex"])):m("v-if",!0),u(b,{modelValue:i.dropdownSelectedOptions,"onUpdate:modelValue":l[7]||(l[7]=e=>i.dropdownSelectedOptions=e),onClick:i.handleClickForDropdown,class:"vue-select-dropdown"},{default:g(({option:l})=>[o(e.$slots,"dropdown-item",{option:l.originalOption},()=>[u("span",null,p(l.label),1)])]),_:1},8,["modelValue","onClick"])],64)):m("v-if",!0)],42,["tabindex"])},x.__file="src/index.vue"}}}));
