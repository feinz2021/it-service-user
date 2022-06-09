<template>
  newserviceorder

  <div class="container">
    <div class="row">
      <div class="col m8 l8 push-m2 push-l2">
        <h5>Service Order</h5>
        <ul>
          <li v-for="(order, index) in serviceOrderList" :key="order.id">
            <div class="row">
              <div class="col s9 m9 l9">
                {{ order.data().taskName }}
              </div>
              <div class="col s3 m3 l3">
                <button
                  style="width: 100%"
                  class="btn waves-effect waves-light red"
                  @click="deleteTask(index)"
                >
                  Del<i class="material-icons right">delete</i>
                </button>
              </div>
            </div>
          </li>
        </ul>

        <form @submit.prevent="addTask()">
          <div class="row">
            <div class="input-field col s9 m9 l9">
              <input
                id="autocomplete-input"
                class="autocomplete"
                style="font-size: 24px"
                @keypress.enter="submit"
                type="text"
                ref="searchTask"
              />
            </div>
            <div class="col s3 m3 l3">
              <button
                style="width: 100%"
                class="btn waves-effect waves-light"
                @click="submit"
              >
                Add<i class="material-icons right">save</i>
              </button>
            </div>
          </div>
        </form>

        <div style="margin-bottom: 50px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import firebase from "../../utilities/firebase";

export default {
  data() {
    return {
      taskList: [],
      serviceOrderList: [],
    };
  },
  methods: {
    // search for task and add
    addTask() {},
  },
  async mounted() {
    window.M.AutoInit();

    // materializecss autocomplete
    var elems = document.querySelectorAll(".autocomplete");
    var countries = ["rome", "london", "new york"];
    var data = {};
    for (const key of countries) {
      data[key] = null;
    }
    var options = {
      data: data,
    };
    window.M.Autocomplete.init(elems, options);


    // firebase query
    const querySnapshot = await getDocs(collection(firebase.db, "task"));
    querySnapshot.forEach((doc) => {
      this.taskList.push(doc);
    });
  },
};
</script>

<style>
</style>