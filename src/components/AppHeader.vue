<template>
  <!-- Modal Structure -->
  <div id="modalChangeUsername" class="modal">
    <div class="modal-content">
      <h5>Change Username</h5>
      <label for="usernamef">Enter new username here ⬇️ </label>
      <input
        id="usernamef"
        v-model="usernameField"
        @keydown.enter="updateUsername()"
      />
      <div style="margin-top: 10px"></div>
      <button
        style="width: 100%"
        class="btn-large waves-effect waves-light blue modal-close"
        @click="updateUsername()"
      >
        Save Username<i class="material-icons right">save</i>
      </button>
      <div style="margin-top: 20px"></div>
      <button
        style="width: 100%"
        class="btn-large waves-effect waves-light grey modal-close"
      >
        Back<i class="material-icons right">arrow_back</i>
      </button>
    </div>
  </div>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper light-blue z-depth-1">
        <ul class="left">
          <a
            class="dropdown-trigger flexbox-center tooltipped"
            data-position="bottom"
            data-tooltip="Click For Menu"
            style="width: 250px; justify-content: left"
            href="#"
            data-target="menu-dropdown"
          >
            <span style="font-size: x-large">🧭 Navigation</span>
          </a>
          <ul
            id="menu-dropdown"
            class="dropdown-content"
            style="overflow: hidden"
          >
            <div>
              <li>
                <a
                  class="flexbox-center modal-trigger"
                  href="#modalChangeUsername"
                  style="font-size: x-large; color: black"
                  id="usernameMenu"
                  >🧍 {{ usernameField }}</a
                >
                <label style="margin-left: 22px" for="usernameMenu"
                  >Click to change username ⬆️⬆️⬆️</label
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
            <router-link
              v-for="item in routerList"
              :key="item.to"
              :to="item.to"
            >
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
        <router-link
          to="/homepage"
          class="brand-logo center hide-on-small-only tooltipped"
          data-position="bottom"
          data-tooltip="Go to Home"
          >🏡</router-link
        >
        <router-link
          to="/homepage"
          class="brand-logo right hide-on-med-and-up tooltipped"
          data-position="bottom"
          data-tooltip="Go to Home"
          >🏡</router-link
        >
      </div>
    </nav>
  </div>
</template>

<script>
// import firebase from "./utilities/firebase";
import { signOut, updateProfile } from "firebase/auth";

export default {
  data() {
    return {
      isLoading: false,
      usernameField: "",
      routerList: [
        { title: "🏠 Home", to: "/homepage" },
        { title: "📝 Order List", to: "/orderlist" },
        { title: "📃 Task List", to: "/tasklist" },
        // { title: "👥 User List", to: "/userlist" },
      ],
    };
  },
  async mounted() {
    window.M.AutoInit();
    this.usernameField = this.username;
    console.log("username" + this.usernameField);
  },
  computed: {
    email() {
      return this.$store.state.email;
    },
    username() {
      return this.$store.state.username;
    },
    auth() {
      return this.$store.state.auth;
    },
  },
  methods: {
    logout() {
      sessionStorage.clear();
      signOut(this.auth)
        .then(() => {
          this.$toast.open({
            message: "Logout Successful",
            type: "success",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
          console.log("Sign out successful.");
          // location.reload();
          window.location.replace("/");
          // Sign-out successful.
        })
        .catch((error) => {
          console.log("Error logging out: " + error);
          // An error happened.
        });
    },
    async updateUsername() {
      await this.$store.commit("username", this.usernameField);
      updateProfile(this.auth.currentUser, {
        displayName: this.usernameField,
      })
        .then(() => {
          this.$toast.open({
            message: "Username updated.",
            type: "success",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
          console.log("Username updated: " + this.auth.currentUser.displayName);
          // Profile updated!
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
          console.log(error);
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