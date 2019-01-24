import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/models/User';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {
                imageUrl:
                    "http://scandinavianlibrary.org/wp-content/uploads/2017/11/IMG_0735-1-e1511040507716.jpg",
                id: "123",
                title: "Meetup at library",
                date: '2018-02-12'
            },
            {
                imageUrl:
                    "http://scandinavianlibrary.org/wp-content/uploads/2017/11/IMG_0735-1-e1511040507716.jpg",
                id: "121",
                title: "Meetup at a",
                date: '2018-02-10'
            }
        ],
        user:{
            id: '123',
            registeredMeetup: ["123"]
        }
    },
    getters: {
        getUser(){

        },
        getLoadedMeetups(state){
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return new Date(meetupA.date).getTime() - new Date(meetupB.date).getTime()
            });
        },
        getLoadedMeetup(state):any{
            return (meetupId: string) => {return state.loadedMeetups.find(meetup => meetupId === meetup.id)}
        },
        getFeaturedMeetups(state, getters){
            return getters.loadedMeetups.slice(0, 5);
        }
    },
    mutations: {
        createMeetup(state, payload){
            state.loadedMeetups.push(payload)
        }
    },
    actions: {
        createMeetup({commit}, payload){
            const meetup = {
                id: '333',
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: new Date()
            }

            //store to firebase

            commit('createMeetup', meetup);
        }
    }
});