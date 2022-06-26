<template>
  <AppHeader v-if="isLoggedIn === 'true'" />
  <router-view></router-view>
  <LoadingAnimation v-if="this.loading === true" />
  <LoginPage v-else-if="this.loggedIn === false" />
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import LoginPage from "./components/LoginPage.vue";
import LoadingAnimation from "./components/LoadingAnimation.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: { AppHeader, LoginPage, LoadingAnimation },
  data() {
    return {
      loggedIn: false,
      loading: false,
      isLoggedIn: localStorage.getItem("isLoggedIn"),
    };
  },
  async mounted() {
    this.loading = true;
    const auth = getAuth();
    await this.$store.commit("auth", auth);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.$store.commit("uid", user.uid);
        await this.$store.commit("username", user.displayName);
        await this.$store.commit("email", user.email);

        this.loggedIn = true;
        this.loading = false;
      } else {
        console.log("USER LOGGED OUT");
        this.loading = false;
      }
    });
  },
};
</script>

<style>
body {
  background-color: #80deea;
}
</style>