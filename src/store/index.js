import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      user: null,
      auth: null,
    }
  },
  mutations: {
    isLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
    user(state, payload) {
      state.user = payload;
    },
    auth(state, payload) {
      state.auth = payload;
    }
  }
})

export default store;