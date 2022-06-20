<template>
  <AppHeader v-if="this.loggedIn === true" />
  <router-view v-if="this.loggedIn === true"></router-view>
  <LoadingAnimation v-else-if="this.loading === true" />
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
        console.log("user.email: ");
        console.log(user.email);
        this.loggedIn = true;
        // this.$nextTick(() => {
        //   // end loading animation
        this.loading = false;
        // });
        // ...
      } else {
        console.log("USER LOGGED OUT");
        //   this.$nextTick(() => {
        //   // end loading animation
        this.loading = false;
        // });
      }
      // this.loadingDataComplete = true;
    });
  },
};
</script>

<style>
body{
  background-color: #80deea;
}
</style>