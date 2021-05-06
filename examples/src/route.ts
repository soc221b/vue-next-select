import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  { path: '/basic-usage', component: () => import('./views/BasicUsage.vue') },
  { path: '/creatable', component: () => import('./views/Creatable.vue') },
  { path: '/select-all', component: () => import('./views/SelectAll.vue') },
  { path: '/limiting-selections', component: () => import('./views/LimitingSelections.vue') },
  { path: '/group', component: () => import('./views/Group.vue') },
  { path: '/remote-searching', component: () => import('./views/RemoteSearching.vue') },
  { path: '/custom-dropdown', component: () => import('./views/CustomDropdown.vue') },
  { path: '/custom-tag', component: () => import('./views/CustomTag.vue') },
]

export default createRouter({
  history: createWebHistory('vue-next-select'),
  routes,
})
