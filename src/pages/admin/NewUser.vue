<template>
  <div class="container">
    <div class="card-panel">
      <h5 class="center">New User</h5>
      <div style="margin-top: 30px"></div>
      <div class="row">
        <div class="input-field col s6 m6 l6">
          <input placeholder="Email" id="email" type="text" v-model="email" />
          <label class="active" for="email">Email</label>
        </div>
        <div class="input-field col s6 m6 l6">
          <input
            placeholder="Password"
            id="password"
            type="password"
            v-model="password"
          />
          <label class="active" for="password">Password</label>
        </div>
        <button
          style="width: 59%"
          class="btn btn-large waves-effect waves-light blue"
          @click="createUser()"
          :disabled="!email || !password"
        >
          Save New User<i class="material-icons right">save</i>
        </button>
             <router-link
          to="/userlist"
          style="color: white; width: 40%; margin-left: 1%"
          class="waves-effect waves-light btn-large grey"
        >
          Back<i class="material-icons right">keyboard_arrow_left</i>
        </router-link>
        
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import firebase from "../../utilities/firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async createUser() {
      this.$toast.open({
        message: "Is Saving...Please Wait",
        type: "info",
        duration: 3000,
        dismissible: true,
        position: "bottom",
      });
      const auth = getAuth();
      let originalUser = auth.currentUser;
      console.log("original user: " + originalUser.email);
      await createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(async (userCredential) => {
          console.log(
            "registered and logged in: " +
              userCredential.user.email +
              " uid " +
              userCredential.user.uid
          );
          await setDoc(doc(firebase.db, "profile", userCredential.user.uid), {
            fullName: "",
            phoneNumber: "",
            address: "",
            isAdmin: false,
            isActive: true,
            email: this.email,
          });
        })
        .then(async () => {
          await auth.updateCurrentUser(originalUser);
        })
        .then(() => {
          window.location.replace("/userlist");
          this.$toast.open({
            message: "New User Registered Successfully",
            type: "success",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
        })
        .catch((e) => {
          console.log("error" + e);
          this.$toast.open({
            message: "Error: Please Enter Correct Details.",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
        });
    },
  },
  mounted() {
    document.title = "New User";
  },
};
</script>

<style>
</style>