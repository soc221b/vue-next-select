import { createRouter, createWebHistory } from 'vue-router'

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
  'playground',
]

export const routes = viewNames.map(viewName => ({
  path: `/${viewName}`,
  component: () =>
    import(
      `./views/${viewName
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')}.vue`
    ),
}))

export default createRouter({
  history: createWebHistory('vue-next-select'),
  routes,
})
