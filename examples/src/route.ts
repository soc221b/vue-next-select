import { createRouter, createWebHistory, RouteRecordRaw, RouterOptions } from 'vue-router'

const viewNames = [
  'basic-usage',
  'creatable',
  'select-all',
  'limiting-selections',
  'group',
  'remote-searching',
  'custom-dropdown',
  'custom-tag',
  'custom-empty-model-value',
  'vuex',
  'vuelidate',
  'playground',
]

export const routes: RouterOptions['routes'] = viewNames.map(viewName => ({
  path: `/${viewName}`,
  component: () =>
    import(
      `./views/${viewName
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')}.vue`
    ),
}))
routes.unshift({
  path: '/',
  redirect: '/basic-usage',
})

export default createRouter({
  history: createWebHistory('vue-next-select'),
  routes,
})
