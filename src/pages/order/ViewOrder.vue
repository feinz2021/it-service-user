<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m8 l8 push-m2 push-l2">
        <!-- modal -->
        <div id="modalComplete" class="modal">
          <div class="modal-content">
            <h4>Mark as Complete?</h4>
            <div style="margin-top: 10px"></div>
            <button
              style="width: 100%"
              v-if="status === 'ongoing'"
              class="btn-large waves-effect waves-light green modal-close"
              @click="completeOrder()"
            >
              Complete<i class="material-icons right">check</i>
            </button>
            <div style="margin-top: 20px"></div>
            <button
              style="width: 100%"
              v-if="status === 'ongoing'"
              class="btn-large waves-effect waves-light grey modal-close"
            >
              Back<i class="material-icons right">keyboard_arrow_left</i>
            </button>
          </div>
        </div>
        <div id="modalCancel" class="modal">
          <div class="modal-content">
            <h4>Cancel Order?</h4>
            <div style="margin-top: 10px"></div>
            <button
              style="width: 100%"
              v-if="status === 'ongoing'"
              class="btn-large waves-effect waves-light red modal-close"
              @click="cancelOrder()"
            >
              Cancel Order<i class="material-icons right">cancel</i>
            </button>
            <div style="margin-top: 20px"></div>
            <button
              style="width: 100%"
              v-if="status === 'ongoing'"
              class="btn-large waves-effect waves-light grey modal-close"
            >
              Back<i class="material-icons right">keyboard_arrow_left</i>
            </button>
          </div>
        </div>
      </div>
      <!-- end of modal -->

      <!-- displaying the selected task -->
      <div class="card-panel white">
        <h5 class="center">View Order</h5>
        <div style="margin-top: 20px"></div>
        <div id="printMe">
          <small
            ><i>{{ usernameOrder }}</i></small
          >
          <br />
          Order ID:
          {{ orderId }}
          <br />
          Order Date:
          {{ date }}
          <div v-if="status === 'cancelled'" class="red-text flow-text">
            Order Cancelled
          </div>
          <div v-else-if="status === 'completed'" class="green-text flow-text">
            Order Completed
          </div>
          <div v-else>
            <!-- nothing displayed, for loading purpose as default is null -->
          </div>
          <table class="highlight">
            <thead>
              <tr>
                <th>Item</th>
                <th>Cost</th>
                <th
                  v-if="status === 'completed' && status === 'cancelled'"
                  id="hide-from-print"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, index) in order" :key="order.taskName">
                <td>{{ index + 1 }}. {{ order.taskName }}</td>
                <td>RM {{ order.cost }}</td>
                <td v-if="status === 'ongoing'" id="hide-from-print">
                  <button
                    style="width: 100%"
                    class="btn-small waves-effect waves-light red"
                    @click="deleteTask(index, order.cost)"
                  >
                    Del<i class="material-icons right">delete</i>
                  </button>
                </td>
              </tr>
            </tbody>
            <tr>
              <td><b>Total</b></td>
              <td>
                <b>RM {{ totalCost }}</b>
              </td>
            </tr>
          </table>
          <div id="hide-from-print">
            <vue3-simple-typeahead
              v-if="status === 'ongoing'"
              id="typeahead_id"
              placeholder="Start writing..."
              :items="this.taskListName"
              :minInputLength="1"
              @selectItem="selectItemEventHandler"
              onfocus="this.value=''"
            >
            </vue3-simple-typeahead>

            <label v-if="status === 'ongoing'" for="typeahead_id"
              >type here⬆️</label
            >
          </div>
        </div>
      </div>

      <div></div>
      <button
        style="width: 100%"
        v-if="status === 'ongoing'"
        class="btn-large blue waves-effect waves-light"
        @click="saveOrder()"
      >
        Save<i class="material-icons right">save</i>
      </button>

      <div style="margin-top: 10px"></div>
      <button
        style="width: 100%"
        v-if="status === 'ongoing'"
        class="btn-large waves-effect waves-light green modal-trigger"
        href="#modalComplete"
      >
        Complete<i class="material-icons right">check</i>
      </button>
      <div style="margin-top: 10px"></div>
      <button
        style="width: 100%"
        v-if="status === 'ongoing'"
        class="btn-large waves-effect waves-light red modal-trigger"
        href="#modalCancel"
      >
        Cancel Order<i class="material-icons right">cancel</i>
      </button>
      <div style="margin-top: 10px"></div>
      <button
        style="width: 100%"
        class="btn-large waves-effect waves-light cyan"
        v-print="printObj"
      >
        Print<i class="material-icons right">print</i>
      </button>
      <div style="margin-top: 10px"></div>
      <router-link
        style="width: 100%"
        to="/orderlist"
        class="waves-effect waves-light btn-large grey"
      >
        Back<i class="material-icons right">keyboard_arrow_left</i>
      </router-link>

      <div style="margin-bottom: 50px"></div>
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
      usernameOrder: "",
      taskList: [],
      taskListName: [],
      // --to save in database
      order: [],
      totalCost: 0,
      date: {},
      status: "",

      // for printing
      printObj: {
        id: "printMe",
        popTitle: "Print",
      },

      // --to save in record
      byMonthIncome: [],
      yearIncome: 0,
    };
  },
  computed: {
    orderId() {
      return sessionStorage.getItem("orderId");
    },
    username() {
      return this.$store.state.username;
    },
  },
  async mounted() {
    document.title = "View Order";
    window.M.AutoInit();
    // firebase query for taskList
    const querySnapshot = await getDocs(collection(firebase.db, "task"));
    querySnapshot.forEach((doc) => {
      this.taskList.push(doc.data());
      this.taskListName.push(doc.data().taskName);
    });

    //read database for specific id for order
    const docRef = doc(firebase.db, "order", this.orderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.order = docSnap.data().order;
      this.totalCost = docSnap.data().totalCost;
      this.date = this.dateTime(docSnap.data().date);
      this.status = docSnap.data().status;
      this.usernameOrder = docSnap.data().username;
    } else {
      console.log("No such document!");
    }

    // read record document
    const date = new Date();
    const year = date.getFullYear();
    let docYearName = "record" + year;

    const recRef = doc(firebase.db, "record", docYearName);
    const recSnap = await getDoc(recRef);

    if (recSnap.exists()) {
      this.byMonthIncome = recSnap.data().byMonthIncome;
      this.yearIncome = recSnap.data().yearIncome;
    } else {
      console.log("No record document!");
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
    // save order in firebase
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
        try {
          const docRef = doc(firebase.db, "order", this.orderId);
          await updateDoc(docRef, {
            order: this.order,
            totalCost: this.totalCost,
          });
          console.log("order added with ID: ", docRef.id);
          this.$toast.open({
            message: "Order Updated Successfully",
            type: "success",
            duration: 3000,
            dismissible: true,
            position: "bottom",
          });
          this.$router.push("/orderlist");
        } catch (e) {
          console.error("Error adding task: ", e);
        }
      }
    },
    async cancelOrder() {
      try {
        const docRef = doc(firebase.db, "order", this.orderId);
        await updateDoc(docRef, {
          status: "cancelled",
        });
        console.log("order added with ID: ", docRef.id);
        this.$toast.open({
          message: "Order Cancelled Successfully",
          type: "success",
          duration: 3000,
          dismissible: true,
          position: "bottom",
        });
        this.$router.push("/orderlist");
      } catch (e) {
        console.error("Error adding task: ", e);
      }
    },
    async completeOrder() {
      try {
        // date completed and day
        const dateCompleted = new Date();
        const dateNumber = dateCompleted.getDate();

        // update order document
        const docRef = doc(firebase.db, "order", this.orderId);
        await updateDoc(docRef, {
          status: "completed",
          dateCompleted: dateCompleted,
          dateNumber: dateNumber,
        });
        // update record document
        // update monthly total income
        const dateM = new Date();
        const month = dateM.getMonth();
        this.byMonthIncome[month] = this.byMonthIncome[month] + this.totalCost;
        console.log("byMonthIncome: " + this.byMonthIncome[month]);

        // update yearly total income
        this.yearIncome = this.yearIncome + this.totalCost;
        console.log("yearIncome: " + this.yearIncome);

        const dateY = new Date();
        const year = dateY.getFullYear();
        let docYearName = "record" + year;

        const recRef = doc(firebase.db, "record", docYearName);
        await updateDoc(recRef, {
          byMonthIncome: this.byMonthIncome,
          yearIncome: this.yearIncome,
        });

        /////
        console.log("order completed: ", docRef.id);
        this.$toast.open({
          message: "Order Completed",
          type: "success",
          duration: 3000,
          dismissible: true,
          position: "bottom",
        });
        this.$router.push("/orderlist");
      } catch (e) {
        console.error("Error adding task: ", e);
      }
    },
    cancel() {
      window.location.replace("/orderlist");
    },
    // date time
    dateTime(orderDate) {
      const current = orderDate.toDate();
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
@media print {
  #hide-from-print {
    display: none;
  }
  @page {
    margin-top: 0;
    margin-bottom: 0;
  }
  body {
    padding-top: 72px;
    padding-bottom: 72px;
  }
}
</style>