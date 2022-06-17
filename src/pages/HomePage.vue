<template>
  <body style="background-color: powderblue; padding-bottom: 10px">
    <div class="container">
      <br />
      <div class="row">
        <!-- ongoing -->
        <div class="col s12 m4 l4">
          <div class="card-panel white">
            <div class="center"><b>Ongoing</b></div>
            <ul v-for="data1 in orderListOngoing" :key="data1.id">
              <li>
                <div style="margin-left: 15px">
                  ID: {{ data1.id }} <br />
                  {{ currentDateTime(data1.data().date) }}
                  <div
                    v-if="data1.data().status === 'cancelled'"
                    class="red-text"
                  >
                    Order Cancelled
                  </div>
                  <div
                    v-if="data1.data().status === 'completed'"
                    class="green-text"
                  >
                    Order Completed
                  </div>
                  <!-- sOrder for data(taskName, cost) in nested[array] inside the collection of Order -->
                  <table>
                    <tbody>
                      <tr
                        v-for="(data2, index) in data1.data().order"
                        :key="data2"
                      >
                        <td>{{ index + 1 }}. {{ data2.taskName }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- completed -->
        <div class="col s12 m4 l4">
          <div class="card-panel white">
            <div class="center"><b>Completed</b></div>
            <ul v-for="data1 in orderListCompleted" :key="data1.id">
              <li>
                <div style="margin-left: 15px">
                  ID: {{ data1.id }} <br />
                  {{ currentDateTime(data1.data().date) }}
                  <div
                    v-if="data1.data().status === 'cancelled'"
                    class="red-text"
                  >
                    Order Cancelled
                  </div>
                  <div
                    v-if="data1.data().status === 'completed'"
                    class="green-text"
                  >
                    Order Completed
                  </div>
                  <!-- sOrder for data(taskName, cost) in nested[array] inside the collection of Order -->
                  <table>
                    <tbody>
                      <tr
                        v-for="(data2, index) in data1.data().order"
                        :key="data2"
                      >
                        <td>{{ index + 1 }}. {{ data2.taskName }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- cancelled -->
        <div class="col s12 m4 l4">
          <div class="card-panel white">
            <div class="center"><b>Cancelled</b></div>
            <ul v-for="data1 in orderListCancelled" :key="data1.id">
              <li>
                <div style="margin-left: 15px">
                  ID: {{ data1.id }} <br />
                  {{ currentDateTime(data1.data().date) }}
                  <div
                    v-if="data1.data().status === 'cancelled'"
                    class="red-text"
                  >
                    Order Cancelled
                  </div>
                  <div
                    v-if="data1.data().status === 'completed'"
                    class="green-text"
                  >
                    Order Completed
                  </div>
                  <!-- sOrder for data(taskName, cost) in nested[array] inside the collection of Order -->
                  <table>
                    <tbody>
                      <tr
                        v-for="(data2, index) in data1.data().order"
                        :key="data2"
                      >
                        <td>{{ index + 1 }}. {{ data2.taskName }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- weekly chart -->
      <div class="row">
        <div class="col s12 m12 l12">
          <div class="card-panel">
            <Bar
              :chart-options="incomePerWeekChartOptions"
              :chart-data="incomePerWeekChartData"
              :height="incomePerWeekChartHeight"
            />
          </div>
        </div>
      </div>

      <!-- monthly chart -->
      <div class="row">
        <div class="col s12 m12 l12">
          <div class="card-panel">
            <Bar
              :chart-options="incomePerMonthChartOptions"
              :chart-data="incomePerMonthChartData"
              :height="incomePerMonthChartHeight"
            />
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import {
  setDoc,
  getDoc,
  doc,
  collection,
  orderBy,
  query,
  limit,
  where,
  getDocs,
} from "firebase/firestore";
import firebase from "../utilities/firebase";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      // income per month chart
      incomePerMonthChartHeight: 200,
      incomePerMonthChartOptions: {
        plugins: {
          // legend is the dataset label
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Total Income per Month",
          },
        },
      },
      incomePerMonthChartData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "",
            backgroundColor: [
              "#f44336",
              "#e91e63",
              "#9c27b0",
              "#673ab7",
              "#3f51b5",
              "#2196f3",
              "#03a9f4",
              "#00bcd4",
              "#009688",
              "#4caf50",
              "#8bc34a",
              "#cddc39",
            ],
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },

      // income per week chart
      incomePerWeekChartHeight: 200,
      incomePerWeekChartOptions: {
        plugins: {
          // legend is the dataset label
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Total Income per Week",
          },
        },
      },
      incomePerWeekChartData: {
        labels: [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
        ],
        datasets: [
          {
            label: "",
            backgroundColor: [
              "#2196f3",
              "#03a9f4",
              "#00bcd4",
              "#009688",
              "#4caf50",
              "#8bc34a",
              "#cddc39",
            ],
            data: [0, 0, 0, 0, 0, 0, 0],
          },
        ],
      },

      // data
      loadingOngoingData: false,
      orderListOngoing: [],
      orderListCompleted: [],
      orderListCancelled: [],
      incomePerWeek: [],
    };
  },
  async mounted() {
    document.title = "Homepage";
    window.M.AutoInit();
    const date = new Date();
    const year = date.getFullYear();
    let docYearName = "record" + year;

    // check if record exists, importing sales record
    getDoc(doc(firebase.db, "record", docYearName)).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Record Exists.");
        // assigning array for chartjs
        const chartjsbar = this.incomePerMonthChartData.datasets[0].data;
        for (let i = 0; i < chartjsbar.length; i++) {
          this.incomePerMonthChartData.datasets[0].data[i] =
            docSnap.data().byMonthIncome[i];
        }
      } else {
        console.log("Record Doesn't Exists.");
        setDoc(doc(firebase.db, "record", docYearName), {
          year: year,
          yearIncome: 0,
          byMonthIncome: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        });
      }
    });
    // check if documentID exists
    getDoc(doc(firebase.db, "record", "documentID")).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("documentID counter Exists.");
      } else {
        console.log("documentID counter Doesn't Exists.");
        setDoc(doc(firebase.db, "record", "documentID"), {
          orderID: 0,
        });
      }
    });

    // latest 3 ongoing order
    const querySnapshotOngoing = await getDocs(
      query(
        collection(firebase.db, "order"),
        orderBy("date", "desc"),
        where("status", "==", "ongoing"),
        limit(3)
      )
    );
    querySnapshotOngoing.forEach((doc) => {
      this.orderListOngoing.push(doc);
    });
    // latest 3 ongoing completed
    const querySnapshotCompleted = await getDocs(
      query(
        collection(firebase.db, "order"),
        orderBy("date", "desc"),
        where("status", "==", "completed"),
        limit(3)
      )
    );
    querySnapshotCompleted.forEach((doc) => {
      this.orderListCompleted.push(doc);
    });
    // latest 3 ongoing cancelled
    const querySnapshotCancelled = await getDocs(
      query(
        collection(firebase.db, "order"),
        orderBy("date", "desc"),
        where("status", "==", "cancelled"),
        limit(3)
      )
    );
    querySnapshotCancelled.forEach((doc) => {
      this.orderListCancelled.push(doc);
    });
  },
  methods: {
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
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
};
</script>

<style>
</style>