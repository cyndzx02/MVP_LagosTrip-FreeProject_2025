<template>
  <div class="form-container">
    <header>
      <h1 class="app-title">Nom de l'application</h1>
    </header>
    <div class="form-wrapper">
      <h2 class="form-header">Ajouter une réaction</h2>
      <form @submit.prevent="submitReactionForm">
        <div class="form-field">
          <label for="text">Description</label>
          <textarea
            id="text"
            v-model="description"
            placeholder="Entrez votre description"
            required
            class="textarea-input"
          ></textarea>
          <p v-if="errorMessage && !description.trim()" class="error-message">
            La description est obligatoire.
          </p>
        </div>
        <div class="form-field">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Entrez votre email"
            required
          />
          <p v-if="errorMessage && !validateEmail(email.trim())" class="error-message">
            Veuillez entrer un email valide.
          </p>
        </div>
        <button type="submit" class="submit-button">Envoyer</button>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: "",
      email: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    submitReactionForm() {
      const trimmedDescription = this.description.trim();
      const trimmedEmail = this.email.trim();

      // Validation
      if (!trimmedDescription || !this.validateEmail(trimmedEmail)) {
        this.errorMessage = "Veuillez remplir tous les champs correctement.";
        this.successMessage = "";
        return;
      }

      // Création de l'objet de réaction
      const reaction = {
        service: "Timer",
        name: "mail_rappel",
        data: {
          Description: trimmedDescription,
          Email: trimmedEmail,
        },
      };

      // Redirection avec les données de la réaction
      this.$router.push({
        path: "/NewArea",
        query: {
          reaction: JSON.stringify(reaction),
        },
      });

      // Réinitialisation des champs
      this.successMessage = "Réaction enregistrée avec succès !";
      this.errorMessage = "";
      this.description = "";
      this.email = "";
    },
  },
};
</script>


<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f7f7f7;
  font-family: Arial, sans-serif;
}

.app-title {
  margin: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.form-wrapper {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.form-header {
  font-size: 18px;
  margin-bottom: 10px;
  color: #444;
}

.form-field {
  margin-bottom: 15px;
}

.form-field label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
}

.form-field input,
.form-field textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-field textarea {
  resize: vertical;
  height: 80px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.submit-button:hover {
  background: #0056b3;
}

.error-message {
  color: red;
  font-size: 12px;
}

.success-message {
  color: green;
  font-size: 12px;
}
</style>
