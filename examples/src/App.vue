<template>
  <ul>
    <template v-for="route of routes" :key="route.path">
      <li>
        <router-link :to="route.path">
          {{
            route.path
              .slice(1)
              .split('-')
              .map(part => part.charAt(0).toUpperCase() + part.slice(1))
              .join(' ')
          }}
        </router-link>
      </li>
    </template>
  </ul>

  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { routes } from './route'

export default defineComponent({
  name: 'App',

  setup() {
    return { routes }
  },
})
</script>
