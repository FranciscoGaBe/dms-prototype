import Vue from "vue";

let alert = null;

Vue.use({
  install: function (Vue) {

    Vue.prototype.$alert = function (message) {
      if (!alert) throw new Error("There is no defined alert component");
      alert.alert(message);
    }

    Vue.prototype.$setAlert = function (alertComponent) {
      alert = alertComponent;
    }

  }
})