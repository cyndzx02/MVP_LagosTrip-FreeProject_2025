<template>
    <div class="container">
      <form @submit.prevent="submitBankForm" class="form-container">
        <header>
          <i class="fas fa-arrow-left"></i>
          <h2>Informations Bancaires</h2>
        </header>
  
        <!-- Barre de progression -->
        <div class="progress-bar">
          <button class="step">1</button>
          <button class="step active">2</button>
          <button class="step">3</button>
        </div>
  
        <!-- Séparateur -->
        <hr class="progress-separator">
  
        <!-- Formulaire de saisie -->
        <section class="bank-info">
          <div class="input-group">
            <label for="accountId">ID du Compte</label>
            <input type="text" id="accountId" v-model="cardDetails.accountId" required>
          </div>
  
          <div class="input-group">
            <label for="bankCode">Code Banque</label>
            <input type="text" id="bankCode" v-model="cardDetails.bankCode" required>
          </div>
        </section>
  
        <button class="btn" type="submit">Envoyer</button>
  
        <!-- Message de réponse -->
        <p v-if="message" class="response-message">{{ message }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";

  export default {
    data() {
      return {
        cardDetails: {
          accountId: "",
          bankCode: ""
        },
        message: ""
      };
    },
    methods: {
      async submitBankForm() {
  try {
    const response = await axios.get("http://localhost:3500/api/check-card", {
      params: this.cardDetails,  // Passer les données dans params
      headers: { "Content-Type": "application/json" }
    });
    console.log(response);
    this.message = "Données envoyées avec succès !";
    this.$router.push({ name: 'TransferPage' });
  } catch (error) {
    this.message = "Erreur lors de l'envoi des données.";
  }
}

    }
  };
  </script>
  
  <style scoped>
  /* Réutilisation du style du premier formulaire */
  .container {
    padding: 20px;
  }
  
  .form-container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .response-message {
    margin-top: 10px;
    font-size: 14px;
    color: green;
  }
  
  .btn {
    padding: 10px 20px;
    background-color: #008080;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #006666;
  }
  </style>
  