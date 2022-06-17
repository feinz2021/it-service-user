<template>
<body style="background-color: powderblue; padding-bottom: 10px; height: 100vh;">
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
          <div class="input-field col s12 m12 l12">
            <label class="active" for="password">Password</label>
            <input
              v-model="password"
              id="password"
              type="password"
              class="validate"
            />
          </div>
        </div>
        <div class="row">
          <div class="col s12 m12 l12">
            <button
              style="width: 100%"
              class="btn-large waves-effect waves-light blue"
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
</body>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "a@a.com",
      password: "123abc",
      isLoading: false
    };
  },
  methods: {
    submit() {
      this.isLoading = true;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
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
    document.title = "Login 🔐";
    window.M.AutoInit();
    this.$refs.emailRef.focus();
  },
};
</script>

<style>
/* .bg-canvas {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 20;
  position: fixed;
  top: 0px;
} */
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