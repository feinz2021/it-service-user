<template>
  service order list
  <router-link
    to="/newserviceorder"
    style="color: white"
    class="waves-effect waves-light btn blue"
  >
    New Service Order
  </router-link>

  service order list:

  <!-- data for data(date and totalcost) in collection -->
  <ul v-for="data1 in serviceOrderList" :key="data1.id">
    <li @click="gotoViewTask(data1.id)">
      <div style="margin-left: 15px">
        {{ data1.data().date }}
        <!-- sOrder for data(taskName, cost) in nested[array] inside the collection of serviceOrder -->
        <ul v-for="data2 in data1.data().serviceOrder" :key="data2">
          <li>
            {{ data2.taskName }}
            {{ data2.cost }}
          </li>
        </ul>
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
      serviceOrderList: [],
    };
  },
  async mounted() {
    const querySnapshot = await getDocs(
      collection(firebase.db, "service-order")
    );
    querySnapshot.forEach((doc) => {
      this.serviceOrderList.push(doc);
    });
  },
  methods: {
    gotoViewTask(data) {
      console.log(data);
      sessionStorage.setItem("serviceOrderId", data);
      window.location.href = "/viewserviceorder";
    },
  },
};
</script>

<style>
</style>