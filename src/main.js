import { createApp } from 'vue'
import App from './App.vue'
import '@materializecss/materialize/dist/css/materialize.min.css'
import '@materializecss/materialize/dist/js/materialize.min.js'
import store from "./store/index"
import 'vue-toast-notification/dist/theme-sugar.css'
import VueToast from 'vue-toast-notification'
import router from "./router.js";
import 'material-icons/iconfont/material-icons.css';
import SimpleTypeahead from 'vue3-simple-typeahead';
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'; //Optional default CSS
// vue print
import print from 'vue3-print-nb'

const app = createApp(App);
app.use(print);
app.use(SimpleTypeahead);
app.use(store);
app.use(VueToast);
app.use(router);
app.mount("#app");