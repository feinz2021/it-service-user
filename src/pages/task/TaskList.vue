<template>
  <div class="container">
    <router-link
      to="/addtask"
      style="color: white"
      class="waves-effect waves-light btn blue"
    >
      Add Task
    </router-link>

    task list:

    <table class="highlight">
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="task in taskList"
          :key="task.id"
          class="fingerPointer"
          @click="gotoViewTask(task.id)"
        >
          <td>{{ task.data().taskName }}</td>
          <td>RM {{ task.data().cost }}</td>
        </tr>
      </tbody>
    </table>

  </div>
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
      this.$router.push("/addtask");
    },
    gotoViewTask(tId) {
      console.log(tId);
      sessionStorage.setItem("taskId", tId);
      this.$router.push("/viewtask");
    },
  },
  async mounted() {
    window.M.AutoInit();
    const querySnapshot = await getDocs(collection(firebase.db, "task"));
    querySnapshot.forEach((doc) => {
      this.taskList.push(doc);
    });
  },
};
</script>

<style>
.fingerPointer {
  cursor: pointer;
}
</style>