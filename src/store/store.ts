import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/models/User';
import axios from 'axios';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {
                imageUrl: "",
                id: "",
                title: "",
                date: new Date(),
                location: "",
                description: ""
            }
        ],
        user: null,
        loading: false,
        authError: null
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getLoadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return new Date(meetupA.date).getTime() - new Date(meetupB.date).getTime()
            });
        },
        getLoadedMeetup(state): any {
            return (meetupId: string) => { return state.loadedMeetups.find(meetup => meetupId === meetup.id) }
        },
        getFeaturedMeetups(state, getters) {
            return getters.getLoadedMeetups.slice(0, 5);
        },
        getLoading(state) {
            return state.loading;
        },
        getError(state) {
            return state.authError;
        }
    },
    mutations: {
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser(state, newUser) {
            state.user = newUser;
        },
        setLoading(state, payload) {
            state.loading = payload;
        },
        setError(state, payload) {
            state.authError = payload;
        },
        clearError(state) {
            state.authError = null;
        },
        setLoadedMeetups(state, payload){
            state.loadedMeetups = payload;
        }
    },
    actions: {
        initializeMeetup({ commit }) {
            commit('setLoading', true);
            //get meetups data from firebase
            firebase.database().ref('meetups').once('value')
                .then(data => {
                    const meetup = [];
                    const obj = data.val();
                    for (let key in obj) {
                        meetup.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date
                        })
                    }
                    commit('setLoadedMeetups', meetup);
                    commit('setLoading', false);
                })
                .catch(error => {
                    commit('setError', error);
                    commit('setLoading', false);
                    console.log(error);
                })
        },
        createMeetup({ commit }, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date.toISOString()
            }

            //store to firebase
            firebase.database().ref('meetups').push(meetup)
                .then(data => {
                    console.log(data);
                    commit('createMeetup', {
                        ...meetup,
                        id: data.key && data.key || ''
                    });
                })
                .catch(error => {
                    console.log(error);
                })
        },
        userSignUp({ commit }, payload) {
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    response => {
                        commit('setLoading', false);
                        const newUser = {
                            id: response.user && response.user.uid || '',
                            registeredMeetup: []
                        }
                        commit('setUser', newUser);
                    }
                ).catch(error => {
                    commit('setLoading', false);
                    commit('setError', error);
                    console.log(error);
                })
        },
        userSignIn({ commit }, payload) {
            commit('clearError');
            commit('setLoading', true);
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    response => {
                        commit('setLoading', false);
                        const newUser = {
                            id: response.user && response.user.uid || '',
                            registeredMeetup: []
                        }
                        commit('setUser', newUser);
                    }
                ).catch(error => {
                    commit('setLoading', false);
                    commit('setError', error);
                    console.log(error);
                })
        },
        clearError({ commit }) {
            commit('clearError');
        }
    }
});