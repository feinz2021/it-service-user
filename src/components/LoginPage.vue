<template>
  <div class="bg-canvas" @click="closeModal()"></div>
  <div class="login-form-placement">
    <div class="card login-form">
      <form style="width: 400px; margin-top: -15%" @submit.prevent="submit()">
        <div class="input-field">
          <label for="email" ref="emailRef">Email</label>
          <input v-model="email" id="email" type="text" class="validate" />
        </div>
        <div class="input-field">
          <label for="password">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            class="validate"
          />
        </div>
        <div class="center-item">
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
      </form>
      <!-- <div style="width: 400px; margin-top: -16%">
				<div class="center-item">
					<button
						style="width: 100%"
						class="btn waves-effect waves-light orange"
						name="register"
					>
						Register
					</button>
				</div>
			</div> -->
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
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
          this.closeModal();
        //   window.location.reload();
        })
        .catch((e) => {
          console.log("error: ");
          console.log(e);
          this.isLoading = false;
        });
    },
    closeModal() {
      this.$emit("open-login-modal");
    },
  },
  mounted() {
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