<template>
  <div class="form-container">
    <header>
      <h1 class="app-title">Nom de l'application</h1>
    </header>
    <div class="form-wrapper">
      <h2 class="form-header">Monitor a Hashtag or Keyword</h2>
      <form @submit.prevent="submitForm">
        <div class="form-field">
          <label for="hashtag">Hashtag or Keyword</label>
          <input
            type="text"
            id="hashtag"
            v-model="hashtag"
            placeholder="Enter hashtag or keyword"
            required
          />
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
      hashtag: "", // Stocke la saisie utilisateur pour le hashtag ou le mot-clé
    };
  },
  methods: {
    submitForm() {
      if (this.hashtag) {
        const action = {
          service: "twitter",
          name: "Détection d'un nouveau tweet avec un hashtag spécifique",
          data: {
            hashtag: this.hashtag, // Stocke directement la valeur du champ "hashtag"
          },
        };
        this.$router.push({
          path: "/Newarea",
          query: { action: JSON.stringify(action) },
        });
      } else {
        alert("Veuillez remplir tous les champs.");
      }
    },
  },
};
</script>

<style scoped>
/* Styles identiques */
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: #fffaf0;
  font-family: "Arial", sans-serif;
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

.form-field input {
  width: 100%;
  padding: 12px;
  border: 2px solid #d4a373;
  border-radius: 30px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
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
