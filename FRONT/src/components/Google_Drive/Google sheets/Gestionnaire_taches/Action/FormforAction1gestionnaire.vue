<template>
  <div class="form-container">
    <header>
      <h1 class="app-title">Task Creation</h1>
    </header>
    <div class="form-wrapper">
      <h2 class="form-header">Create New Task</h2>
      <form @submit.prevent="submitForm">
        <div class="form-field">
          <label for="task_name">Task Name</label>
          <input type="text" id="task_name" v-model="taskName" placeholder="Enter task name" required />
        </div>
        <div class="form-field">
          <label for="project_name">Project Name</label>
          <input type="text" id="project_name" v-model="projectName" placeholder="Enter project name" required />
        </div>
        <button type="submit" class="submit-button">Create Task</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskName: "",
      projectName: "",
    };
  },
  methods: {
    submitForm() {
      if (!this.taskName || !this.projectName) {
        alert('Please fill out all fields.');
        return;
      }
      const action = {
        service: "todoist",
        name: "NewTaskCreated",
        data: {
          name: this.taskName,
          project: this.projectName,
        },
      };

      this.$router.push({
        path: "/Newarea",
        query: { action: JSON.stringify(action) },
      });
    },
  },
};
</script>

<style scoped>
/* Style commun aux formulaires */
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: #f9f4ef;
  font-family: 'Arial', sans-serif;
}

.app-title {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #5d4037;
}

.form-wrapper {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
  margin-top: 10%;
}

.form-header {
  font-size: 18px;
  margin-bottom: 20px;
  color: #5d4037;
}

.form-field {
  margin-bottom: 20px;
  text-align: left;
}

.form-field label {
  font-size: 14px;
  margin-bottom: 8px;
  display: block;
  color: #795548;
}

.form-field input {
  width: 100%;
  padding: 10px;
  border: 2px solid #a1887f;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.form-field input:focus {
  border-color: #d7ccc8;
}

.submit-button {
  padding: 10px 20px;
  background-color: #a1887f;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #8d6e63;
}
</style>
