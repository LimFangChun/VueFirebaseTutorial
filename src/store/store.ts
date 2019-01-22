import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/models/User';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: [new User(1, 'Hello', undefined)]
    },
    getters: {
        getUsers(state) {
            return state.users;
        }
    },
    mutations: {
        addUser(state, newUser: User) {
            state.users.push(newUser);
        }
    },
    actions: {
        addUser(context, newUser: User) {
            axios({ method: "GET", url: "https://jsonplaceholder.typicode.com/posts/1" })
                .then(response => { console.log(response.data); }, error => { console.log(error) });
            context.commit('addUser', newUser)
        }
    }
});