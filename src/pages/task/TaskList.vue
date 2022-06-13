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

    <ul v-for="task in taskList" :key="task.id">
      <div class="row">
        <div class="col s12 m12 l12">
          <div
            class="card-panel white fingerPointer"
            @click="gotoViewTask(task.id)"
          >
            <li>
              <div style="margin-left: 15px">
                {{ task.data().taskName }}: RM {{ task.data().cost }}
              </div>
            </li>
          </div>
        </div>
      </div>
    </ul>
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