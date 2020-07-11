// src/plugins/vuetify.js

import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: "#03a9f4",
        secondary: "#009688",
        accent: "#9c27b0",
        error: "#f44336",
        warning: "#ff5722",
        info: "#607d8b",
        success: "#4caf50"
      }
    }
  }
};

export default new Vuetify(opts);
