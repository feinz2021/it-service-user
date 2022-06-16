<template>
  <div class="container">
    <div style="margin-top: 10px"></div>

    <!-- data for data(date and totalcost) in collection -->

    <div class="row">
      <div class="col s12 m12 l12">
        <h5 class="center">Order List</h5>

        <!-- filter option -->
        <div class="row">
          <div class="input-field col s6 m6 l6">
            <select v-model="sortBy" @change="sortByQuery">
              <option value="" disabled>Sort By</option>
              <option value="desc" selected>Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
            <label>Sort By</label>
          </div>
          <div class="input-field col s6 m6 l6">
            <select v-model="monthRange" @change="monthRangeQuery">
              <option value="" disabled>Sort By</option>
              <option value="1">1 Month</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="9">9 Months</option>
              <option value="12">1 Year</option>
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
              <option value="all" selected>All</option>
            </select>
            <label>Display Limit</label>
          </div>
        </div>
        <!-- end of filter option -->
        <div class="input-field">
          <label for="searchId">Enter Order ID Here 🔢</label>
          <input
            ref="inputRef"
            v-model="searchIdV"
            id="searchId"
            type="number"
            @input="searchIdQuery"
          />
        </div>
        <router-link
          to="/neworder"
          style="color: white; width: 100%"
          class="waves-effect waves-light btn-large blue"
        >
          New Order<i class="material-icons right">add</i>
        </router-link>

        <ul v-for="data1 in orderList" :key="data1.id">
          <div
            class="card-panel white fingerPointer"
            @click="gotoViewTask(data1.id)"
          >
            <li>
              <div style="margin-left: 15px">
                <small><i>{{ username }}</i></small> <br />
                Order ID: {{ data1.id }} <br />
                Order Date: {{ currentDateTime(data1.data().date) }}
                <div
                  v-if="data1.data().status === 'cancelled'"
                  class="red-text flow-text"
                >
                  Order Cancelled
                </div>
                <div
                  v-if="data1.data().status === 'completed'"
                  class="green-text flow-text"
                >
                  Order Completed
                </div>
                <!-- sOrder for data(taskName, cost) in nested[array] inside the collection of Order -->
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(data2, index) in data1.data().order"
                      :key="data2"
                    >
                      <td>{{ index + 1 }}. {{ data2.taskName }}</td>
                      <td>RM {{ data2.cost }}</td>
                    </tr>
                  </tbody>
                  <tr>
                    <td><b>Total</b></td>
                    <td>
                      <b>RM {{ data1.data().totalCost }}</b>
                    </td>
                  </tr>
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
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import firebase from "../../utilities/firebase";

