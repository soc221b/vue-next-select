<template>
  <pre>modelValue: {{ JSON.stringify(used) }}</pre>

  <vue-select v-model="used" :options="apis" multiple group-by="isConstructor" label-by="label" value-by="value">
    <template #dropdown-item="{ option }">
      <template v-if="option.isConstructor">
        <div>{{ option.label }}</div>
      </template>
      <template v-else>
        <div style="padding-left: 12px">{{ option.label }}</div>
      </template>
    </template>
  </vue-select>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const used = ref(['forEach', 'flat', 'all', 'any'])

    const apis = ref(
      [
        {
          name: 'Array',
          methods: [{ name: 'includes' }, { name: 'forEach' }, { name: 'flat' }],
        },
        {
          name: 'String',
          methods: [{ name: 'padStart' }, { name: 'padEnd' }, { name: 'matchAll' }],
        },
        {
          name: 'Promise',
          methods: [{ name: 'all' }, { name: 'any' }, { name: 'race' }, { name: 'allSettled' }],
        },
      ].reduce((flat, constructor) => {
        return flat
          .concat({
            label: constructor.name,
            value: constructor.methods.map(method => method.name),
            isConstructor: true,
          })
          .concat(constructor.methods.map(method => ({ label: method.name, value: method.name })))
      }, []),
    )

    return {
      used,
      apis,
    }
  },
})
</script>
