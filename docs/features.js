{
  const { ref, createApp } = Vue

  const featureSelect = createApp({
    setup() {
      const model = ref(null)

      const options = ref([])

      setTimeout(() => {
        options.value = [
          {
            label: 'Getting started',
            id: 'getting-started',
          },
        ]
          .concat(
            Array.from(document.querySelectorAll('.vue-select'))
              .map(selectEl => selectEl.parentElement)
              .slice(1)
              .map(selectWrapper => selectWrapper.previousSibling.previousSibling)
              .map(headerEl => ({
                label: headerEl.innerText,
                id: headerEl.id,
              })),
          )
          .concat([
            {
              label: 'Props',
              id: 'props',
            },
            {
              label: 'Events',
              id: 'events',
            },
          ])
      })

      const handleSelected = selectedOption => {
        location.hash = ''
        setTimeout(() => {
          model.value = null
          location.hash = selectedOption.id
        }, 100)
      }

      return {
        model,
        options,
        handleSelected,
      }
    },
    template: `
      <vue-select
        v-model="model"
        :options="options"
        label-by="label"
        placeholder="Jump to"
        @selected="handleSelected"
      ></vue-select>
    `,
  })

  featureSelect.component('vue-select', VueNextSelect)
  featureSelect.mount(document.querySelector('#features'))
}
