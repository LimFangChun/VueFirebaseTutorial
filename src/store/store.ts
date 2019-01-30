import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/models/User';
import axios from 'axios';
import * as firebase from 'firebase';
import router from '@/router';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {
                imageUrl: "",
                image: "",
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
        setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload;
        },
        updateMeetup(state, payload){
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id;
            }) || {title:'', description:'', date:''}

            if(payload.title){
                meetup.title = payload.title;
            }

            if(payload.description){
                meetup.description = payload.description;
            }

            if(payload.date){
                meetup.date = payload.date;
            }
        },
        userRegisterMeetup(state, payload){
            const id = payload.id;
            const user:any = state.user;
            if(user === null){
                return;
            }
            if(user.registeredMeetup.findIndex((meetup:any) => {meetup.id === id}) >= 0){
                return;
            }
            user.registeredMeetup.push(id);
            user.fbKey[id] = payload.fbKey;
        },
        userUnregisterMeetup(state, payload){
            const user:any = state.user; 
            if(user === null){
                return;
            }
            const registeredMeetup:Array<any> = user.registeredMeetup;
            registeredMeetup.splice(registeredMeetup.findIndex(meetup => meetup.id === payload), 1);
            Reflect.deleteProperty(user.fbKey, payload);
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
                            location: obj[key].location,
                            date: obj[key].date,
                            creatorId: obj[key].creatorId
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
        createMeetup({ commit, getters }, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                image: "",
                description: payload.description,
                date: payload.date.toISOString(),
                creatorId: getters.getUser.id
            };
            let imageUrl: any;
            let key: any;
            //store to firebase
            firebase.database().ref('meetups').push(meetup)
                .then(data => {
                    key = data.key;
                    return key;
                })
                .then(key => {
                    //firestore
                    const filename = payload.image.name;
                    const ext = filename.slice(filename.lastIndexOf('.'));
                    return firebase.storage().ref(`meetups/${key}.${ext}`).put(payload.image);
                })
                .then(fileData => {
                    let fullPath = fileData.metadata.fullPath;
                    return firebase.storage().ref(fullPath).getDownloadURL();
                })
                .then(fileUrl => {
                    imageUrl = fileUrl;
                    return firebase.database().ref('meetups').child(key).update({ imageUrl: imageUrl });
                })
                .then(() => {
                    commit('createMeetup', {
                        ...meetup,
                        id: key,
                        imageUrl: imageUrl
                    })
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
                            registeredMeetup: [],
                            fbKey: {}
                        }
                        commit('setUser', newUser);
                        router.push('/');
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
                            registeredMeetup: [],
                            fbKey: {}
                        }
                        commit('setUser', newUser);
                        router.push('/');
                    }
                ).catch(error => {
                    commit('setLoading', false);
                    commit('setError', error);
                    console.log(error);
                })
        },
        clearError({ commit }) {
            commit('clearError');
        },
        autoSignIn({ commit }, payload) {
            const user = {
                id: payload.uid,
                registeredMeetup: [],
                fbKey: {}
            };
            commit('setUser', user);
            router.push('/');
        },
        fetchUserData({commit, getters}){
            commit('setLoading', true);
            firebase.database().ref(`/user/${getters.getUser.id}/registration/`).once('value')
            .then((data) => {
                const meetupIds = data.val();
                let registeredMeetup:any = [];
                let swappedPairs:any = {};

                for(let key in meetupIds){
                    registeredMeetup.push(meetupIds[key]);
                    swappedPairs[meetupIds[key]] = key;
                }

                const updatedUser = {
                    id: getters.getUser.id,
                    registeredMeetup: registeredMeetup,
                    fbKey: swappedPairs
                }
                commit('setUser', updatedUser);
            })
            .catch((error) => {
                commit('setLoading', false);
                commit('setError', error);
                console.log(error);
            })
        },
        logout({ commit }) {
            firebase.auth().signOut();
            commit('setUser', null);
            router.push('/signin');
        },
        updateMeetup({ commit }, payload) {
            commit('setLoading', true);
            const updatedMeetup = payload;

            if (payload.title) {
                updatedMeetup.title = payload.title;
            }

            if (payload.description) {
                updatedMeetup.description = payload.description;
            }

            if (payload.date) {
                updatedMeetup.date = payload.date;
            }

            //save to firebase
            firebase.database().ref('meetups').child(payload.id).update(updatedMeetup)
            .then(() => {
                commit('setLoading', false);
                commit('updateMeetup', payload);
            })
            .catch(error => {
                console.log(error);
                commit('setLoading', false);
            });
        },
        registerMeetup({commit, getters}, payload){
            commit('setLoading', true);
            
            //update user meetup registration in firebase
            firebase.database().ref('/users/' + getters.getUser.id).child('/registration/').push(payload)
            .then((data) =>{
                commit('setLoading', false);
                commit('userRegisterMeetup', {id: payload, fbKey: data.key});
            })
            .catch((error) => {
                console.log(error);
                commit('setLoading', false);
            })
        },
        unregisterMeetup({commit, getters}, payload){
            commit('setLoading', true);
            const user = getters.getUser;
            if(!user.fbKey){return}
            const fbKey = user.fbKey[payload];
            
            //update user meetup registration in firebase
            firebase.database().ref(`/users/${user.id}/registration/`).child(fbKey).remove()
            .then(() =>{
                commit('setLoading', false);
                commit('userUnregisterMeetup', payload);
            })
            .catch((error) => {
                console.log(error);
                commit('setLoading', false);
            })
        }
    }
});