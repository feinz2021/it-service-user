<template>
  <router-link
    to="/addtask"
    style="color: white"
    class="waves-effect waves-light btn blue"
  >
    Add Task
  </router-link>

 task list:
</template>

<script>
export default {
  methods: {
    addNewTask() {
      console.log("add new task");
      window.location.href = "/addtask";
    },
  },
};
</script>

<style>
</style>