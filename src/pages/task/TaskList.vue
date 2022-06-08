<template>
  <router-link
    to="/addtask"
    style="color: white"
    class="waves-effect waves-light btn blue"
  >
    Add Task
  </router-link>

  task list:

  <ul v-for="task in taskList" :key="task.id">
    <li @click="gotoViewTask(task.id)">
      <div style="margin-left: 15px">
        {{ task.data().taskName }}: RM {{ task.data().cost }}
      </div>
    </li>
  </ul>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import firebase from "../../utilities/firebase";

export default {
  data() {
    return {
      taskList: [],
    };
  },
  methods: {
    addNewTask() {
      console.log("add new task");
      window.location.href = "/addtask";
    },
    gotoViewTask(tId) {
      console.log(tId);
      sessionStorage.setItem("taskId", tId);
      window.location.href = "/viewtask";
    },
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(firebase.db, "task"));
    querySnapshot.forEach((doc) => {
      this.taskList.push(doc);
    });
  },
};
</script>

<style>
</style>