<template>
  <div class="success-container">
    <h2>✅ Transfert Réussi !</h2>

    <button @click="fetchInvoice" class="btn" :disabled="loading">
      {{ loading ? "Chargement..." : "Voir Facture" }}
    </button>

    <div v-if="invoice" class="invoice-details">
      <h3>Détails de la Facture</h3>
      <p><strong>ID :</strong> {{ invoice.id }}</p>
      <p><strong>Montant :</strong> {{ invoice.amount }} FCFA</p>
      <p><strong>Client :</strong> {{ invoice.customerName }}</p>
      <p><strong>Email :</strong> {{ invoice.customerEmail }}</p>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      invoice: null,
      errorMessage: "",
      loading: false,
      requestData: {
        amount: "250000",
        customerName: "Toyosi Oyelayo",
        customerEmail: "toyosi@nomail.com",
        merchantCode: "MX6072",
        payableCode: "9405967",
        dueDate: "2604188800000",
        discountPercent: "5.5",
        shippingFee: "70000",
        address: "Address",
      },
    };
  },
  methods: {
    async fetchInvoice() {
      this.loading = true;
      this.errorMessage = "";
      this.invoice = null;

      try {
        const response = await axios.post(
          "http://localhost:3500/api/invoice",
          this.requestData
        ); // Remplace par l'URL de ton API
        this.invoice = response.data;
      } catch (error) {
        this.errorMessage = "Erreur lors de la récupération de la facture.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.success-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

h2 {
  color: green;
}

.btn {
  padding: 10px 15px;
  background-color: #008080;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #006666;
}

.btn:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.invoice-details {
  margin-top: 20px;
  text-align: left;
  background: #f8f8f8;
  padding: 15px;
  border-radius: 5px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
