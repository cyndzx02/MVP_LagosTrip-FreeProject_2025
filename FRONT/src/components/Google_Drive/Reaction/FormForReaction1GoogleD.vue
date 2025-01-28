<template>
  <div class="form-container">
    <header>
      <h1 class="app-title">Move File to Another Folder</h1>
    </header>
    <div class="form-wrapper">
      <h2 class="form-header">Specify File log_content</h2>
      <form @submit.prevent="submitForm">
        <div class="form-field">
          <label for="log_content">log_folder</label>
          <input type="text" id="log_content" v-model="log_folder" placeholder="Enter the log folder" required />
        </div>
        <div class="form-field">
          <label for="log_content">log_content </label>
          <input type="text" id="log_content" v-model="log_content" placeholder="Enter the log content"
            required />
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
      <!-- <button @click="connectToDropbox" class="connect-button">Connect to Dropbox</button> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      log_folder: "",
      log_content: "",
    };
  },
  methods: {
    submitForm() {
      if (!this.log_content || !this.log_folder) {
        alert("Veuillez entrer le chemin du dossier de log_content.");
        return;
      }

      if (this.log_folder && this.log_content) {
        const reaction = {
          service: "Dropbox",
          name: "create_log_file",
          data: {
            log_folder: this.log_folder,
            log_content: this.log_content,
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
    
    // connectToDropbox() {
    //   const dropboxAuthUrl = 'http://localhost:8080/api/dropbox/auth';
    //   window.location.href = dropboxAuthUrl;
    // }
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