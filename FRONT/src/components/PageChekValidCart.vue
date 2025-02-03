<template>
    <div class="container-validate">
      <form @submit.prevent="submitBankForm" class="form-container-validate">
        <header class="info-head">
          <router-link to="/ResumeCommand" class="info-head">
          <h2 class="info-head"><i class="info-head fas fa-arrow-left"></i> Informations Bancaires</h2>
        </router-link>
      </header>
  
        <!-- Barre de progression -->
        <div class="progress-bar-validate">
          <button class="step-payCheck">1</button>
          <button class="step-payCheck active-payCheck">2</button>
          <button class="step-payCheck">3</button>
        </div>
  
        <!-- Séparateur -->
        <hr class="progress-separator-validate">
  
        <!-- Formulaire de saisie -->
        <section class="bank-info-validate">
          <div class="input-group">
            <label for="accountId">ID du Compte</label>
            <input type="text" id="accountId" v-model="cardDetails.accountId" required>
          </div>
  
          <div class="input-group">
            <label for="bankCode">Code Banque</label>
            <input type="text" id="bankCode" v-model="cardDetails.bankCode" required>
          </div>
        </section>
  
        <button class="btn-validate" type="submit">Envoyer</button>
  
        <!-- Message de réponse -->
        <p v-if="message" class="response-message-validate">{{ message }}</p>
      </form>
    </div>
</template>
  
<script>
  import axios from "axios";
/* eslint-disable */
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
     // Afficher une alerte avec la réponse du serveur
    //  alert(`cart validé au nom de : ${JSON.stringify(response.data.AccountName)}`);
    this.$router.push({ name: 'TransferPage' });
  } catch (error) {
    this.message = "Erreur lors de l'envoi des données.";
  }
}

    }
  };
</script>
  
<style scoped>

.progress-bar-validate{
  display: flex;
  gap: 40px;
  justify-content: center;
}

.progress-separator-validate {
  width: 90%;
  border: none;
  height: 2px;
  background: linear-gradient(to right, rgb(6, 6, 66), #345050, #084747);
}

.step-payCheck {
  width: 40px;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s;
}

.step-payCheck.active-payCheck  {
  background-color: rgb(14, 14, 100);;
  color: white;
}

.step-payCheck:hover {
  background-color: rgb(6, 6, 212);;
  color: white;
}

.info-head{
  text-decoration: none;
  color: black;
}
  /* Réutilisation du style du premier formulaire */
  .container-validate {
    padding: 20px;
  }
  
  .form-container-validate {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .input-group-validate {
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
  
  .response-message-validate {
    margin-top: 10px;
    font-size: 14px;
    color: green;
  }
  
  .btn-validate {
    padding: 10px 20px;
    background-color: rgb(14, 14, 100);;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-validate:hover {
    background-color: #006666;
  }
</style>
  