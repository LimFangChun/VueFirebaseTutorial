import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import DateFilter from './filter/date';
import * as firebase from 'firebase';
import { store } from './store/store';
import AlertComponent from './Shared/Alert.vue';
import EditMeetupDialog from './components/Meetups/Edit/EditMeetupDialog.vue';
import EditMeetupDateDialog from './components/Meetups/Edit/EditMeetupDateDialog.vue';
import EditMeetupTimeDialog from './components/Meetups/Edit/EditMeetupTimeDialog.vue';

Vue.config.productionTip = false;
Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertComponent);
Vue.component('app-edit-meetup-dialog', EditMeetupDialog);
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog);
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog);

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
      storageBucket: "gs://vue-meetup-app-7194a.appspot.com",
      messagingSenderId: "932768839513"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    })

    this.$store.dispatch('initializeMeetup');
  },
}).$mount('#app');
