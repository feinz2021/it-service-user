import { createApp } from 'vue'
import App from './App.vue'
import '@materializecss/materialize/dist/css/materialize.min.css'
import '@materializecss/materialize/dist/js/materialize.min.js'
import store from "./store/index"
import 'vue-toast-notification/dist/theme-sugar.css'
import VueToast from 'vue-toast-notification'
import router from "./router.js";
import 'material-icons/iconfont/material-icons.css';

// createApp(App).mount('#app')

const app = createApp(App);
// app.use(router);
app.use(store);
app.use(VueToast);
app.use(router);
app.mount("#app");