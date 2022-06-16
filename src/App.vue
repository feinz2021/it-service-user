<template>
  <AppHeader v-if="this.loggedIn" />
  
  <router-view v-if="this.loggedIn" ></router-view>
  <ContentLoader v-else-if="this.loading" />
  <LoginPage v-else />
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import LoginPage from "./components/LoginPage.vue";
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
    this.loading = true;
    const auth = getAuth();
    await this.$store.commit("auth", auth);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // start loading animation
        this.loggedIn = true;
        await this.$store.commit("username", user.displayName);
        await this.$store.commit("email", user.email);
        console.log("user.email: ");
        console.log(user.email);
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
  }
};
</script>

<style>
</style>