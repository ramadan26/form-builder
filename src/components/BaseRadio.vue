<template>
  <input
    type="radio"
    :checked="modelValue === value"
    :value="value"
    @change="$emit('update:modelValue', value)"
    v-bind="$attrs"
    :id="inputID"
    :class="inputClass"
  />
  <label :class="labelClass" :for="labelID" v-if="label">
    {{ label }}
  </label>
  <div v-if="required" class="invalid-feedback">
    {{ errorMsg }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BaseRadio",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    value: {
      type: [String, Number],
      required: true,
    },
    inputClass: {
      type: String,
    },
    labelClass: {
      type: String,
    },
    labelID: {
      type: String,
    },
    inputID: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    errorMsg: {
      type: String,
      default: "",
    },
  },
});
</script>
