import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import DateFilter from './filter/date';
import * as firebase from 'firebase';
import { store } from './store/store';

Vue.config.productionTip = false;
Vue.filter('date', DateFilter);

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBMymSrzY8PavL0KTeZOOan1r3OnwoPC5E",
      authDomain: "vue-meetup-app-7194a.firebaseapp.com",
      databaseURL: "https://vue-meetup-app-7194a.firebaseio.com",
      projectId: "vue-meetup-app-7194a",
      storageBucket: "vue-meetup-app-7194a.appspot.com",
      messagingSenderId: "932768839513"
    });
  },
}).$mount('#app');
