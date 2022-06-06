import { createApp } from 'vue'
import App from './App.vue'
import '@materializecss/materialize/dist/css/materialize.min.css'
import '@materializecss/materialize/dist/js/materialize.min.js'

// createApp(App).mount('#app')

const app = createApp(App);
// app.use(router);
app.mount("#app");