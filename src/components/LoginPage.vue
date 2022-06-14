<template>
  <div class="bg-canvas"></div>
  <div class="login-form-placement">
    <div class="card login-form">
      <form style="width: 400px; margin-top: 0%" @submit.prevent="submit()">
        <h5 class="center-align">Login</h5>
        <div class="row">
          <div class="input-field col s12 m12 l12">
            <label class="active" for="email" ref="emailRef">Email</label>
            <input v-model="email" id="email" type="text" class="validate" />
          </div>
        </div>
        <div class="row">
          <div class="input-field col s10 m10 l10">
            <label class="active" for="password">Password</label>
            <input
              v-if="!showPassword"
              v-model="password"
              id="password"
              type="password"
              class="validate"
            />
            <input v-else v-model="password" id="password" class="validate" />
          </div>
          <div class="input-field col s1 m1 l1">
            <a
              @click="toggleShow"
              class="btn green tooltipped"
              data-position="top"
              data-tooltip="Show/Hide Password"
              tooltip="show"
            >
              <i
                :class="
                  showPassword === false
                    ? 'material-icons-outlined'
                    : 'material-icons'
                "
                >remove_red_eye</i
              >
            </a>
          </div>
        </div>
        <div class="row">
          <div class="col s12 m12 l12">
            <button
              style="width: 100%"
              class="btn waves-effect waves-light blue"
              type="submit"
              name="login"
            >
              <span v-if="!isLoading">Login</span>
              <span v-else>⏳</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "a@a.com",
      password: "123abc",
      isLoading: false,
      showPassword: false,
    };
  },
  methods: {
    submit() {
      this.isLoading = true;
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then((res) => {
          this.email = "";
          this.password = "";
          console.log("login successful: ");
          console.log(res);
          this.isLoading = false;
        })
        .catch((e) => {
          console.log("error: ");
          console.log(e);
          this.isLoading = false;
        });
    },
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
  },
  mounted() {
    window.M.AutoInit();
    this.$refs.emailRef.focus();
  },
  computed: {
    auth() {
      return this.$store.state.auth;
    },
  },
};
</script>

<style>
.bg-canvas {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 20;
  position: fixed;
  top: 0px;
}
.login-form-placement {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0%;
  width: 100%;
  height: 100%;
}
.login-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 450px;
  z-index: 22;
}
.center-item {
  display: flex;
  flex-wrap: wrap;
}
</style>