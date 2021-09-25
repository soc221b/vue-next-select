<template>
  <fieldset>
    <div>
      <div><b>Props:</b></div>

      <div>
        <label for="disabled">Disabled:</label>
        <input id="disabled" v-model="disabled" type="checkbox" />
      </div>

      <div>
        <label for="loading">Loading:</label>
        <input id="loading" v-model="loading" type="checkbox" />
      </div>

      <div>
        <label for="min">Min:</label>
        <input id="min" v-model="min" type="number" />
      </div>

      <div>
        <label for="multiple">Multiple:</label>
        <input id="multiple" v-model="multiple" type="checkbox" />
      </div>

      <div>
        <label for="max">Max:</label>
        <input :disabled="multiple === false" id="max" v-model="max" type="number" />
      </div>

      <div>
        <label for="taggable">Taggable:</label>
        <input :disabled="multiple === false" id="taggable" v-model="taggable" type="checkbox" />
      </div>

      <div>
        <label for="collapseTags">Collapse tags:</label>
        <input :disabled="taggable === false" id="collapseTags" v-model="collapseTags" type="checkbox" />
      </div>

      <div>
        <label for="placeholder">Placeholder:</label>
        <input id="placeholder" v-model="placeholder" />
      </div>

      <div>
        <label for="hideSelected">Hide selected:</label>
        <input id="hideSelected" v-model="hideSelected" type="checkbox" />
      </div>

      <div>
        <label for="closeOnChange">Close on change:</label>
        <input id="closeOnChange" v-model="closeOnChange" type="checkbox" />
      </div>

      <div>
        <label for="labelBy">Label by:</label>
        <input id="labelBy" v-model.lazy="labelBy" />
      </div>

      <div>
        <label for="valueBy">Value by:</label>
        <input id="valueBy" v-model.lazy="valueBy" />
      </div>

      <div>
        <label for="disabledBy">Disabled by:</label>
        <input id="disabledBy" v-model.lazy="disabledBy" />
      </div>

      <div>
        <label for="searchable">Searchable:</label>
        <input id="searchable" v-model="searchable" type="checkbox" />
      </div>

      <div>
        <label for="searchPlaceholder">Search placeholder:</label>
        <input id="searchPlaceholder" v-model="searchPlaceholder" />
      </div>

      <div>
        <label for="clearOnClose">Clear on close:</label>
        <input :disabled="searchable === false" id="clearOnClose" v-model="clearOnClose" type="checkbox" />
      </div>

      <div>
        <label for="clearOnSelect">Clear on select:</label>
        <input :disabled="searchable === false" id="clearOnSelect" v-model="clearOnSelect" type="checkbox" />
      </div>
    </div>

    <div>
      <div><b>Events:</b></div>

      <label for="autoClearEvents">Clear event after 5s:</label>
      <input id="autoClearEvents" v-model="autoClearEvents" type="checkbox" />

      <pre>
        <template v-for="ev of events.slice(-10)" :key="ev.timestamp">
<code>{{ ev.name }} - {{ ev.payload }}</code>
        </template>
      </pre>
    </div>
  </fieldset>

  <br />

  <fieldset>
    <legend>Select:</legend>

    <div>
      <vue-select
        v-model="model"
        :options="options"
        :empty-model-value="emptyModelValue"
        :disabled="disabled"
        :loading="loading"
        :min="min"
        :multiple="multiple"
        :max="max"
        :taggable="taggable"
        :collapse-tags="collapseTags"
        :placeholder="placeholder"
        :hide-selected="hideSelected"
        :close-on-change="closeOnChange"
        :label-by="labelBy"
        :value-by="valueBy"
        :disabled-by="disabledBy"
        :searchable="searchable"
        :search-placeholder="searchPlaceholder"
        :clear-on-close="clearOnClose"
        :clear-on-select="clearOnSelect"
        @update:modelValue="payload => handleEvent('update:modelValue', payload)"
        @selected="payload => handleEvent('selected', payload)"
        @removed="payload => handleEvent('removed', payload)"
        @focus="payload => handleEvent('focus', payload)"
        @blur="payload => handleEvent('blur', payload)"
        @toggle="payload => handleEvent('toggle', payload)"
        @search:input="payload => handleEvent('search:input', payload)"
        @search:change="payload => handleEvent('search:change', payload)"
        @search:focus="payload => handleEvent('search:focus', payload)"
        @search:blur="payload => handleEvent('search:blur', payload)"
      />
    </div>

    <div>
      <pre>Model value: {{ model === undefined ? '`undefined`' : JSON.stringify(model, null, 2) }}</pre>

      <pre>Options: {{ JSON.stringify(options, null, 2) }}</pre>
    </div>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import VueSelect from 'vue-next-select'

