<template>
  <div class="container">
    <div style="margin-top: 10px"></div>
    <router-link
      to="/addtask"
      style="color: white; width: 100%"
      class="waves-effect waves-light btn-large orange"
    >
      Add New Task<i class="material-icons right">add</i>
    </router-link>
    <div style="margin-top: 10px"></div>
    <div class="card-panel">
      <table class="highlight">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Cost</th>
            <th>Added By</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(task, index) in taskList"
            :key="task.id"
            class="fingerPointer"
            @click="gotoViewTask(task.id)"
          >
            <td>{{ index + 1 }}. {{ task.data().taskName }}</td>
            <td>RM {{ task.data().cost }}</td>
            <td>
              <small>{{ username }}</small>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, query, orderBy } from "firebase/firestore";
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
    document.title = "Task List";
    window.M.AutoInit();
    const querySnapshot = await getDocs(
      query(collection(firebase.db, "task"), orderBy("taskName", "asc"))
    );
    querySnapshot.forEach((doc) => {
      this.taskList.push(doc);
    });
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
};
</script>

<style>
.fingerPointer {
  cursor: pointer;
}
</style>