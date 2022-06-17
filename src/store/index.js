import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      username: null,
      email: null,
      auth: null,
      uid: null,
    }
  },
  mutations: {
    uid(state, payload) {
      state.uid = payload;
    },
    username(state, payload) {
      state.username = payload;
    },
    email(state, payload) {
      state.email = payload;
    },
    auth(state, payload) {
      state.auth = payload;
    },
  }
})

export default store;