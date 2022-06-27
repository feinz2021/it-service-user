<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m8 l8 push-m2 push-l2">
        <div class="card-panel">
          <h5>View Task</h5>
          <div style="margin-top: 20px"></div>
          <small
            ><i>{{ username }}</i></small
          >

          <div class="input-field">
            <input v-model="this.taskName" id="task_name" type="text" />
            <label class="active" for="task_name">Task Name</label>
          </div>

          <div class="input-field">
            <input v-model="this.cost" id="cost" type="number" />
            <label class="active" for="cost">Cost</label>
          </div>
        </div>

        <div></div>
        <div class="center-align">
          <button
            style="width: 100%"
            class="waves-effect waves-light btn-large blue"
            @click="saveTask()"
          >
            Save<i class="material-icons right">save</i>
          </button>
          <div style="margin-top: 10px"></div>
          <button
            style="width: 100%"
            class="waves-effect waves-light btn-large red"
            @click="deleteTask()"
          >
            Delete<i class="material-icons right">delete</i>
          </button>
          <div style="margin-top: 10px"></div>
          <router-link
            to="/tasklist"
            style="width: 100%"
            class="aves-effect waves-light btn-large grey"
          >
            Back<i class="material-icons right">keyboard_arrow_left</i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import firebase from "../../utilities/firebase";

export default {
  data() {
    return {
      taskName: "",
      cost: 0,
    };
  },
  computed: {
    taskId() {
      return sessionStorage.getItem("taskId");
    },
    username() {
      return this.$store.state.username;
    },
  },
  async mounted() {
    document.title = "View Task";
    window.M.AutoInit();
    //read database
    const docRef = doc(firebase.db, "task", this.taskId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.taskName = docSnap.data().taskName;
      this.cost = docSnap.data().cost;
    } else {
      console.log("No such document!");
    }
  },
  methods: {
    async saveTask() {
      try {
        const docRef = doc(firebase.db, "task", this.taskId);
        await updateDoc(docRef, {
          taskName: this.taskName,
          cost: this.cost,
        });
        console.log("task added with ID: ", docRef.id);
        this.$toast.open({
          message: "Task Updated Successfully",
          type: "success",
          duration: 3000,
          dismissible: true,
          position: "bottom",
        });
        this.$router.push("/tasklist");
      } catch (e) {
        console.error("Error adding task: ", e);
      }
    },
    async deleteTask() {
      await deleteDoc(doc(firebase.db, "task", this.taskId));
      this.$toast.open({
        message: "Task Deleted Successfully",
        type: "success",
        duration: 3000,
        dismissible: true,
        position: "bottom",
      });
      this.$router.push("/tasklist");
    },
    cancel() {
      this.$router.push("/tasklist");
    },
  },
};
</script>

<style>
</style>