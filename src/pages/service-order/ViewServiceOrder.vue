<template>
  <div class="container">
    <div class="row">
      <div class="col m8 l8 push-m2 push-l2">
        <!-- displaying the selected task -->
                  <div
            class="card-panel white"
          >
        <ul>
          <li v-for="(order, index) in serviceOrder" :key="order.taskName">
            <div class="row">
              <div class="col s9 m9 l9">
                {{ index + 1 + "." }}
                {{ order.taskName }}
                {{ order.cost }}
              </div>
              <div class="col s3 m3 l3">
                <button
                  v-if="isOrderOngoing && !isOrderCompleted"
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
                  </div>

        <vue3-simple-typeahead
          v-if="isOrderOngoing && !isOrderCompleted"
          id="typeahead_id"
          placeholder="Start writing..."
          :items="this.taskListName"
          :minInputLength="1"
          @selectItem="selectItemEventHandler"
        >
        </vue3-simple-typeahead>
        <label v-if="isOrderOngoing && !isOrderCompleted" for="typeahead_id"
          >type here⬆️</label
        >

        <div></div>
        <div class="center-align">
        <button
          v-if="isOrderOngoing && !isOrderCompleted"
          class="btn green waves-effect waves-light"
          @click="saveServiceOrder()"
        >
          Save<i class="material-icons right">save</i>
        </button>
        <button
          v-if="isOrderOngoing && !isOrderCompleted"
          class="btn blue"
          @click="completedOrder()"
        >
          Completed<i class="material-icons right">checkmark</i>
        </button>
        <button
          v-if="isOrderOngoing && !isOrderCompleted"
          class="btn red"
          @click="discardServiceOrder()"
        >
          Discard<i class="material-icons right">drop</i>
        </button>
        <button class="btn grey" @click="cancel()">
          Back<i class="material-icons right">arrow_back</i>
        </button></div>

        <div style="margin-bottom: 50px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import firebase from "../../utilities/firebase";

export default {
  data() {
    return {
      taskList: [],
      taskListName: [],
      // --to save in database
      serviceOrder: [],
      totalCost: 0,
      // date: {},
      isOrderOngoing: false,
      isOrderCompleted: false,
    };
  },
  computed: {
    serviceOrderId() {
      return sessionStorage.getItem("serviceOrderId");
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

    //read database for specific id
    const docRef = doc(firebase.db, "service-order", this.serviceOrderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.serviceOrder = docSnap.data().serviceOrder;
      this.totalCost = docSnap.data().totalCost;
      this.isOrderOngoing = docSnap.data().isOrderOngoing;
      // this.date = docSnap.data().date;
    } else {
      console.log("No such document!");
    }
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
        try {
          const docRef = doc(firebase.db, "service-order", this.serviceOrderId);
          await updateDoc(docRef, {
            serviceOrder: this.serviceOrder,
            totalCost: this.totalCost,
            // date: this.date,
          });
          console.log("service order added with ID: ", docRef.id);
          this.$toast.open({
            message: "Service Order Added Successfully",
            type: "success",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
          window.location.replace("/serviceorderlist");
        } catch (e) {
          console.error("Error adding task: ", e);
        }
      }
    },
    async discardServiceOrder() {
      try {
        const docRef = doc(firebase.db, "service-order", this.serviceOrderId);
        await updateDoc(docRef, {
          isOrderOngoing: false,
        });
        console.log("service order added with ID: ", docRef.id);
        this.$toast.open({
          message: "Service Order Cancelled Successfully",
          type: "success",
          duration: 3000,
          dismissible: true,
          position: "bottom",
        });
        window.location.replace("/serviceorderlist");
      } catch (e) {
        console.error("Error adding task: ", e);
      }
    },
    async completedOrder() {
      try {
        const docRef = doc(firebase.db, "service-order", this.serviceOrderId);
        await updateDoc(docRef, {
          isOrderCompleted: true,
          isOrderOngoing: false,
        });
        console.log("service order completed: ", docRef.id);
        this.$toast.open({
          message: "Service Order Completed",
          type: "success",
          duration: 3000,
          dismissible: true,
          position: "bottom",
        });
        window.location.replace("/serviceorderlist");
      } catch (e) {
        console.error("Error adding task: ", e);
      }
    },
    cancel() {
      window.location.replace("/serviceorderlist");
    },
  },
};
</script>

<style>
</style>