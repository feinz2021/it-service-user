<template>
  <div class="container">
    <div class="row">
      <div class="col s12 l8 push-m2 push-l2">
        <div style="margin-top: 30px"></div>
        <h5>Service Order</h5>

        <!-- displaying the selected task -->
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Cost</th>
              <th>Option</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(order, index) in serviceOrder" :key="order.taskName">
              <td>{{ index + 1 + "." }} {{ order.taskName }}</td>
              <td>RM {{ order.cost }}</td>
              <td>
                <button
                  style="width: 100%"
                  class="btn waves-effect waves-light red"
                  @click="deleteTask(index, order.cost)"
                >
                  Delete<i class="material-icons right">delete</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>


        <vue3-simple-typeahead
          id="typeahead_id"
          placeholder="Start writing..."
          :items="this.taskListName"
          :minInputLength="1"
          @selectItem="selectItemEventHandler"
        >
        </vue3-simple-typeahead>
        <label for="typeahead_id">type here⬆️</label>

        <div></div>
        <button
          style="width: 100%"
          class="btn blue waves-effect waves-light"
          @click="saveServiceOrder()"
        >
          Save<i class="material-icons right">save</i>
        </button>
        <div style="margin-top: 10px"></div>
        <router-link
          style="width: 100%"
          to="/serviceorderlist"
          class="waves-effect waves-light btn grey"
        >
          Back<i class="material-icons right">arrow_back</i>
        </router-link>

        <div style="margin-bottom: 50px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, addDoc } from "firebase/firestore";
import firebase from "../../utilities/firebase";

export default {
  data() {
    return {
      taskList: [],
      taskListName: [],
      // --to save in database
      serviceOrder: [],
      totalCost: 0,
      date: {},
      isOrderOngoing: true,
      isOrderCompleted: false,
      isOrderCancelled: false
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
      const addingToArray = this.serviceOrder.push({
        taskName: result.taskName,
        cost: result.cost,
      });
      this.totalCost = this.totalCost + result.cost;
      return addingToArray;
    },
    deleteTask(index, cost) {
      this.totalCost = this.totalCost - cost;
      return this.serviceOrder.splice(index, 1);
    },
    // save service order in firebase
    async saveServiceOrder() {
      if (this.serviceOrder.length === 0) {
        this.$toast.open({
          message: "Please Add Task",
          type: "error",
          duration: 3000,
          dismissible: true,
          position: "bottom",
        });
      } else {
        this.date = new Date();
        try {
          const docRef = await addDoc(
            collection(firebase.db, "service-order"),
            {
              serviceOrder: this.serviceOrder,
              totalCost: this.totalCost,
              date: this.date,
              isOrderOngoing: this.isOrderOngoing,
              isOrderCompleted: this.isOrderCompleted,
              isOrderCancelled: this.isOrderCancelled
            }
          );
          console.log("service order added with ID: ", docRef.id);
          this.$toast.open({
            message: "Service Order Added Successfully",
            type: "success",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
          this.$router.push("/serviceorderlist");
        } catch (e) {
          console.error("Error adding new service order: ", e);
        }
      }
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