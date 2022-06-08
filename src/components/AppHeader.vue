<template>
  <nav>
    <div class="nav-wrapper light-blue">
      <ul class="left">
        <a
          class="dropdown-trigger flexbox-center"
          style="width: 300px; justify-content: left"
          href="#"
          data-target="menu-dropdown"
        >
          <span style="font-size: x-large">🧭 Navigation</span>
        </a>
        <ul id="menu-dropdown" class="dropdown-content">
          <div>
            <li>
              <a class="flexbox-center" style="font-size: x-large; color: black"
                >🧍 {{ email }}</a
              >
            </li>
            <li>
              <a
                class="flexbox-center"
                style="font-size: x-large; color: black"
                @click="logout()"
                >🔐 Logout</a
              >
            </li>
            <li class="divider" tabindex="-1"></li>
          </div>
          <router-link v-for="item in routerList" :key="item.to" :to="item.to">
            <li
              style="
                font-size: x-large;
                width: 300px;
                margin-left: -15px;
                justify-content: left;
              "
              class="flexbox-center"
            >
              <div style="margin-left: 15px">{{ item.title }}</div>
            </li>
          </router-link>
        </ul>
      </ul>

      <!-- brand logo -->
      <a href="#!" class="brand-logo right">Logo</a>
    </div>
  </nav>
</template>

<script>
// import firebase from "./utilities/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      isLoading: false,
      email: "",
      routerList: [{ title: "🏠 1. Home", to: "/homepage" }],
    };
  },
  async mounted() {
    window.M.AutoInit();
    onAuthStateChanged(await this.auth, async (user) => {
      if (user) {
        this.email = user.email;
      } 
    });
  },
  computed: {
    // isLoggedIn() {
    //   return this.$store.state.isLoggedIn;
    // },
    // user() {
    //   return this.$store.state.user;
    // },
    auth() {
      return this.$store.state.auth;
    },
  },
  methods: {
    logout() {
      signOut(this.auth)
        .then(() => {
          // this.loginText = "Login";
          this.$toast.open({
            message: "Logout Successful",
            type: "success",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
          console.log("Sign out successful.");
          location.reload();
          // Sign-out successful.
        })
        .catch((error) => {
          console.log("Error logging out: " + error);
          // An error happened.
        });
    },
  },
};
</script>
<style>
.flexbox-center {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  align-items: center;
}
</style>