export default defineComponent({
  components: { VueSelect },
  setup() {
    const model = ref<undefined | string | string[]>(undefined)

    const options = [
      { language: 'JavaScript', framework: ['Express', 'Koa'], disabled: Math.random() > 0.8 },
      { language: 'Python', framework: ['Django', 'Flask'], disabled: Math.random() > 0.8 },
      { language: 'Others', framework: ['Laravel', 'Rails'], disabled: Math.random() > 0.8 },
    ]

    // TODO: options
    // TODO: visible-options

    const emptyModelValue = ref(undefined)

    const disabled = ref(false)

    const loading = ref(false)

    const placeholder = ref<undefined | string>('placeholder')
    watchEffect(() => {
      if (placeholder.value === '') {
        placeholder.value = undefined
      }
    })

    const hideSelected = ref(false)
    const closeOnChange = ref(false)

    const labelBy = ref<undefined | string>('language')
    watchEffect(() => {
      if (labelBy.value === undefined) return
      if (labelBy.value === '') {
        labelBy.value = undefined
        return
      }
      if (
        options.every(option => typeof option === 'object' && option !== null) &&
        options.some(option => option[labelBy.value as keyof typeof option] === undefined)
      ) {
        labelBy.value = undefined
      }
    })

    const valueBy = ref<undefined | string>('framework')
    watchEffect(() => {
      if (valueBy.value === undefined) return
      if (valueBy.value === '') {
        valueBy.value = undefined
        return
      }
      if (
        options.every(option => typeof option === 'object' && option !== null) &&
        options.some(option => option[valueBy.value as keyof typeof option] === undefined)
      ) {
        valueBy.value = undefined
      }
    })

    const disabledBy = ref<undefined | string>('disabled')
    watchEffect(() => {
      if (disabledBy.value === undefined) return
      if (disabledBy.value === '') {
        disabledBy.value = undefined
        return
      }
      if (
        options.every(option => typeof option === 'object' && option !== null) &&
        options.some(option => option[disabledBy.value as keyof typeof option] === undefined)
      ) {
        disabledBy.value = undefined
      }
    })

    const searchable = ref(false)

    const searchPlaceholder = ref<undefined | string>('Search placeholder')
    watchEffect(() => {
      if (searchPlaceholder.value === '') {
        searchPlaceholder.value = undefined
      }
    })

    const clearOnClose = ref(false)
    watchEffect(() => {
      clearOnClose.value = searchable.value ? clearOnClose.value : false
    })

    const clearOnSelect = ref(false)
    watchEffect(() => {
      clearOnSelect.value = searchable.value ? clearOnSelect.value : false
    })

    const min = ref<number>(0)
    watchEffect(() => {
      min.value = parseInt(min.value + '', 10)
    })

    const multiple = ref(false)

    const max = ref<number>(9999)
    watchEffect(() => {
      max.value = parseInt(max.value + '', 10)
    })

    const taggable = ref(false)
    watchEffect(() => {
      taggable.value = multiple.value ? taggable.value : false
    })

    const collapseTags = ref(false)
    watchEffect(() => {
      collapseTags.value = taggable.value ? collapseTags.value : false
    })

    watch(
      () => [multiple.value, labelBy.value, valueBy.value],
      () => {
        model.value = multiple.value ? [] : emptyModelValue.value
      },
    )

    const events = ref<{ name: string; payload: unknown; timestamp: number }[]>([])
    let waitingEvent = 0
    const handleEvent = async (name: string, payload: unknown) => {
      ++waitingEvent
      await new Promise(resolve => setTimeout(resolve, Math.random() * 16 + 16 * waitingEvent))
      --waitingEvent
      events.value.push({
        name,
        payload: payload,
        timestamp: Date.now(),
      })
    }
    const autoClearEvents = ref(true)
    const timer = setInterval(() => {
      if (autoClearEvents.value === false) return
      events.value = events.value.filter(({ timestamp }) => timestamp + 5 * 1000 >= Date.now())
    }, 100)
    onBeforeUnmount(() => {
      clearInterval(timer)
    })

    return {
      model,
      options,

      emptyModelValue,
      disabled,
      loading,
      labelBy,
      valueBy,
      disabledBy,
      placeholder,
      hideSelected,
      closeOnChange,
      min,

      multiple,
      max,
      taggable,
      collapseTags,

      searchable,
      searchPlaceholder,
      clearOnClose,
      clearOnSelect,

      events,
      autoClearEvents,
      handleEvent,
    }
  },
})
</script>

<style scoped>
label {
  margin-right: 4px;
}

fieldset > div > div > input {
  margin: 0;
}

fieldset > div > div > label {
  display: inline-block;
  min-width: 140px;
  text-align: end;
}

fieldset > div,
fieldset > div > div {
  min-height: 28px;
  vertical-align: middle;
}

fieldset > div {
  display: inline-block;
  vertical-align: top;
  margin-right: 8px;
  max-width: 50%;
}

pre,
code {
  white-space: break-spaces;
  max-width: 100%;
  margin-top: 0;
}

pre {
  overflow: auto;
  height: 500px;
}
</style>
