
<template>
    <div class="form-container">
        <header>
            <h1 class="app-title">Mise à Jour d'une Feuille Google Sheets</h1>
        </header>
        <div class="form-wrapper">
            <form @submit.prevent="submitForm">
                <div class="form-field">
                    <label for="sheet-id">Identifiant ou URL de la Feuille</label>
                    <input type="text" id="sheet-id" v-model="sheetId" required />
                </div>
                <div class="form-field">
                    <label for="columns">Colonnes à Mettre à Jour (séparées par des virgules)</label>
                    <input type="text" id="columns" v-model="columns" required />
                </div>
                <button type="submit" class="submit-button">Mettre à Jour</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            sheetId: "",
            columns: "",
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post("https://example.com/api/update-sheet", {
                    sheetId: this.sheetId,
                    columns: this.columns.split(",").map(col => col.trim()),
                });
                alert("Feuille mise à jour avec succès !");
            } catch (error) {
                alert("Erreur lors de la mise à jour de la feuille : " + error.message);
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
  background: #fffaf0;
  font-family: 'Arial', sans-serif;
}

.app-title {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #6b4226;
}

.form-wrapper {
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 400px;
  margin: auto;
  transform: translateY(20%);
}

.form-header {
  font-size: 20px;
  margin-bottom: 20px;
  color: #6b4226;
}

.form-field {
  margin-bottom: 20px;
  text-align: left;
}

.form-field label {
  font-size: 14px;
  margin-bottom: 8px;
  display: block;
  color: #6b4226;
}

.form-field input,
.form-field textarea,
.form-field select {
  width: 100%;
  padding: 12px;
  border: 2px solid #d4a373;
  border-radius: 30px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
}

.form-field input:focus,
.form-field textarea:focus,
.form-field select:focus {
  border-color: #c19a6b;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.submit-button {
  padding: 10px 20px;
  background-color: #d4a373;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #c19a6b;
}
</style>
