import { createApp } from 'vue'
// @ts-ignore-next
import VueSelect from 'vue-next-select'
import App from './App.vue'
import route from './route'
import 'vue-next-select/dist/index.css'
import ApiReferenceLink from './components/api-reference-link.vue'

createApp(App).component('vue-select', VueSelect).component('api', ApiReferenceLink).use(route).mount('#app')
