<template>
  <div class="container-transfert">
    <form @submit.prevent="submitForm" class="form-container-transfert">
      <header class="transfert">
        <h2 class="transfert">
          Transfert d'Argent
        </h2>
      </header>

      <!-- Barre de progression -->
      <div class="progress-bar-transfert">
        <button
          class="steps-transfert active-transfert"
          v-for="(step, index) in steps"
          :key="index"
          :class="{ active: currentStep === index }"
          @click="currentStep = index"
        >
          {{ index + 1 }}
        </button>
      </div>

      <hr class="progress-separator-transfert" />

      <!-- Étape 1 : Informations principales -->
      <section class="" v-if="currentStep === 0">
        <div class="input-group">
          <label for="transferCode">Code de Transfert</label>
          <input
            type="text"
            id="transferCode"
            v-model="transferDetails.transferCode"
            required
          />
        </div>

        <div class="input-group">
          <label for="mac">MAC</label>
          <input type="text" id="mac" v-model="transferDetails.mac" required />
        </div>
      </section>

      <!-- Étape 2 : Termination -->
      <section v-if="currentStep === 1">
        <div class="input-group">
          <label for="amount">Montant</label>
          <input
            type="text"
            id="amount"
            v-model="transferDetails.termination.amount"
            required
          />
        </div>

        <div class="input-group">
          <label for="accountNumber">Numéro du Compte</label>
          <input
            type="text"
            id="accountNumber"
            v-model="
              transferDetails.termination.accountReceivable.accountNumber
            "
            required
          />
        </div>

        <div class="input-group">
          <label for="accountType">Type du Compte</label>
          <input
            type="text"
            id="accountType"
            v-model="transferDetails.termination.accountReceivable.accountType"
            required
          />
        </div>
      </section>

      <!-- Étape 3 : Informations de l'expéditeur -->
      <section v-if="currentStep === 2">
        <div class="input-group">
          <label for="phone">Téléphone</label>
          <input
            type="text"
            id="phone"
            v-model="transferDetails.sender.phone"
            required
          />
        </div>

        <div class="input-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="transferDetails.sender.email"
            required
          />
        </div>

        <div class="input-group">
          <label for="lastname">Nom</label>
          <input
            type="text"
            id="lastname"
            v-model="transferDetails.sender.lastname"
            required
          />
        </div>

        <div class="input-group">
          <label for="othernames">Prénoms</label>
          <input
            type="text"
            id="othernames"
            v-model="transferDetails.sender.othernames"
            required
          />
        </div>
      </section>

      <!-- Étape 4 : Initiation -->
      <section v-if="currentStep === 3">
        <div class="input-group">
          <label for="initiatingEntityCode">Code d'Entité</label>
          <input
            type="text"
            id="initiatingEntityCode"
            v-model="transferDetails.initiatingEntityCode"
            required
          />
        </div>

        <div class="input-group">
          <label for="channel">Canal</label>
          <input
            type="text"
            id="channel"
            v-model="transferDetails.initiation.channel"
            required
          />
        </div>
      </section>

      <!-- Étape 5 : Bénéficiaire -->
      <section v-if="currentStep === 4">
        <div class="input-group">
          <label for="beneficiaryLastName">Nom du Bénéficiaire</label>
          <input
            type="text"
            id="beneficiaryLastName"
            v-model="transferDetails.beneficiary.lastname"
            required
          />
        </div>

        <div class="input-group">
          <label for="beneficiaryOtherNames">Prénoms</label>
          <input
            type="text"
            id="beneficiaryOtherNames"
            v-model="transferDetails.beneficiary.othernames"
            required
          />
        </div>
      </section>

      <!-- Boutons de navigation -->
      <div class="navigation-buttons-transfert">
        <button
          class="button-transfer prev"
          v-if="currentStep > 0"
          @click="prevStep"
        >
            Précédent  
        </button>
        <button
          class="button-transfer next"
          v-if="currentStep < steps.length - 1"
          @click="nextStep"
        >
            Suivant  
        </button>
        <button
          class="button-transfer send"
          v-if="currentStep === steps.length - 1"
          type="submit"
        >
          Envoyer
        </button>
      </div>

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
      currentStep: 0,
      steps: [1, 2, 3, 4, 5],
      message: "",
      transferDetails: {
        transferCode: "",
        mac: "",
        termination: {
          amount: "", // Montant initialisé vide
          accountReceivable: {
            accountNumber: "",
            accountType: "",
          },
          entityCode: "044",
          currencyCode: "566",
          paymentMethodCode: "AC",
          countryCode: "NG",
        },
        sender: {
          phone: "",
          email: localStorage.getItem("userEmail") || "", // Charger l'email depuis localStorage
          lastname: "",
          othernames: "",
        },
        initiatingEntityCode: "",
        initiation: {
          amount: "100000",
          currencyCode: "566",
          paymentMethodCode: "CA",
          channel: "",
        },
        beneficiary: {
          lastname: "",
          othernames: "",
        },
      },
    };
  },
  computed: {
    totalPrice() {
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      console.log(cartItems);
      return cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);
    },
  },
  watch: {
    "transferDetails.sender.email": function (newEmail) {
      localStorage.setItem("userEmail", newEmail); // Sauvegarde de l'email en temps réel
    },
  },
  mounted() {
    this.transferDetails.termination.amount = this.totalPrice; // Preremplir le montant
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.steps.length - 1) this.currentStep++;
    },
    prevStep() {
      if (this.currentStep > 0) this.currentStep--;
    },
    async submitForm() {
      console.log(
        "Payload envoyé:",
        JSON.stringify(this.transferDetails, null, 2)
      );
      try {
        const response = await axios.post(
          "http://localhost:3500/api/transfer",
          this.transferDetails,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response);
        this.message = "Transfert réussi !";
      } catch (error) {
        this.message = "Erreur lors du transfert.";
      }
    },
  },
};
</script>

