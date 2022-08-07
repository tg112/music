import { required } from "@vee-validate/rules";
import { Field as VeeField, Form as VeeForm, defineRule } from "vee-validate";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);

    defineRule("required", required);
  },
};
