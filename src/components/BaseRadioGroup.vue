<template>
  <component
    v-for="option in options"
    :key="option.value"
    :is="vertical ? 'div' : 'span'"
  >
    <BaseRadio
      :label="option.label"
      :value="option.value"
      :inputID="inputID + option.label"
      :labelID="labelID + option.label"
      :inputClass="inputClass"
      :labelClass="labelClass"
      :name="name"
      :modelValue="modelValue"
      :required="required"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </component>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import BaseRadio from "./BaseRadio.vue";
export default defineComponent({
  name: "BaseRadioGroup",
  props: {
    options: {
      type: Array as PropType<Array<object>>,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
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
    vertical: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  components: { BaseRadio },
});
</script>