export default {
  data() {
    return {
      orderList: [],
      sortBy: "desc",
      monthRange: "1",
      status: "ongoing",
      displayLimit: "100",
      searchIdV: "",
    };
  },
  async mounted() {
    this.$refs.inputRef.focus();
    document.title = "Order List";
    window.M.AutoInit();
    const today = new Date();
    // default 1 month range
    const dateRange = new Date(this.createDate(0, -1, 0));
    const querySnapshot = await getDocs(
      query(
        collection(firebase.db, "order"),
        orderBy("date", this.sortBy),
        limit(100),
        where("status", "==", "ongoing"),
        where("date", ">=", dateRange),
        where("date", "<=", today)
      )
    );
    querySnapshot.forEach((doc) => {
      this.orderList.push(doc);
    });
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
  methods: {
    // displaylimit ---------------------------
    async statusQuery(e) {
      // clear searchId field
      this.searchIdV = "";
      // date range
      const today = new Date();
      const monthNumber = parseInt(this.monthRange);
      const dateRange = new Date(this.createDate(0, -monthNumber, 0));
      // reset array first
      this.orderList = [];
      const limAll = this.displayLimit;
      const lim = parseInt(this.displayLimit);
      const stat = e.target.value;
      if (limAll === "all") {
        if (stat === "all") {
          const querySnapshot = await getDocs(
            query(
              collection(firebase.db, "order"),
              orderBy("date", this.sortBy),
              where("date", ">=", dateRange),
              where("date", "<=", today)
            )
          );
          querySnapshot.forEach((doc) => {
            this.orderList.push(doc);
          });
        } else {
          const querySnapshot = await getDocs(
            query(
              collection(firebase.db, "order"),
              orderBy("date", this.sortBy),
              where("status", "==", stat),
              where("date", ">=", dateRange),
              where("date", "<=", today)
            )
          );
          querySnapshot.forEach((doc) => {
            this.orderList.push(doc);
          });
        }
      } else if (stat === "all") {
        const querySnapshot = await getDocs(
          query(
            collection(firebase.db, "order"),
            orderBy("date", this.sortBy),
            limit(lim),
            where("date", ">=", dateRange),
            where("date", "<=", today)
          )
        );
        querySnapshot.forEach((doc) => {
          this.orderList.push(doc);
        });
      } else {
        const querySnapshot = await getDocs(
          query(
            collection(firebase.db, "order"),
            orderBy("date", this.sortBy),
            where("status", "==", stat),
            limit(lim),
            where("date", ">=", dateRange),
            where("date", "<=", today)
          )
        );
        querySnapshot.forEach((doc) => {
          this.orderList.push(doc);
        });
      }
    },
    async displayLimitQuery(e) {
      // clear searchId field
      this.searchIdV = "";
      // date range
      const today = new Date();
      const monthNumber = parseInt(this.monthRange);
      const dateRange = new Date(this.createDate(0, -monthNumber, 0));
      // reset array first
      this.orderList = [];
      const lim = parseInt(e.target.value);
      if (e.target.value === "all") {
        if (this.status === "all") {
          const querySnapshot = await getDocs(
            query(
              collection(firebase.db, "order"),
              orderBy("date", this.sortBy),
              where("date", ">=", dateRange),
              where("date", "<=", today)
            )
          );
          querySnapshot.forEach((doc) => {
            this.orderList.push(doc);
          });
        } else {
          const querySnapshot = await getDocs(
            query(
              collection(firebase.db, "order"),
              orderBy("date", this.sortBy),
              where("status", "==", this.status),
              where("date", ">=", dateRange),
              where("date", "<=", today)
            )
          );
          querySnapshot.forEach((doc) => {
            this.orderList.push(doc);
          });
        }
      } else if (this.status === "all") {
        const querySnapshot = await getDocs(
          query(
            collection(firebase.db, "order"),
            orderBy("date", this.sortBy),
            limit(lim),
            where("date", ">=", dateRange),
            where("date", "<=", today)
          )
        );
        querySnapshot.forEach((doc) => {
          this.orderList.push(doc);
        });
      } else {
        const querySnapshot = await getDocs(
          query(
            collection(firebase.db, "order"),
            orderBy("date", this.sortBy),
            limit(lim),
            where("status", "==", this.status),
            where("date", ">=", dateRange),
            where("date", "<=", today)
          )
        );
        querySnapshot.forEach((doc) => {
          this.orderList.push(doc);
        });
      }
    },
    async sortByQuery(e) {
      // clear searchId field
      this.searchIdV = "";
      //datetime
      const today = new Date();
      const monthNumber = parseInt(this.monthRange);
      const dateRange = new Date(this.createDate(0, -monthNumber, 0));
      // reset array first
      this.orderList = [];
      const limAll = this.displayLimit;
      const lim = parseInt(this.displayLimit);
      const stat = this.status;
      const sortBy = e.target.value;
      if (limAll === "all") {
        if (stat === "all") {
          const querySnapshot = await getDocs(
            query(
              collection(firebase.db, "order"),
              orderBy("date", sortBy),
              where("date", ">=", dateRange),
              where("date", "<=", today)
            )
          );
          querySnapshot.forEach((doc) => {
            this.orderList.push(doc);
          });
        } else {
          const querySnapshot = await getDocs(
            query(
              collection(firebase.db, "order"),
              orderBy("date", sortBy),
              where("status", "==", stat),
              where("date", ">=", dateRange),
              where("date", "<=", today)
            )
          );
          querySnapshot.forEach((doc) => {
            this.orderList.push(doc);
          });
        }
      } else if (stat === "all") {
        const querySnapshot = await getDocs(
          query(
            collection(firebase.db, "order"),
            orderBy("date", sortBy),
            limit(lim),
            where("date", ">=", dateRange),
            where("date", "<=", today)
          )
        );
        querySnapshot.forEach((doc) => {
          this.orderList.push(doc);
        });
      } else {
        const querySnapshot = await getDocs(
          query(
            collection(firebase.db, "order"),
            orderBy("date", sortBy),
            where("status", "==", stat),
            limit(lim),
            where("date", ">=", dateRange),
            where("date", "<=", today)
          )
        );
        querySnapshot.forEach((doc) => {
          this.orderList.push(doc);
        });
      }
    },
    async monthRangeQuery(e) {
      // clear searchId field
      this.searchIdV = "";
      // date range
      const today = new Date();
      const monthNumber = parseInt(e.target.value);
      const dateRange = new Date(this.createDate(0, -monthNumber, 0));
      console.log("dateRange" + dateRange);
      // reset array first
      this.orderList = [];
      const limAll = this.displayLimit;
      const lim = parseInt(this.displayLimit);
      const stat = this.status;
      const sortBy = this.sortBy;
      if (limAll === "all") {
        if (stat === "all") {
          const querySnapshot = await getDocs(
            query(
              collection(firebase.db, "order"),
              orderBy("date", sortBy),
              where("date", ">=", dateRange),
              where("date", "<=", today)
            )
          );
          querySnapshot.forEach((doc) => {
            this.orderList.push(doc);
          });
        } else {
          const querySnapshot = await getDocs(
            query(
              collection(firebase.db, "order"),
              orderBy("date", sortBy),
              where("status", "==", stat),
              where("date", ">=", dateRange),
              where("date", "<=", today)
            )
          );
          querySnapshot.forEach((doc) => {
            this.orderList.push(doc);
          });
        }
      } else if (stat === "all") {
        const querySnapshot = await getDocs(
          query(
            collection(firebase.db, "order"),
            orderBy("date", sortBy),
            limit(lim),
            where("date", ">=", dateRange),
            where("date", "<=", today)
          )
        );
        querySnapshot.forEach((doc) => {
          this.orderList.push(doc);
        });
      } else {
        const querySnapshot = await getDocs(
          query(
            collection(firebase.db, "order"),
            orderBy("date", sortBy),
            where("status", "==", stat),
            limit(lim),
            where("date", ">=", dateRange),
            where("date", "<=", today)
          )
        );
        querySnapshot.forEach((doc) => {
          this.orderList.push(doc);
        });
      }
    },
    async searchIdQuery(e) {
      // specifically search for an id so no need filter
      const searchId = e.target.value;
      // reset array first
      this.orderList = [];
      if (searchId === "") {
        // date range
        const today = new Date();
        const monthNumber = parseInt(this.monthRange);
        const dateRange = new Date(this.createDate(0, -monthNumber, 0));
        console.log("dateRange" + dateRange);

        const limAll = this.displayLimit;
        const lim = parseInt(this.displayLimit);
        const stat = this.status;
        const sortBy = this.sortBy;
        if (limAll === "all") {
          if (stat === "all") {
            const querySnapshot = await getDocs(
              query(
                collection(firebase.db, "order"),
                orderBy("date", sortBy),
                where("date", ">=", dateRange),
                where("date", "<=", today)
              )
            );
            querySnapshot.forEach((doc) => {
              this.orderList.push(doc);
            });
          } else {
            const querySnapshot = await getDocs(
              query(
                collection(firebase.db, "order"),
                orderBy("date", sortBy),
                where("status", "==", stat),
                where("date", ">=", dateRange),
                where("date", "<=", today)
              )
            );
            querySnapshot.forEach((doc) => {
              this.orderList.push(doc);
            });
          }
        } else if (stat === "all") {
          const querySnapshot = await getDocs(
            query(
              collection(firebase.db, "order"),
              orderBy("date", sortBy),
              limit(lim),
              where("date", ">=", dateRange),
              where("date", "<=", today)
            )
          );
          querySnapshot.forEach((doc) => {
            this.orderList.push(doc);
          });
        } else {
          const querySnapshot = await getDocs(
            query(
              collection(firebase.db, "order"),
              orderBy("date", sortBy),
              where("status", "==", stat),
              limit(lim),
              where("date", ">=", dateRange),
              where("date", "<=", today)
            )
          );
          querySnapshot.forEach((doc) => {
            this.orderList.push(doc);
          });
        }
      } else {
        const docRef = doc(firebase.db, "order", searchId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.orderList.push(docSnap);
        } else {
          console.log("No such document!");
        }
      }
    },
    // end of displaylimit -----------------------
    gotoViewTask(data) {
      console.log(data);
      sessionStorage.setItem("orderId", data);
      this.$router.push("/vieworder");
    },
    // date time
    currentDateTime(orderDate) {
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
    // create date function (-6, 0, 0) for 6 days ago
    createDate(days, months, years) {
      let date = new Date();
      date.setDate(date.getDate() + days);
      date.setMonth(date.getMonth() + months);
      date.setFullYear(date.getFullYear() + years);
      return date;
    },
  },
};
</script>

<style>
.fingerPointer {
  cursor: pointer;
}
</style>