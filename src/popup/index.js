import Vue from "vue";

import {
    Button,
    Input,
} from 'element-ui';

Vue.use(Button);
Vue.use(Input);

import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
