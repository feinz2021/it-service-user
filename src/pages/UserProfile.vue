<template>
  <LoadingAnimation v-if="isLoading === true" />
  <div class="container" v-show="isLoading === false">
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
              <input
                placeholder="Address"
                id="address"
                type="text"
                v-model="address"
              />
              <label class="active" for="address">Address</label>
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
              <div class="file-field input-field">
                <div class="btn">
                  <span>Select Image</span>
                  <input
                    ref="profileImage"
                    @change="profileImagePreview()"
                    type="file"
                    accept=".jpg, .JPG"
                  />
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text" />
                </div>
              </div>
            </div>
            <div class="input-field col s12 m6 l6">
              <div class="row">
                <div class="col s6 m6 l6">
                  <div class="center">
                    <div>Current Image</div>
                    <img id="profileImage" style="width: 100%" />
                  </div>
                </div>
                <div class="col s6 m6 l6">
                  <div id="preview" class="center">
                    <div>New Image Preview</div>
                    <img
                      v-if="imagePreview"
                      :src="imagePreview"
                      style="width: 100%"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
</template>

<script>
import LoadingAnimation from "../components/LoadingAnimation.vue";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import firebase from "../utilities/firebase";

export default {
  components: { LoadingAnimation },
  data() {
    return {
      userName: "",
      fullName: "",
      phoneNumber: "",
      address: "",

      inputFile: null,
      imagePreview: null,

      // loading animation
      isLoading: false,
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

      // getting image from firebase storage for preview
      const storage = getStorage();
      const storageRef = ref(storage, this.uid + ".jpg");
      getDownloadURL(storageRef)
        .then((url) => {
          // inserted into an <img> element
          const img = document.getElementById("profileImage");
          img.setAttribute("src", url);
        })
        .catch(() => {
          // Handle any errors
        });
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
      this.isLoading = true;
      this.$toast.open({
        message: "Is Updating...Please Wait",
        type: "info",
        duration: 3000,
        dismissible: true,
        position: "bottom",
      });
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
        .then(async () => {
          // getting file path
          this.inputFile = this.$refs.profileImage.files[0];
          const storage = getStorage();
          const storageRef = ref(storage, this.uid + ".jpg");
          // 'file' comes from the Blob or File API
          await uploadBytes(storageRef, this.inputFile).catch(() => {});
        })
        .then(() => {
          this.isLoading = false;
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
    async profileImagePreview() {
      // getting file path
      this.inputFile = this.$refs.profileImage.files[0];
      // image preview
      this.imagePreview = URL.createObjectURL(this.inputFile);
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