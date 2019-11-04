import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import router from './routes.js';

Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
