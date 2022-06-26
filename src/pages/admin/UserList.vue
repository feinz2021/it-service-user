<template>
  <div class="container">
    <router-link
      class="btn waves-effect waves-light orange btn-large"
      style="width: 100%; margin-top: 10px"
      to="/newuser"
      >Create New User<i class="material-icons right">add</i></router-link
    >

    <div class="card-panel">
      <table>
        <thead>
          <tr>
            <th class="center">#</th>
            <th class="center">Name</th>
            <th class="center">Email</th>
            <th class="center">Phone Number</th>
            <th class="center">Address</th>
            <th class="center">Is Active?</th>
            <th class="center">Enable/Disable User</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(user, index) in userList" :key="user">
            <td class="center">{{ index + 1 }})</td>
            <td class="center">{{ user.data().fullName }}</td>
            <td class="center">{{ user.data().email }}</td>
            <td class="center">{{ user.data().phoneNumber }}</td>
            <td class="center">{{ user.data().address }}</td>
            <td class="center">{{ user.data().isActive }}</td>
            <td class="center">
              <button
                v-if="user.data().isAdmin === false"
                @click="changeStatus(user.data().isActive, user.id)"
                class="btn waves-effect waves-light blue btn-small"
                style="width: 100%"
              > Edit
                <i class="material-icons right">edit</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import firebase from "../../utilities/firebase";
export default {
  data() {
    return {
      userList: [],
      keyRender: 0,
    };
  },
  async mounted() {
    document.title = "User List";
    const querySnapshot = await getDocs(collection(firebase.db, "profile"));
    querySnapshot.forEach((doc) => {
      // doc is an object, save into taskList (object in array)
      this.userList.push(doc);
    });
  },
  methods: {
    async changeStatus(isAct, id) {
      // console.log(email, id);
      const docRef = doc(firebase.db, "profile", id);
      await updateDoc(docRef, {
        isActive: !isAct,
      }).then(() => {
        this.$toast.open({
          message: "User Updated",
          type: "success",
          duration: 3000,
          dismissible: true,
          position: "bottom",
        });
        window.location.reload();
      });
    },
  },
};
</script>

<style>
</style>