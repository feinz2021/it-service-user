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
                <div class="btn waves-effect waves-light orange btn-large">
                  <span>Select Image<i class="material-icons right">image</i></span>
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
            Save<i class="material-icons right">save</i>
          </button>
          <router-link
            to="/"
            style="width: 48%; margin-left: 4%"
            class="btn waves-effect waves-light grey btn-large"
            >Back<i class="material-icons right">keyboard_arrow_left</i></router-link
          >

          <!-- auth part -->
          <div class="row" style="margin-top: 30px">
            <h6 class="center" style="color: red; font-weight: bold">
              Please enter current password to update email and password
            </h6>
            <div class="input-field col s12 m6 l6">
              <input
                :value="this.email"
                placeholder="Current Email"
                id="currentemail"
                type="text"
                disabled
              />
              <label class="active" for="currentemail">Current Email</label>
            </div>

            <div class="input-field col s12 m6 l6">
              <input
                placeholder="Current Password"
                id="currentpassword"
                type="password"
                v-model="currentPassword"
              />
              <label class="active" for="currentpassword"
                >Current Password</label
              >
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12 m6 l6">
              <input
                v-model="newEmail"
                placeholder="New Email"
                id="newemail"
                type="text"
              />
              <label class="active" for="newemail">New Email</label>
            </div>

            <div class="input-field col s12 m6 l6">
              <input
                placeholder="New Password"
                id="password"
                type="password"
                v-model="newPassword"
              />
              <label class="active" for="password">New Password</label>
            </div>
          </div>

          <button
            @click="updateEmail()"
            style="width: 48%"
            class="btn waves-effect waves-light blue btn-large"
            :disabled="!currentPassword || !newEmail"
          >
            Update Email<i class="material-icons right">save</i>
          </button>
          <button
            @click="updatePassword()"
            style="width: 48%; margin-left: 4%"
            class="btn waves-effect waves-light blue btn-large"
            :disabled="!currentPassword || !newPassword"
          >
            Update Password<i class="material-icons right">save</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingAnimation from "../components/LoadingAnimation.vue";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import firebase from "../utilities/firebase";

export default {
  components: { LoadingAnimation },
  data() {
    return {
      userName: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      newEmail: "",
      newPassword: "",
      currentPassword: "",

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
        .catch((error) => {
          // Handle any errors
          console.log(error);
        });
    } else {
      await setDoc(doc(firebase.db, "profile", this.uid), {
        fullName: this.fullName,
        phoneNumber: this.phoneNumber,
        address: this.address,
        isAdmin: true,
        isActive: true,
        email: this.email
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
          if (this.inputFile) {
            console.log("will replace new image");
            // getting file path
            this.inputFile = this.$refs.profileImage.files[0];
            const storage = getStorage();
            const storageRef = ref(storage, this.uid + ".jpg");
            // 'file' comes from the Blob or File API
            await uploadBytes(storageRef, this.inputFile).catch(() => {});
          } else {
            console.log("no new image");
          }
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
          this.$router.push("/");
        })
        .catch((error) => {
          console.log("save user error: " + error);
          this.$toast.open({
            message: "Error, Please Enter Correct Details",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
        });
    },
    async updateEmail() {
      const credential = EmailAuthProvider.credential(
        this.email,
        this.currentPassword
      );
      await reauthenticateWithCredential(this.auth.currentUser, credential)
        .then(async () => {
          await updateEmail(this.auth.currentUser, this.newEmail);
        })
        .then(() => {
          this.$toast.open({
            message: "Email Updated.",
            type: "success",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
        })
        .catch(() => {
          this.$toast.open({
            message: "System Error.",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
        });
    },
    async updatePassword() {
      const credential = EmailAuthProvider.credential(
        this.email,
        this.currentPassword
      );
      await reauthenticateWithCredential(this.auth.currentUser, credential)
        .then(async () => {
          await updatePassword(this.auth.currentUser, this.newPassword);
        })
        .then(() => {
          this.$toast.open({
            message: "Password Updated.",
            type: "success",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
        })
        .catch(() => {
          this.$toast.open({
            message: "System Error.",
            type: "error",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
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