<template>
  <label :class="labelClass">{{ label }}</label>
  <input
    :class="inputClass"
    v-bind="$attrs"
    :placeholder="label"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    :required="required"
  />
  <div v-if="required" class="invalid-feedback">
    {{ errorMsg }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BaseInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
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
    errorMsg: {
      type: String,
      default: "",
    },
  },
});
</script>
