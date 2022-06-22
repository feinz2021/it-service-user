<template>
  <div class="container">
    <div class="row">
      <div class="col s12 l8 push-m2 push-l2">
        <div style="margin-top: 30px"></div>
        <h5 class="center">Order</h5>

        <div class="card-panel">
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
              <tr v-for="(order, index) in order" :key="order.taskName">
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
            onfocus="this.value=''"
          >
          </vue3-simple-typeahead>
          <label for="typeahead_id">type here⬆️</label>
        </div>
        <div></div>
        <button
          style="width: 100%"
          class="btn-large blue waves-effect waves-light"
          @click="saveOrder()"
        >
          Save<i class="material-icons right">save</i>
        </button>
        <div style="margin-top: 10px"></div>
        <router-link
          style="width: 100%"
          to="/orderlist"
          class="waves-effect waves-light btn-large grey"
        >
          Back<i class="material-icons right">arrow_back</i>
        </router-link>

        <div style="margin-bottom: 50px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  collection,
  getDocs,
  setDoc,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import firebase from "../../utilities/firebase";

export default {
  data() {
    return {
      taskList: [],
      taskListName: [],
      // --to save in database
      order: [],
      totalCost: 0,
      date: {},
      status: "ongoing",
      orderId: null,
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
      const addingToArray = this.order.push({
        taskName: result.taskName,
        cost: result.cost,
      });
      this.totalCost = this.totalCost + result.cost;
      return addingToArray;
    },
    deleteTask(index, cost) {
      this.totalCost = this.totalCost - cost;
      return this.order.splice(index, 1);
    },
    // register new order in firebase
    async saveOrder() {
      if (this.order.length === 0) {
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
          await setDoc(doc(firebase.db, "order", this.orderId.toString()), {
            order: this.order,
            totalCost: this.totalCost,
            date: this.date,
            status: this.status,
            email: this.email,
            username: this.username,
          });
          // update the order counter
          await updateDoc(doc(firebase.db, "record", "documentID"), {
            orderID: this.orderId,
          });
          this.$toast.open({
            message: "Order Added Successfully",
            type: "success",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
          this.$router.push("/orderlist");
        } catch (e) {
          console.error("Error adding new order: ", e);
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
    document.title = "New Order";
    window.M.AutoInit();
    // firebase query
    const querySnapshot = await getDocs(collection(firebase.db, "task"));
    querySnapshot.forEach((doc) => {
      this.taskList.push(doc.data());
      this.taskListName.push(doc.data().taskName);
    });
    // order number query
    const docSnap = await getDoc(doc(firebase.db, "record", "documentID"));
    if (docSnap.exists()) {
      this.orderId = docSnap.data().orderID + 1;
      // console.log("orderID " + docSnap.data().orderID);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  },
  computed: {
    email() {
      return this.$store.state.email;
    },
    username() {
      return this.$store.state.username;
    },
  },
};
</script>
<style>
</style>