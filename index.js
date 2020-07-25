const { reactive, ref, watch, createApp } = Vue

createApp({
  name: 'app',
  setup() {
    const selectedOptions = ref(1)
    const options = reactive([1, 2, 3, 4, 5])
    const loading = ref(false)

    handleSearchInput = event => {
      console.log('consumer input', event)
    }
    handleSearchChange = event => {
      console.log('consumer change', event)
    }
    handleFocus = event => {
      console.log('consumer focus', event)
    }
    handleBlur = event => {
      console.log('consumer blur', event)
    }
    handleSelect = event => {
      console.log('consumer select', event)
    }
    handleRemove = event => {
      console.log('consumer remove', event)
    }
    handleOpen = event => {
      console.log('consumer open', event)
    }
    handleClose = event => {
      console.log('consumer close', event)
    }

    return {
      selectedOptions,
      options,
      loading,
      handleSearchInput,
      handleSearchChange,
      handleFocus,
      handleBlur,
      handleSelect,
      handleRemove,
      handleOpen,
      handleClose,
    }
  },
  components: {
    VueSelect,
  },
  template: `
    <div>{{ selectedOptions }}</div>
    <div>{{ options }}</div>
    <vue-select
      v-model="selectedOptions"
      :options="options"
      :loading="loading"
      canBeEmpty
      @search-input="handleSearchInput"
      @search-change="handleSearchChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @select="handleSelect"
      @remove="handleRemove"
      @open="handleOpen"
      @close="handleClose"
    ></vue-select>
  `,
}).mount(document.querySelector('#app'))
