<template>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper light-blue z-depth-1">
        <ul class="left">
          <a
            class="dropdown-trigger flexbox-center"
            style="width: 200px; justify-content: left"
            href="#"
            data-target="menu-dropdown"
            @mouseover="clickNav()"
            id="navButton"
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
                  class="flexbox-center"
                  style="font-size: x-large; color: black"
                  id="usernameMenu"
                  >🧍 {{ username }}</a
                >
              </li>
              <li>
                <router-link
                  style="font-size: x-large; color: black"
                  to="/userprofile"
                  class="flexbox-center"
                >
                  👤 User Profile
                </router-link>
              </li>
              <li v-if="isAdmin === 'true'">
                <router-link
                  style="font-size: x-large; color: black"
                  to="/userlist"
                  class="flexbox-center"
                >
                  👥 (Admin) Manage User
                </router-link>
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
import { signOut } from "firebase/auth";

export default {
  data() {
    return {
      isAdmin: localStorage.getItem("isAdmin"),
      isLoading: false,
      routerList: [
        { title: "🏠 Home", to: "/homepage" },
        { title: "📝 Order List", to: "/orderlist" },
        { title: "📃 Task List", to: "/tasklist" },
      ],
    };
  },
  async mounted() {
    window.M.AutoInit();
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
      localStorage.clear();
      signOut(this.auth)
        .then(() => {
          localStorage.clear();
          this.$toast.open({
            message: "Logout Successful",
            type: "success",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
          console.log("Sign out successful.");
          window.location.replace("/");
          // Sign-out successful.
        })
        .catch((error) => {
          console.log("Error logging out: " + error);
          // An error happened.
        });
    },
    clickNav(){
      document.getElementById("navButton").click();
    }
  },
};
</script>
<style>
.flexbox-center {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>