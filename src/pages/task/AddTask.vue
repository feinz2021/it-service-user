<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m12 l12">
        Enter New Task:
        <div style="margin-bottom: 50px"></div>
        <div class="input-field">
          <input v-model="taskName" id="task_name" type="text" />
          <label class="active" for="task_name">Task Name</label>
        </div>

        <div class="input-field">
          <input v-model="cost" id="cost" type="number" />
          <label class="active" for="cost">Cost</label>
        </div>
        <div class="center-align">
          <button class="waves-effect waves-light btn blue" @click="saveTask()">
            Save<i class="material-icons right">save</i>
          </button>
          <router-link to="/tasklist" class="waves-effect waves-light btn grey">
            Back<i class="material-icons right">arrow_back</i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
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
        this.$router.push("/tasklist");
      } catch (e) {
        console.error("Error adding task: ", e);
      }
    },
  },
};
</script>

<style>
</style>