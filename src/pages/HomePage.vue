<template>home page 💣</template>

<script>
import { setDoc, getDoc, doc } from "firebase/firestore";
import firebase from "../utilities/firebase";

export default {
  mounted() {
    const date = new Date();
    const year = date.getFullYear();
    let docName = "record" + year;

    getDoc(doc(firebase.db, "record", docName)).then((docSnap) => {
      if (docSnap.exists()) {
        console.log("Record Exists.");
      } else {
        console.log("Record Doesn't Exists.");
        setDoc(doc(firebase.db, "record", docName), {
          year: year,
          yearIncome: 0,
          byMonthIncome: [
            { january: 0 },
            { february: 0 },
            { march: 0 },
            { april: 0 },
            { may: 0 },
            { june: 0 },
            { july: 0 },
            { august: 0 },
            { september: 0 },
            { october: 0 },
            { november: 0 },
            { december: 0 },
          ],
        });
      }
    });
  },
};
</script>

<style>
</style>