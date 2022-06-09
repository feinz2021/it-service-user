<template>
  newserviceorder

  <div class="container">
    <div class="row">
      <div class="col m8 l8 push-m2 push-l2">
        <h5>Service Order</h5>
        <button @click="testButton()">test</button>

        <!-- displaying the selected task -->
        <ul>
          <li v-for="(order, index) in serviceOrderList" :key="order.taskName">
            <div class="row">
              <div class="col s9 m9 l9">
                {{ index + 1 + "." }}
                {{ order.taskName }}
                {{ order.cost }}
              </div>
              <div class="col s3 m3 l3">
                <button
                  style="width: 100%"
                  class="btn waves-effect waves-light red"
                  @click="deleteTask(index, order.cost)"
                >
                  Del<i class="material-icons right">delete</i>
                </button>
              </div>
            </div>
          </li>
        </ul>

        <vue3-simple-typeahead
          id="typeahead_id"
          placeholder="Start writing..."
          :items="this.taskListName"
          :minInputLength="1"
          @selectItem="selectItemEventHandler"
        >
        </vue3-simple-typeahead>
        <label for="typeahead_id">type here⬆️</label>

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
      test: "",
      taskList: [],
      taskListName: [],
      serviceOrderList: [],
      totalCost: 0,
    };
  },
  methods: {
    // search for task and add
    selectItemEventHandler(a) {
      const result = this.taskList.find(({ taskName }) => taskName === a);
      console.log(result.taskName);
      this.$toast.open({
        message: "Task Selected: " + a,
        type: "success",
        duration: 3000,
        dismissible: true,
        position: "bottom",
      });
      const addingToArray = this.serviceOrderList.push({
        taskName: result.taskName,
        cost: result.cost,
      });
      this.totalCost = this.totalCost + result.cost;
      return addingToArray;
    },
    deleteTask(index, cost) {
      this.totalCost = this.totalCost - cost;
      return this.serviceOrderList.splice(index, 1);
    },
    testButton() {
      console.log(this.taskList);
      for (let index in this.taskList) {
        console.log(index, this.taskList.values("taskName"));
      }
    },
  },
  async mounted() {
    window.M.AutoInit();

    // firebase query
    const querySnapshot = await getDocs(collection(firebase.db, "task"));
    querySnapshot.forEach((doc) => {
      this.taskList.push(doc.data());
      this.taskListName.push(doc.data().taskName);
    });
  },
};
</script>
<style>
</style>