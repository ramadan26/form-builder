<template>
  <div class="container">
    <div class="row">
      <div class="col-5">
        <h1>Create an event</h1>
        <form class="row g-3 needs-validation" novalidate>
          <div v-for="field in formInfo.fields" :key="field.id">
            <component
              :is="field.component"
              :labelClass="field.labelClass"
              :inputClass="field.inputClass"
              :label="field.label"
              :options="field.options"
              :required="field.required"
              :type="field.type"
              :inputID="field.inputID"
              :labelID="field.labelID"
              v-model="event[`${field.name}`]"
              @update:modelValue="getValue(this)"
              :name="field.name"
              :placeholder="field.placeholder"
              :vertical="field.vertical"
              :errorMsg="field.errorMsg"
            >
            </component>
          </div>
          <button class="btn btn-primary" type="submit" @click="validate">
            Submit form
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import BaseInput from "@/components/Baseinput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import { defineComponent } from "vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseRadioGroup from "@/components/BaseRadioGroup.vue";
import formData from "@/common/data/fields.json";
export default defineComponent({
  components: {
    BaseInput,
    BaseSelect,
    BaseCheckbox,
    BaseRadioGroup,
  },
  name: "SimpleForm",
  methods: {
    getValue(val: any) {
      console.log(val);
    },
    validate() {
      let forms = document.querySelectorAll(".needs-validation");
      let events = this.event;
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        console.log(form.checkValidity());
        form.addEventListener(
          "submit",
          function (e: any) {
            e.preventDefault();
            if (!form.checkValidity()) {
              e.stopPropagation();
            } else {
              console.log(events);
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    sendForm() {
      // uncomment the next lines if you already have a endpoint/api
      // this.axios.get(api).then((response) => {
      //   console.log(response.data)
      // })
    },
  },
  data: () => {
    let obj: { [k: string]: any } = {};
    return {
      formInfo: formData,
      categories: [
        "sustainability",
        "nature",
        "animal welfare",
        "housing",
        "education",
        "food",
        "community",
      ],
      event: obj,
    };
  },
});
</script>
