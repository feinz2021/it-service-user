<template>home page 💣</template>

<script>
import { setDoc, getDoc, doc } from "firebase/firestore";
import firebase from "../utilities/firebase";

export default {
  mounted() {
    document.title = "Homepage";
    window.M.AutoInit();
    const date = new Date();
    const year = date.getFullYear();
    let docYearName = "record" + year;

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
  },
};
</script>

<style>
</style>