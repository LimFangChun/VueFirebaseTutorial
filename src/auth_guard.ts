import { store } from './store/store';

export default (to: any, from: any, next: any) => {
    if (store.getters.getUser) {
        next();
    } else {
        next('/signin')
    }
}