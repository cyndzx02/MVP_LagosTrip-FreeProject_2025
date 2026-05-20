<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-xl">
      <div class="card-soft space-y-6 p-6 text-center sm:p-8">
        <div class="flex flex-col items-center gap-2">
          <span class="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">
            <i class="fas fa-check"></i>
          </span>
          <h1 class="text-xl font-bold text-slate-900 sm:text-2xl">
            Transfert réussi !
          </h1>
        </div>

        <button
          type="button"
          class="btn-primary w-full text-base"
          :disabled="loading"
          @click="fetchInvoice"
        >
          {{ loading ? 'Chargement…' : 'Voir la facture' }}
        </button>

        <div v-if="invoice" class="rounded-lg bg-slate-50 p-4 text-left text-sm">
          <h2 class="mb-3 text-base font-bold text-slate-900 sm:text-lg">
            Détails de la facture
          </h2>
          <dl class="space-y-1 text-slate-700">
            <div class="flex justify-between gap-2">
              <dt class="font-semibold">ID</dt>
              <dd class="text-right">{{ invoice.id }}</dd>
            </div>
            <div class="flex justify-between gap-2">
              <dt class="font-semibold">Montant</dt>
              <dd class="text-right">{{ invoice.amount }} FCFA</dd>
            </div>
            <div class="flex justify-between gap-2">
              <dt class="font-semibold">Client</dt>
              <dd class="text-right">{{ invoice.customerName }}</dd>
            </div>
            <div class="flex justify-between gap-2">
              <dt class="font-semibold">Email</dt>
              <dd class="text-right">{{ invoice.customerEmail }}</dd>
            </div>
          </dl>

          <h2 class="mb-2 mt-4 text-base font-bold text-slate-900 sm:text-lg">
            Articles achetés
          </h2>
          <ul class="space-y-2">
            <li
              v-for="(item, idx) in cartItems"
              :key="item.id || `${item.name}-${idx}`"
              class="rounded-md bg-white p-3 shadow-sm"
            >
              <p class="font-semibold text-slate-900">{{ item.name }}</p>
              <p class="text-slate-600">Quantité : {{ item.quantity }}</p>
              <p class="text-slate-600">
                Prix unitaire : {{ item.price }} FCFA
              </p>
              <p class="text-slate-600">
                Total : {{ (item.price * item.quantity).toFixed(2) }} FCFA
              </p>
            </li>
          </ul>
        </div>

        <p v-if="errorMessage" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const API_BANK_URL = process.env.VUE_APP_BANK_API_URL || 'http://localhost:3500'

export default {
  name: 'FactureView',
  data() {
    return {
      cartItems: JSON.parse(localStorage.getItem('cart')) || [],
      invoice: null,
      errorMessage: '',
      loading: false,
      requestData: {
        amount: '',
        customerName: localStorage.getItem('userFullName') || '',
        customerEmail: localStorage.getItem('userEmail') || '',
        merchantCode: process.env.VUE_APP_MERCHANT_CODE || '',
        payableCode: process.env.VUE_APP_PAYABLE_CODE || '',
        dueDate: '',
        discountPercent: '0',
        shippingFee: '0',
        address: localStorage.getItem('userAddress') || '',
      },
    }
  },
  computed: {
    totalPrice() {
      return this.cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2)
    },
  },
  mounted() {
    this.requestData.amount = this.totalPrice
    this.requestData.dueDate = String(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  methods: {
    async fetchInvoice() {
      this.loading = true
      this.errorMessage = ''
      this.invoice = null
      try {
        const response = await axios.post(
          `${API_BANK_URL}/api/createInvoice`,
          this.requestData
        )
        this.invoice = response.data
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message ||
          'Erreur lors de la récupération de la facture.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
