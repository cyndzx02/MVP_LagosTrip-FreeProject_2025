<template>
  <div class="form-container">
    <header>
      <h1 class="app-title">Share File Automatically</h1>
    </header>
    <div class="form-wrapper">
      <h2 class="form-header">Share File</h2>
      <form @submit.prevent="submitForm">
        <div class="form-field">
          <label for="text">file path</label>
          <input type="text" id="text" v-model="file_path" placeholder="Enter the file path" required />
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
      <!-- <button @click="connectToDropbox" class="connect-button">Connect to Dropbox</button> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file_path: "",
    };
  },
  methods: {
    submitForm() {
      if (!this.file_path) {
        alert("Veuillez entrer l'email de l'utilisateur.");
        return;
      }

      if (this.file_path) {
        const reaction = {
          service: "Dropbox",
          name: "Move_to_archives",
          data: {
            file_path: this.file_path,
          },
        };
        this.$router.push({
          path: "/Newarea",
          query: { reaction: JSON.stringify(reaction) },
        });
      } else {
        alert("Veuillez remplir tous les champs.");
      }
    },
    connectToDropbox() {
      const dropboxAuthUrl = 'http://localhost:8080/api/dropbox/auth';

      window.location.href = dropboxAuthUrl;
    }
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

.connect-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.connect-button:hover {
  background-color: #45a049;
}
</style>