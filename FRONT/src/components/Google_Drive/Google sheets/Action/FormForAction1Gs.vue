<template>
  <div class="form-container">
    <header>
      <h1 class="app-title">Tableur Watcher</h1>
    </header>
    <div class="form-wrapper">
      <h2 class="form-header">Track New Row in Spreadsheet</h2>
      <form @submit.prevent="submitForm">
        <div class="form-field">
          <label for="spreadsheet-id">Spreadsheet ID or URL</label>
          <input type="text" id="spreadsheet-id" v-model="spreadsheetId" placeholder="Enter spreadsheet ID or URL"
            required />
        </div>
        <div class="form-field">
          <label for="sheet-name">Sheet Name</label>
          <input type="text" id="sheet-name" v-model="sheetName" placeholder="Enter specific sheet name" required />
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      spreadsheetId: "",
      sheetName: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        // Logique pour envoyer les données via une requête HTTP POST
        const response = await axios.post(
          "http://localhost:8080/api/service/timer/createReminder",
          {
            spreadsheetId: this.spreadsheetId,
            sheetName: this.sheetName,
          }
        );

        console.log("Réponse du serveur :", response.data);
        if (response.status === 200) {
          this.$router.push({
            path: '/Newarea',
            query: { title: "Envoi automatique d'une réponse" },
          });

          alert("Tracking configuration successfully submitted!");
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi des données :", error);

        // Gérer les erreurs
        if (error.response) {
          alert(
            `Erreur: ${error.response.data.message || "Une erreur est survenue."}`
          );
        } else {
          alert("Impossible de se connecter au serveur.");
        }
      }
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