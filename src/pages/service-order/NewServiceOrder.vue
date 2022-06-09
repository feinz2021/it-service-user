<template>
  newserviceorder

  <div class="container">
    <div class="row">
      <div class="col m8 l8 push-m2 push-l2">
        <h5>Service Order</h5>
        <ul>
          <li v-for="(order, index) in serviceOrderList" :key="order.id">
            <div class="row">
              <div class="col s9 m9 l9">
                {{ order.taskName }}
              </div>
              <div class="col s3 m3 l3">
                <button
                  style="width: 100%"
                  class="btn waves-effect waves-light red"
                  @click="deleteTask(index)"
                >
                  Del<i class="material-icons right">delete</i>
                </button>
              </div>
            </div>
          </li>
        </ul>

        <form @submit.prevent="addTask()">
          <div class="row">
            <div class="input-field col s9 m9 l9">
              <input
                id="autocomplete-input"
                class="autocomplete action"
                style="font-size: 24px"
                @keypress.enter="submit"
                type="text"
                ref="searchTask"
                v-model="newTaskName"
              />
            </div>
            <div class="col s3 m3 l3">
              <button
                style="width: 100%"
                class="btn waves-effect waves-light"
                @click="submit"
              >
                Add<i class="material-icons right">save</i>
              </button>
            </div>
          </div>
        </form>

        <div style="margin-bottom: 50px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import firebase from "../../utilities/firebase";

export default {
  data() {
    return {
      newTaskName: "",
      taskList: [],
      serviceOrderList: [],
    };
  },
  methods: {
    // search for task and add
    addTask() {
      if (this.newAlphabeth === "") {
        this.$toast.open({
          message: "Enter a task first",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: "bottom",
        });
      } else {
        const addingToArray = this.serviceOrderList.push({
          taskName: this.newTaskName,
        });
        const clearingNewTaskVariable = (this.newTaskName = "");
        return addingToArray, clearingNewTaskVariable;
      }
    },
    deleteTask(index) {
      return this.serviceOrderList.splice(index, 1);
    },
  },
  async mounted() {
    window.M.AutoInit();

    // firebase query
    const querySnapshot = await getDocs(collection(firebase.db, "task"));
    querySnapshot.forEach((doc) => {
      this.taskList.push(doc.data());
    });

    // materializecss autocomplete
    var elems = document.querySelectorAll(".autocomplete");
    var data = {};
    for (const task of this.taskList) {
      data[task.taskName] = null;
    }
    var options = {
      data: data,
    };
    window.M.Autocomplete.init(elems, options);
  },
};
</script>

<style>
</style>