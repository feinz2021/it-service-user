import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      username: null,
      email: null,
    }
  },
  mutations: {
    username(state, payload) {
      state.username = payload;
    },
    email(state, payload) {
      state.email = payload;
    },
  }
})

export default store;