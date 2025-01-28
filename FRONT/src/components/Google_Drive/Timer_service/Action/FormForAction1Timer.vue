<template>
  <div class="form-container">
    <header>
      <h1 class="app-title">Nom de l'application</h1>
    </header>
    <div class="form-wrapper">
      <h2 class="form-header">Select Date, Time</h2>
      <form @submit.prevent="submitForm">
        <div class="form-field">
          <label for="date">Choose a Date</label>
          <input type="text" id="date" placeholder="YYYY-MM-DD" v-model="date" required />
        </div>
        <div class="form-field">
          <label for="time">Choose a Time</label>
          <input type="time" id="time" v-model="time" required />
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      date: "", // Date sélectionnée
      time: "", // Heure sélectionnée
    };
  },
  methods: {
    // isValidDate(date) {
    //   const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    //   return dateRegex.test(date); // Validation basique du format
    // },
    submitForm() {

      // if (!this.isValidDate(this.date)) {
      //   alert("La date sélectionnée n'est pas valide !");
      //   return;
      // }
      if (!this.time) {
        alert("Veuillez sélectionner une heure !");
        return;
      }
      // Vérifier que la combinaison date et heure est dans le futur
      const localDateTime = `${this.date}T${this.time}`;
      const now = new Date();
      if (new Date(localDateTime) <= now) {
        alert("La date et l'heure doivent être dans le futur !");
        return;
      }



      if (this.time && this.date) {
        const action = {
          service: "Timer",
          name: "creer_rappel",
          data: {
            date: this.date,
            time: this.time,
          },
        };
        this.$router.push({
          path: "/Newarea",
          query: { action: JSON.stringify(action) },
        });
      } else {
        alert("Veuillez remplir tous les champs.");
      }

      // Réinitialiser les champs après envoi
      this.date = "";
      this.time = "";

    }
  }
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
  margin-top: 100px;
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

.form-field input {
  width: 100%;
  padding: 12px;
  border: 2px solid #d4a373;
  border-radius: 30px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
  font-family: 'Arial', sans-serif;
}

.form-field input:focus {
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
