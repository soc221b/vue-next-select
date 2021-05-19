import { createRouter, createWebHistory } from 'vue-router'

const viewNames = [
  'Basic usage',
  'Creatable',
  'Select all',
  'Limiting selections',
  'Group',
  'Remote searching',
  'Custom dropdown',
  'Custom tag',
  'Custom empty model value',
  'Vuex',
]

export const routes = viewNames.map(viewName => ({
  path: `/${viewName}`,
  component: () =>
    import(
      `./views/${viewName
        .split(' ')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')}.vue`
    ),
}))

export default createRouter({
  history: createWebHistory('vue-next-select'),
  routes,
})
