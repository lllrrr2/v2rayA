import "@/plugins/buefy";
import "@/plugins/axios";
import i18n from "@/plugins/i18n";
import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "normalize.css";
import "@/registerServiceWorker";
import "@/assets/pace-progressbar";
import "@/assets/pace-progressbar/themes/blue/pace-theme-corner-indicator.css";

Vue.config.productionTip = false;

let vue = null;

Vue.prototype.$remount = () => {
  function f(node) {
    if (!node) {
      return;
    }
    if (typeof node.close == "function") {
      node.close();
      return;
    }
    if (!("$children" in node)) {
      return;
    }
    for (let i in node.$children) {
      f(node.$children[i]);
    }
  }
  f(vue);
  vue = new Vue({
    i18n,
    store,
    render: h => h(App)
  }).$mount("#app");
};

Vue.prototype.$remount();
