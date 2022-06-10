<template>
  <div class="input-field">
    <input v-model="taskName" id="task_name" type="text" />
    <label class="active" for="task_name">Task Name</label>
  </div>

  <div class="input-field">
    <input v-model="cost" id="cost" type="number" />
    <label class="active" for="cost">Cost</label>
  </div>

  <button class="waves-effect waves-light btn blue" @click="saveTask()">
    Save
  </button>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import firebase from "../../utilities/firebase";

export default {
  data() {
    return {
      taskName: "",
      cost: 0,
    };
  },
  mounted() {
    window.M.AutoInit();
  },
  methods: {
    async saveTask() {
      try {
        const docRef = await addDoc(collection(firebase.db, "task"), {
          taskName: this.taskName,
          cost: this.cost,
        });
        console.log("task added with ID: ", docRef.id);
        this.$toast.open({
          message: "Task Added Successfully",
          type: "success",
          duration: 3000,
          dismissible: true,
          position: "bottom",
        });
        window.location.replace("/tasklist");
      } catch (e) {
        console.error("Error adding task: ", e);
      }
    },
  },
};
</script>

<style>
</style>