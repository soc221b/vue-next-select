{
  const jsCode = `
import { createApp } from 'vue'
import VueSelect from 'vue-next-select'

export default createApp({
  name: 'app',
  components: {
    VueSelect
  },
  setup() {
    const options = ['Scroll to top', 'Alert', 'Console']

    const handleSelected = selectedOption => {
      switch (selectedOption) {
        case 'Scroll to top':
          scrollTo(0, 0)
          break
        case 'Alert':
          alert('You just dispatched "alert" option.')
          break
        case 'Console':
          console.log('You just dispatched "Console" option.')
          break
      }
    }

    return {
      options,
      handleSelected,
    }
  }
})
`.trim()

  const htmlCode = `
<vue-select
  :options="options"
  @selected="handleSelected"
></vue-select>
`.trim()

  const { createApp } = Vue

  const singleSelect = createApp({
    name: 'app',
    setup() {
      const options = ['Scroll to top', 'Alert', 'Console']

      const handleSelected = selectedOption => {
        switch (selectedOption) {
          case 'Scroll to top':
            scrollTo(0, 0)
            break
          case 'Alert':
            alert('You just dispatched "alert" option.')
            break
          case 'Console':
            console.log('You just dispatched "Console" option.')
            break
        }
      }

      return {
        options,
        handleSelected,

        jsCode,
        htmlCode,
      }
    },
    template: `
      <vue-select
        :options="options"
        @selected="handleSelected"
      ></vue-select>

      <p><i>Code sample:</i></p>
      <pre><code class="html">{{ htmlCode }}</code></pre>
      <pre><code class="javascript">{{ jsCode }}</code></pre>
    `,
  })

  singleSelect.component('vue-select', VueNextSelect)
  singleSelect.mount(document.querySelector('#action-dispatcher'))
}
