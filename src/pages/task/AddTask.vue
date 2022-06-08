<template>
  <div class="input-field">
    <input v-model="taskName" id="task_name" type="text" />
    <label for="task_name">Task Name</label>
  </div>

  <div class="input-field">
    <input v-model="cost" id="cost" type="number" />
    <label for="cost">Cost</label>
  </div>

  <button class="waves-effect waves-light btn blue">Save</button>
</template>

<script>
export default {
  data(){
    return{
      taskName: "",
      cost: "",
    }
  },
  mounted() {
    window.M.AutoInit();
  },
};
</script>

<style>
</style>