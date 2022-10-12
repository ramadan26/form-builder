<template>
  <div class="container">
    <!-- <div class="row my-3">
      <FormCreator />
    </div> -->
    <div class="row">
      <SimpleForm />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SimpleForm from "./views/SimpleForm.vue";
// import FormCreator from "./views/FormCreator.vue";

export default defineComponent({
  name: "App",
  components: {
    SimpleForm,
    // FormCreator,
  },
});
</script>

<style></style>
