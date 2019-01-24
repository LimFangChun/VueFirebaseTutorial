import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Meetups from './components/Meetups/Meetups.vue';
import CreateMeetups from './components/Meetups/CreateMeetup.vue';
import ViewMeetUp from './components/Meetups/ViewMeetup.vue';
import Profile from './components/User/Profile.vue';
import SignIn from './components/User/SignIn.vue';
import SignUp from './components/User/SignUp.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path:'/meetup',
      name: 'Meetups',
      component: Meetups
    },
    {
      path:'/viewmeetup/:id',
      name: 'ViewMeetup',
      component: ViewMeetUp,
      props: true
    },
    {
      path:'/createmeetup',
      name: 'CreateMeetups',
      component: CreateMeetups
    },
    {
      path:'/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path:'/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path:'/signin',
      name: 'SignIn',
      component: SignIn
    }
  ],
});
