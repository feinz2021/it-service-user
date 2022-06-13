<template>
  <AppHeader v-if="this.loggedIn" />
  
  <router-view v-if="this.loggedIn" ></router-view>
  <ContentLoader v-else-if="this.loading" />
  <LoginPage v-else />
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import LoginPage from "./components/LoginPage.vue";
import firebase from "./utilities/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ContentLoader } from "vue-content-loader";

export default {
  components: { AppHeader, LoginPage, ContentLoader },
  data() {
    return {
      loggedIn: false,
      loading: false,
    };
  },
  async mounted() {
    // storing getAuth into state
    this.loading = true;
    await this.$store.commit("auth", getAuth(firebase.app));
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        // start loading animation
        this.loggedIn = true;
        await this.$store.commit("isLoggedIn", true);
        await this.$store.commit("user", user);
        // this.chatUsername = user.displayName;
        console.log("this.user.email: ");
        console.log(this.user.email);
        this.$nextTick(() => {
          // end loading animation
          this.loading = false;
        });
        // ...
      } else {
        // this.chatUsername = "";
        console.log("USER LOGGED OUT");
          this.$nextTick(() => {
          // end loading animation
          this.loading = false;
        });
      }
      // this.loadingDataComplete = true;
    });
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    user() {
      return this.$store.state.user;
    },
    auth() {
      return this.$store.state.auth;
    },
  },
};
</script>

<style>
</style>