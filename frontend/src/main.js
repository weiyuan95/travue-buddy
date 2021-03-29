import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import router from './routes.js';
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY, // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
  language: 'English', // Optional
});

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_API_KEY,
    libraries: 'places',
  },
  installComponents: true
})

Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
