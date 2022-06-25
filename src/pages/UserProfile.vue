<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m12 l12">
        <div class="card-panel">
          <h5 class="center">User Profile</h5>
          <div style="margin-top: 20px"></div>
          <div class="row">
            <div class="input-field col s12 m6 l6">
              <input
                v-model="userName"
                placeholder="Username"
                id="username"
                type="text"
              />
              <label class="active" for="username">Username</label>
            </div>
            <div class="input-field col s12 m6 l6">
              <button class="btn">Profile Photo</button>
              <!-- <img class="margin-left: 20px;" src="pic_trulli.jpg" alt="Italian Trulli"> -->
              <span class="material-icons">portrait</span>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12 m6 l6">
              <input
                v-model="fullName"
                placeholder="Full Name"
                id="fullName"
                type="text"
              />
              <label class="active" for="fullName">Full Name</label>
            </div>
            <div class="input-field col s12 m6 l6">
              <input
                placeholder="Phone Number"
                id="phone_number"
                type="number"
                v-model="phoneNumber"
              />
              <label class="active" for="phone_number">Phone Number</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12 m6 l6">
              <input
                placeholder="Address"
                id="address"
                type="text"
                v-model="address"
              />
              <label class="active" for="address">Address</label>
            </div>
            <div class="input-field col s12 m6 l6">
              <button
                @click="saveButton()"
                style="width: 48%"
                class="btn waves-effect waves-light blue btn-large"
                :disabled="!userName || !fullName || !phoneNumber || !address"
              >
                Save
              </button>
              <router-link
                to="/"
                style="width: 48%; margin-left: 4%"
                class="btn waves-effect waves-light grey btn-large"
                >Cancel</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import firebase from "../utilities/firebase";

export default {
  data() {
    return {
      userName: "",
      fullName: "",
      phoneNumber: "",
      address: "",
    };
  },
  async mounted() {
    window.M.AutoInit();
    //read database
    this.userName = this.username;
    const docRef = doc(firebase.db, "profile", this.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.fullName = docSnap.data().fullName;
      this.phoneNumber = docSnap.data().phoneNumber;
      this.address = docSnap.data().address;
    } else {
      await setDoc(doc(firebase.db, "profile", this.uid), {
        fullName: this.fullName,
        phoneNumber: this.phoneNumber,
        address: this.address,
        isAdmin: true,
      });
    }
  },
  methods: {
    async saveButton() {
      //update document
      const docRef = doc(firebase.db, "profile", this.uid);
      await updateDoc(docRef, {
        fullName: this.fullName,
        phoneNumber: this.phoneNumber,
        address: this.address,
      })
        .then(async () => {
          await this.$store.commit("username", this.userName);
          updateProfile(this.auth.currentUser, {
            displayName: this.userName,
          });
        })
        .then(() => {
          this.$toast.open({
            message: "Profile updated.",
            type: "success",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
          window.location.replace("/");
        });
    },
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
    uid() {
      return this.$store.state.uid;
    },
  },
};
</script>

<style>
</style>