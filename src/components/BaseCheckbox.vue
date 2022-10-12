<template>
  <input
    type="checkbox"
    :checked="modelValue"
    @change="
      $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
    "
    :id="inputID"
    :class="inputClass"
    :required="required"
  />
  <label :class="labelClass" :for="labelID">{{ label }}</label>
  <div v-if="required" class="invalid-feedback">
    {{ errorMsg }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BaseCheckbox",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
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
    errorMsg: {
      type: String,
      default: "",
    },
  },
});
</script>
