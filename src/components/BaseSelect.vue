<template>
  <label :class="labelClass">
    {{ label }}
  </label>
  <select
    :class="inputClass"
    :value="modelValue"
    v-bind="{ ...$attrs, onChange: ($event) => { $emit('update:modelValue', identifier ? { value: ($event.target as HTMLSelectElement).value, id: identifier } : ($event.target as HTMLSelectElement).value) } }"
    :required="required"
  >
    <option
      v-for="option in options"
      :value="option"
      :key="option"
      :selected="option === modelValue"
    >
      {{ option }}
    </option>
  </select>
  <div v-if="required" class="invalid-feedback">
    {{ errorMsg }}
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "BaseSelect",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    options: {
      type: Array as PropType<Array<string | number | symbol>>,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: "",
    },
    labelClass: {
      type: String,
      default: "",
    },
    identifier: {
      type: [String, Number],
      default: "",
    },
    errorMsg: {
      type: String,
      default: "",
    },
  },
  data: () => {
    return {};
  },
});
</script>
