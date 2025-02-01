<template>
    <div class="container">
      <form @submit.prevent="submitForm" class="form-container">
        <header>
          <i class="fas fa-arrow-left"></i>
          <h2>Transfert d'Argent</h2>
        </header>
  
        <!-- Barre de progression -->
        <div class="progress-bar">
          <button v-for="(step, index) in steps" 
                  :key="index" 
                  :class="{ active: currentStep === index }"
                  @click="currentStep = index">
            {{ index + 1 }}
          </button>
        </div>
  
        <hr class="progress-separator">
  
        <!-- Étape 1 : Informations principales -->
        <section v-if="currentStep === 0">
          <div class="input-group">
            <label for="transferCode">Code de Transfert</label>
            <input type="text" id="transferCode" v-model="transferDetails.transferCode" required>
          </div>
  
          <div class="input-group">
            <label for="mac">MAC</label>
            <input type="text" id="mac" v-model="transferDetails.mac" required>
          </div>
        </section>
  
        <!-- Étape 2 : Termination -->
        <section v-if="currentStep === 1">
          <div class="input-group">
            <label for="amount">Montant</label>
            <input type="text" id="amount" v-model="transferDetails.termination.amount" required>
          </div>
  
          <div class="input-group">
            <label for="accountNumber">Numéro du Compte</label>
            <input type="text" id="accountNumber" v-model="transferDetails.termination.accountReceivable.accountNumber" required>
          </div>
  
          <div class="input-group">
            <label for="accountType">Type du Compte</label>
            <input type="text" id="accountType" v-model="transferDetails.termination.accountReceivable.accountType" required>
          </div>
        </section>
  
        <!-- Étape 3 : Informations de l'expéditeur -->
        <section v-if="currentStep === 2">
          <div class="input-group">
            <label for="phone">Téléphone</label>
            <input type="text" id="phone" v-model="transferDetails.sender.phone" required>
          </div>
  
          <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="transferDetails.sender.email" required>
          </div>
  
          <div class="input-group">
            <label for="lastname">Nom</label>
            <input type="text" id="lastname" v-model="transferDetails.sender.lastname" required>
          </div>
  
          <div class="input-group">
            <label for="othernames">Prénoms</label>
            <input type="text" id="othernames" v-model="transferDetails.sender.othernames" required>
          </div>
        </section>
  
        <!-- Étape 4 : Initiation -->
        <section v-if="currentStep === 3">
          <div class="input-group">
            <label for="initiatingEntityCode">Code d'Entité</label>
            <input type="text" id="initiatingEntityCode" v-model="transferDetails.initiatingEntityCode" required>
          </div>
  
          <div class="input-group">
            <label for="channel">Canal</label>
            <input type="text" id="channel" v-model="transferDetails.initiation.channel" required>
          </div>
        </section>
  
        <!-- Étape 5 : Bénéficiaire -->
        <section v-if="currentStep === 4">
          <div class="input-group">
            <label for="beneficiaryLastName">Nom du Bénéficiaire</label>
            <input type="text" id="beneficiaryLastName" v-model="transferDetails.beneficiary.lastname" required>
          </div>
  
          <div class="input-group">
            <label for="beneficiaryOtherNames">Prénoms</label>
            <input type="text" id="beneficiaryOtherNames" v-model="transferDetails.beneficiary.othernames" required>
          </div>
        </section>
  
        <!-- Boutons de navigation -->
        <div class="navigation-buttons">
          <button v-if="currentStep > 0" @click="prevStep">Précédent</button>
          <button v-if="currentStep < steps.length - 1" @click="nextStep">Suivant</button>
          <button v-if="currentStep === steps.length - 1" type="submit">Envoyer</button>
        </div>
  
        <!-- Message de réponse -->
        <p v-if="message" class="response-message">{{ message }}</p>
      </form>
    </div>
</template>
  
<script>
import axios from "axios";
/* eslint-disable */
export default {
  data() {
    return {
      currentStep: 0,
      steps: [1, 2, 3, 4, 5],
      message: "",
      transferDetails: {
        transferCode: "",
        mac: "",
        termination: {
          amount: "",
          accountReceivable: {
            accountNumber: "",
            accountType: ""
          },
          entityCode: "",
          currencyCode: "",
          paymentMethodCode: "",
          countryCode: ""
        },
        sender: {
          phone: "",
          email: "",
          lastname: "",
          othernames: ""
        },
        initiatingEntityCode: "",
        initiation: {
          amount: "",
          currencyCode: "",
          paymentMethodCode: "",
          channel: ""
        },
        beneficiary: {
          lastname: "",
          othernames: ""
        }
      }
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.steps.length - 1) this.currentStep++;
    },
    prevStep() {
      if (this.currentStep > 0) this.currentStep--;
    },
    async submitForm() {
      console.log("Payload envoyé:", JSON.stringify(this.transferDetails, null, 2));
      try {
        const response = await axios.post(
          "http://localhost:3500/api/transfer",
          this.transferDetails,
          {
            headers: { "Content-Type": "application/json" }
          }
        );
        console.log(response)
        this.message = "Transfert réussi !";
      } catch (error) {
        this.message = "Erreur lors du transfert.";
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
    background-color: #0a2850;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0a2850;
  }
  .navigation-buttons button{
    padding: 10px;
    color: #0c0d0d;
  }

  .progress-bar button {
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
</style>
  
  