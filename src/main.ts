import { createApp } from "vue";
import App from "./App.vue";
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import { upperFirst, camelCase } from "lodash";
import axios from "axios";
import VueAxios from "vue-axios";
const app = createApp(App);
app.use(VueAxios, axios);

const requireComponent = require.context(
  "./components",
  false,
  /Base[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1"))
  );

  app.component(componentName, componentConfig.default || componentConfig);
});

app.use(BootstrapVue3);
app.mount("#app");
