<template>
    <div class="form-container">
      <header>
        <h1 class="app-title">Service Notification</h1>
      </header>
      <div class="form-wrapper">
        <h2 class="form-header">Configure Your Notification</h2>
        <form @submit.prevent="submitForm">
          <div class="form-field">
            <label for="details">Notification Details</label>
            <textarea
              id="details"
              v-model="notificationDetails"
              placeholder="Enter the notification details"
              required
            ></textarea>
          </div>
          <div class="form-field">
            <label for="service">Target Service</label>
            <select id="service" v-model="selectedService" required>
              <option value="" disabled selected>Select a service</option>
              <option value="Google Sheets">Google Sheets</option>
              <option value="Twitter">Twitter</option>
              <option value="RSS Feeds">RSS Feeds</option>
              <option value="Google Drive">Google Drive</option>
              <option value="Notifications">Notifications</option>
              <option value="Timer">Timer</option>
              <option value="Email">Email</option>
              <option value="Task Managers">Task Managers</option>
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
        notificationDetails: "",
        selectedService: "",
      };
    },
    methods: {
      submitForm() {
        console.log({
          notificationDetails: this.notificationDetails,
          selectedService: this.selectedService,
        });
        alert("Notification details and service submitted!");
      },
    },
  };
  </script>
  
  <style scoped>
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
  
  .form-field textarea {
    width: 100%;
    padding: 10px;
    border: 2px solid #a1887f;
    border-radius: 5px;
    font-size: 14px;
    outline: none;
    resize: none;
    height: 80px;
    transition: border-color 0.3s;
  }
  
  .form-field textarea:focus {
    border-color: #d7ccc8;
  }
  
  .form-field select {
    width: 100%;
    padding: 10px;
    border: 2px solid #a1887f;
    border-radius: 5px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s;
  }
  
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
  