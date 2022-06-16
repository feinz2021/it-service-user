<template>
  home page 💣
  <div class="container">
    <Bar :chart-data="chartData" />
  </div>
</template>

<script>
import { setDoc, getDoc, doc } from "firebase/firestore";
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
      january: 3,
      february: 4,
      march: 5,
      chartData: {
        labels: ["January", "February", "March"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20, 12],
          },
        ],
      },
    };
  },
  mounted() {
    document.title = "Homepage";
    window.M.AutoInit();
    const date = new Date();
    const year = date.getFullYear();
    let docYearName = "record" + year;

    // check if record exists
    getDoc(doc(firebase.db, "record", docYearName)).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Record Exists.");
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

    // assigning array for chartjs
    //  console.log(this.chartData.datasets[0].data.length);
    const testArray = [3,4,5];
    const chartjsbar = this.chartData.datasets[0].data;
    for (let i = 0; i < chartjsbar.length; i++) {
      // console.log(chartjsbar[i]);
      this.chartData.datasets[0].data[i] = testArray[i];
    }
  },
};
</script>

<style>
</style>