<style scoped>
.transfert-head {
  text-decoration: none;
  color: black;
}

.progress-bar-transfert {
  display: flex;
  gap: 40px;
  justify-content: center;
}

.progress-separator-transfert {
  width: 90%;
  border: none;
  height: 2px;
  background: linear-gradient(to right, rgb(6, 6, 66), #345050, #084747);
}

.steps-transfert {
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

.steps-transfert.active-transfert {
  background-color: rgb(14, 14, 100);
  color: white;
}

.steps-transfert:hover {
  background-color: rgb(6, 6, 212);
  color: white;
}

/* Réutilisation du style du premier formulaire */
.container-transfert {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  margin-left: 9cm;
  display: flex;
  text-decoration: none;
  margin-top: 3%;
  justify-content: center;
  align-items: center;

  background-color: #f8f8f8;
  padding: 10px;
  box-sizing: border-box;
}

.form-container-tranfert {
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

.btn-transfert {
  padding: 10px 20px;
  background-color: #0a2850;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-transfert:hover {
  background-color: #0a2850;
}

.button-transfert {
  background-color: #0a2850 !important;
  /* gap: 2%; */
}
.navigation-buttons-transfert .button-transfert {
  padding: 10px;
  color: #0c0d0d;
  background-color: #0a2850;
}

.next {
  background-color: #0a2850;
  padding: 2%;
  transition:  0.3s;
  border-radius: 25%;
  cursor: pointer;
  color: white;
  display: flex;
  gap: 2%;
  margin-bottom: 1%;
  margin-top: 1%;
}

.prev{
  background-color: #0a2850;
  padding: 2%;
  transition:  0.3s;
  border-radius: 25%;
  cursor: pointer;
  color: white;
  display: flex;
  margin-bottom: 1%;
  margin-top: 1%;
}

.send{
  background-color: #0a2850;
  padding: 2%;
  transition:  0.3s;
  border-radius: 25%;
  cursor: pointer;
  color: white;
  display: flex;

}
.navigation-buttons-transfert{
  padding-bottom: 10%;
  /* background-color: gray; */
}

.progress-bar-transfert .button-transfert {
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
  /* background-color: #0a2850; */
  transition:  0.3s;
}
</style>
