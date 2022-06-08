<template>
  <div class="input-field">
    <input v-model="this.taskName" id="task_name" type="text" />
    <label class="active" for="task_name">Task Name</label>
  </div>

  <div class="input-field">
    <input v-model="this.cost" id="cost" type="number" />
    <label class="active" for="cost">Cost</label>
  </div>

  <button class="waves-effect waves-light btn blue" @click="saveTask()">
    Save
  </button>

  <button class="waves-effect waves-light btn red" @click="deleteTask()">
    Delete
  </button>

  <button class="waves-effect waves-light btn grey" @click="cancel()">
    Cancel
  </button>
</template>

<script>
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import firebase from "../../utilities/firebase";

export default {
  data() {
    return {
      taskName: "",
      cost: "",
    };
  },
  computed: {
    taskId() {
      return sessionStorage.getItem("taskId");
    },
  },
  async mounted() {
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
        window.location.href = "/tasklist";
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
      window.location.href = "/tasklist";
    },
    cancel(){
      window.location.href = "/tasklist";
    }
  },
};
</script>

<style>
</style>