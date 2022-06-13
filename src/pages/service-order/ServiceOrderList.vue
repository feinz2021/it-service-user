<template>
  <div class="container">
    <div style="margin-top: 10px"></div>

    <!-- data for data(date and totalcost) in collection -->

    <div class="row">
      <div class="col s12 m12 l12">
        <h5 class="center">Service Order List</h5>
        <router-link
          to="/newserviceorder"
          style="color: white; width: 100%"
          class="waves-effect waves-light btn blue"
        >
          New Service Order<i class="material-icons right">add</i>
        </router-link>

        <ul v-for="data1 in serviceOrderList" :key="data1.id">
          <div
            class="card-panel white fingerPointer"
            @click="gotoViewTask(data1.id)"
          >
            <li>
              <div style="margin-left: 15px">
                Service Order ID: {{ data1.id }} <br />
                Service Order Date: {{ currentDateTime(data1.data().date) }}
                <div
                  v-if="
                    !data1.data().isOrderOngoing &&
                    !data1.data().isOrderCompleted
                  "
                  class="red-text flow-text"
                >
                  Order Cancelled
                </div>
                <div
                  v-if="data1.data().isOrderCompleted"
                  class="green-text flow-text"
                >
                  Order Completed
                </div>
                <!-- sOrder for data(taskName, cost) in nested[array] inside the collection of serviceOrder -->
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(data2, index) in data1.data().serviceOrder"
                      :key="data2"
                    >
                      <td>{{ index + 1 }}. {{ data2.taskName }}</td>
                      <td>RM {{ data2.cost }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import firebase from "../../utilities/firebase";

export default {
  data() {
    return {
      serviceOrderList: [],
    };
  },
  async mounted() {
    window.M.AutoInit();
    const querySnapshot = await getDocs(
      query(collection(firebase.db, "service-order"), orderBy("date", "desc"))
    );
    querySnapshot.forEach((doc) => {
      this.serviceOrderList.push(doc);
    });
  },
  methods: {
    gotoViewTask(data) {
      console.log(data);
      sessionStorage.setItem("serviceOrderId", data);
      this.$router.push("/viewserviceorder");
    },
    testButton(a) {
      console.log(a);
    },
    // date time
    currentDateTime(serviceOrderDate) {
      const current = serviceOrderDate.toDate();
      const date =
        current.getDate() +
        "/" +
        (current.getMonth() + 1) +
        "/" +
        current.getFullYear();
      const time =
        current.getHours() +
        ":" +
        current.getMinutes() +
        ":" +
        current.getSeconds();
      const dateTime = date + " " + time;
      return dateTime;
    },
  },
};
</script>

<style>
.fingerPointer {
  cursor: pointer;
}
</style>