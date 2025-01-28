<template>
  <div class="form-container">
    <header>
      <h1 class="app-title">Trigger a Specific Action</h1>
    </header>
    <div class="form-wrapper">
      <h2 class="form-header">Configure Action and Target Service</h2>
      <form @submit.prevent="submitForm">
        <div class="form-field">
          <label for="action">Action to Perform</label>
          <input type="text" id="action" v-model="action" placeholder="Enter the specific action (e.g., run a script)"
            required />
        </div>
        <div class="form-field">
          <label for="service">Target Service</label>
          <select id="service" v-model="service" required>
            <option value="" disabled>Select a target service</option>
            <option value="Google Drive">Google Drive</option>
            <option value="Google Sheets">Google Sheets</option>
            <option value="Twitter">Twitter</option>
            <option value="RSS Feeds">RSS Feeds</option>
            <option value="Email">Email</option>
            <option value="Timer">Timer</option>
            <option value="Task Manager">Task Manager</option>
          </select>
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action: "",
      service: "",
    };
  },
  methods: {
    submitForm() {
      const reaction = {
        service: "Timer",
        name: "Déclenchement d'une action prédéfinie",
        data: {
          action: this.action,
          targetservice: this.service,
        },
      };

      // Redirection avec les données de la réaction
      this.$router.push({
        path: "/NewArea",
        query: {
          reaction: JSON.stringify(reaction),
        },
      });
    },
  },
};
</script>

<style scoped>
/* Styling similaire aux précédents */
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

.form-field input,
.form-field select {
  width: 100%;
  padding: 10px;
  border: 2px solid #a1887f;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.form-field input:focus,
.form-field select:focus {
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