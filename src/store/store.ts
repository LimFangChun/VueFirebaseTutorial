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
                imageUrl:
                    "http://scandinavianlibrary.org/wp-content/uploads/2017/11/IMG_0735-1-e1511040507716.jpg",
                id: "123",
                title: "Meetup at library",
                date: new Date(),
                location: "Library",
                description: "lorem"
            },
            {
                imageUrl:
                    "http://scandinavianlibrary.org/wp-content/uploads/2017/11/IMG_0735-1-e1511040507716.jpg",
                id: "121",
                title: "Meetup at a",
                date: new Date(),
                location: "LOCATION",
                description: "lorem ipsum"
            }
        ],
        user: null
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
        }
    },
    mutations: {
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser(state, newUser) {
            state.user = newUser;
        }
    },
    actions: {
        createMeetup({ commit }, payload) {
            const meetup = {
                id: '333',
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date
            }

            //store to firebase

            commit('createMeetup', meetup);
        },
        userSignUp({ commit }, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    response => {
                        const newUser = {
                            id: response.user && response.user.uid || '',
                            registeredMeetup: []
                        }
                        commit('setUser', newUser);
                    }
                ).catch(error => {
                    console.log(error);
                })
        },
        userSignIn({ commit }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    response => {
                        const newUser = {
                            id: response.user && response.user.uid || '',
                            registeredMeetup: []
                        }
                        commit('setUser', newUser);
                    }
                ).catch(error => {
                    console.log(error);
                })
        }
    }
});