<template>
  <body
    style="background-color: powderblue; padding-bottom: 10px; height: 100vh"
  >
    <div class="login-form-placement">
      <div class="card login-form">
        <div style="width: 400px; margin-top: 0%">
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
                @click="submit()"
                name="login"
              >
                <span v-if="!isLoading">Login</span>
                <span v-else>⏳</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import firebase from "../utilities/firebase";

export default {
  data() {
    return {
      email: "aaaa63351@gmail.com",
      password: "aaaaaa",
      isLoading: false,
    };
  },
  methods: {
    async submit() {
      localStorage.clear();
      this.$toast.open({
        message: "Is Logging In...",
        type: "info",
        duration: 3000,
        dismissible: true,
        position: "bottom",
      });
      this.isLoading = true;
      const auth = getAuth();
      let uid = "";
      await signInWithEmailAndPassword(auth, this.email, this.password)
        .then((res) => {
          uid = res.user.uid;
          console.log("login successful. uid: " + uid);
          console.log(res);

          // setting uid in localstorage for fast access
          localStorage.setItem("uid", uid);
        })
        .then(async () => {
          const docRef = doc(firebase.db, "profile", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            if (docSnap.data().isActive === false) {
              signOut(auth)
                .then(() => {
                  this.$toast.open({
                    message: "Account Disabled. Logging Out...",
                    type: "error",
                    duration: 3000,
                    dismissible: true,
                    position: "bottom",
                  });
                  // Sign-out successful.
                })
                .catch((error) => {
                  console.log("Error logging out: " + error);
                  // An error happened.
                });
            } else {
              localStorage.setItem("isAdmin", docSnap.data().isAdmin);
              localStorage.setItem("isLoggedIn", "true");
            }
          } else {
            // the reason is only admin has privilege to register
            // without having profile
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("isAdmin", "true");
          }
          this.isLoading = false;
          window.location.replace("/");
        })
        .catch((e) => {
          console.log("error: ");
          console.log(e);
          this.isLoading = false;
        });
    },
  },
  mounted() {
    document.title = "Login";
    window.M.AutoInit();
    this.$refs.emailRef.focus();
  },
};
</script>

<style>
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