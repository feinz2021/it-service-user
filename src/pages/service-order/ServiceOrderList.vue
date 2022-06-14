<template>
  <div class="container">
    <div style="margin-top: 10px"></div>

    <!-- data for data(date and totalcost) in collection -->

    <div class="row">
      <div class="col s12 m12 l12">
        <h5 class="center">Service Order List</h5>

        <!-- filter option -->
        <div class="row">
          <div class="input-field col s6 m6 l6">
            <select v-model="sortBy">
              <option value="" disabled>Sort By</option>
              <option value="desc" selected>Descending</option>
              <option value="asc">Ascending</option>
            </select>
            <label>Sort By</label>
          </div>
          <div class="input-field col s6 m6 l6">
            <select v-model="dayRange">
              <option value="" disabled>Sort By</option>
              <option value="7days" selected>7 Days</option>
              <option value="14days">14 Days</option>
              <option value="1month">1 Month</option>
              <option value="3months">3 Months</option>
              <option value="6months">6 Months</option>
              <option value="1year">1 Year</option>
            </select>
            <label>Day Range</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6 m6 l6">
            <select v-model="status" @change="statusQuery">
              <option value="" disabled>Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="all" selected>All</option>
            </select>
            <label>Status</label>
          </div>
          <div class="input-field col s6 m6 l6">
            <select v-model="displayLimit" @change="displayLimitQuery">
              <option value="" disabled>Sort By</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100" selected>100</option>
              <option value="all">All</option>
            </select>
            <label>Display Limit</label>
          </div>
        </div>
        <!-- end of filter option -->

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
                    data1.data().isOrderCancelled
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
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import firebase from "../../utilities/firebase";

export default {
  data() {
    return {
      serviceOrderList: [],
      sortBy: "desc",
      dayRange: "7days",
      status: "all",
      displayLimit: "100",
      isOrderCompleted: null,
      isOrderOngoing: null,
      isOrderCancelled: null
    };
  },
  async mounted() {
    window.M.AutoInit();
    const querySnapshot = await getDocs(
      query(
        collection(firebase.db, "service-order"),
        orderBy("date", this.sortBy),
        limit(100),
      )
    );
    querySnapshot.forEach((doc) => {
      this.serviceOrderList.push(doc);
    });
  },
  computed: {},
  methods: {
    // displaylimit ---------------------------
    async statusQuery(e){

    },
    async displayLimitQuery(e) {
      let value = e.target.value;
      if (value === "all") {
        const querySnapshot = await getDocs(
          query(
            collection(firebase.db, "service-order"),
            orderBy("date", this.sortBy),
          )
        );
        querySnapshot.forEach((doc) => {
          this.serviceOrderList.push(doc);
        });
      } else if (value === "10") {
        const querySnapshot = await getDocs(
          query(
            collection(firebase.db, "service-order"),
            orderBy("date", this.sortBy),
            limit(10),
          )
        );
        querySnapshot.forEach((doc) => {
          this.serviceOrderList.push(doc);
        });
      }
    },
    // end of displaylimit -----------------------
    gotoViewTask(data) {
      console.log(data);
      sessionStorage.setItem("serviceOrderId", data);
      this.$router.push("/viewserviceorder");
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