<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-xl">
      <form
        class="card-soft space-y-6 p-6 sm:p-8"
        @submit.prevent="submitForm"
      >
        <header>
          <h1 class="text-xl font-bold text-slate-900 sm:text-2xl">
            Transfert d'argent
          </h1>
        </header>

        <!-- Step indicator -->
        <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <button
            v-for="(step, index) in steps"
            :key="index"
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition sm:h-11 sm:w-11 sm:text-base"
            :class="
              currentStep === index
                ? 'bg-brand-500 text-white shadow-md'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            "
            @click="currentStep = index"
          >
            {{ index + 1 }}
          </button>
        </div>

        <hr class="h-px border-0 bg-gradient-to-r from-brand-500 via-brand-400 to-teal-700" />

        <!-- Step 1: Code + MAC -->
        <section v-if="currentStep === 0" class="space-y-4">
          <div>
            <label for="transferCode" class="mb-1 block text-sm font-semibold text-slate-700">
              Code de transfert
            </label>
            <input
              id="transferCode"
              v-model="transferDetails.transferCode"
              type="text"
              required
              class="input-field"
            />
          </div>
          <div>
            <label for="mac" class="mb-1 block text-sm font-semibold text-slate-700">MAC</label>
            <input
              id="mac"
              v-model="transferDetails.mac"
              type="text"
              required
              class="input-field"
            />
          </div>
        </section>

        <!-- Step 2: Termination -->
        <section v-if="currentStep === 1" class="space-y-4">
          <div>
            <label for="amount" class="mb-1 block text-sm font-semibold text-slate-700">Montant</label>
            <input
              id="amount"
              v-model="transferDetails.termination.amount"
              type="text"
              required
              class="input-field"
            />
          </div>
          <div>
            <label for="accountNumber" class="mb-1 block text-sm font-semibold text-slate-700">
              Numéro de compte
            </label>
            <input
              id="accountNumber"
              v-model="transferDetails.termination.accountReceivable.accountNumber"
              type="text"
              required
              class="input-field"
            />
          </div>
          <div>
            <label for="accountType" class="mb-1 block text-sm font-semibold text-slate-700">
              Type de compte
            </label>
            <input
              id="accountType"
              v-model="transferDetails.termination.accountReceivable.accountType"
              type="text"
              required
              class="input-field"
            />
          </div>
        </section>

        <!-- Step 3: Sender -->
        <section v-if="currentStep === 2" class="space-y-4">
          <div>
            <label for="phone" class="mb-1 block text-sm font-semibold text-slate-700">Téléphone</label>
            <input
              id="phone"
              v-model="transferDetails.sender.phone"
              type="text"
              required
              class="input-field"
            />
          </div>
          <div>
            <label for="email" class="mb-1 block text-sm font-semibold text-slate-700">Email</label>
            <input
              id="email"
              v-model="transferDetails.sender.email"
              type="email"
              required
              class="input-field"
            />
          </div>
          <div>
            <label for="lastname" class="mb-1 block text-sm font-semibold text-slate-700">Nom</label>
            <input
              id="lastname"
              v-model="transferDetails.sender.lastname"
              type="text"
              required
              class="input-field"
            />
          </div>
          <div>
            <label for="othernames" class="mb-1 block text-sm font-semibold text-slate-700">Prénoms</label>
            <input
              id="othernames"
              v-model="transferDetails.sender.othernames"
              type="text"
              required
              class="input-field"
            />
          </div>
        </section>

        <!-- Step 4: Initiation -->
        <section v-if="currentStep === 3" class="space-y-4">
          <div>
            <label for="initiatingEntityCode" class="mb-1 block text-sm font-semibold text-slate-700">
              Code d'entité
            </label>
            <input
              id="initiatingEntityCode"
              v-model="transferDetails.initiatingEntityCode"
              type="text"
              required
              class="input-field"
            />
          </div>
          <div>
            <label for="channel" class="mb-1 block text-sm font-semibold text-slate-700">Canal</label>
            <input
              id="channel"
              v-model="transferDetails.initiation.channel"
              type="text"
              required
              class="input-field"
            />
          </div>
        </section>

        <!-- Step 5: Beneficiary -->
        <section v-if="currentStep === 4" class="space-y-4">
          <div>
            <label for="beneficiaryLastName" class="mb-1 block text-sm font-semibold text-slate-700">
              Nom du bénéficiaire
            </label>
            <input
              id="beneficiaryLastName"
              v-model="transferDetails.beneficiary.lastname"
              type="text"
              required
              class="input-field"
            />
          </div>
          <div>
            <label for="beneficiaryOtherNames" class="mb-1 block text-sm font-semibold text-slate-700">Prénoms</label>
            <input
              id="beneficiaryOtherNames"
              v-model="transferDetails.beneficiary.othernames"
              type="text"
              required
              class="input-field"
            />
          </div>
        </section>

        <!-- Navigation -->
        <div class="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            v-if="currentStep > 0"
            type="button"
            class="btn-secondary w-full sm:w-auto"
            @click="prevStep"
          >
            Précédent
          </button>
          <span v-else class="hidden sm:block"></span>

          <button
            v-if="currentStep < steps.length - 1"
            type="button"
            class="btn-primary w-full sm:w-auto"
            @click="nextStep"
          >
            Suivant
          </button>

          <button
            v-if="currentStep === steps.length - 1"
            type="submit"
            class="btn-primary w-full sm:w-auto"
            :disabled="loading"
          >
            {{ loading ? 'Envoi…' : 'Envoyer' }}
          </button>
        </div>

        <p v-if="message" class="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {{ message }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const API_BANK_URL = process.env.VUE_APP_BANK_API_URL || 'http://localhost:3500'

export default {
  name: 'TransferPage',
  data() {
    return {
      currentStep: 0,
      steps: [1, 2, 3, 4, 5],
      message: '',
      loading: false,
      transferDetails: {
        transferCode: '',
        mac: '',
        termination: {
          amount: '',
          accountReceivable: {
            accountNumber: '',
            accountType: '',
          },
          entityCode: '044',
          currencyCode: '566',
          paymentMethodCode: 'AC',
          countryCode: 'NG',
        },
        sender: {
          phone: '',
          email: localStorage.getItem('userEmail') || '',
          lastname: '',
          othernames: '',
        },
        initiatingEntityCode: '',
        initiation: {
          amount: '',
          currencyCode: '566',
          paymentMethodCode: 'CA',
          channel: '',
        },
        beneficiary: {
          lastname: '',
          othernames: '',
        },
      },
    }
  },
  computed: {
    totalPrice() {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || []
      return cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2)
    },
  },
  watch: {
    'transferDetails.sender.email'(newEmail) {
      localStorage.setItem('userEmail', newEmail)
    },
  },
  mounted() {
    this.transferDetails.termination.amount = this.totalPrice
    this.transferDetails.initiation.amount = this.totalPrice
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.steps.length - 1) this.currentStep++
    },
    prevStep() {
      if (this.currentStep > 0) this.currentStep--
    },
    async submitForm() {
      this.message = ''
      this.loading = true
      try {
        await axios.post(
          `${API_BANK_URL}/api/transfer`,
          this.transferDetails,
          { headers: { 'Content-Type': 'application/json' } }
        )
        this.message = 'Transfert réussi !'
        this.$router.push({ name: 'FactureView' })
      } catch (error) {
        this.message =
          error.response?.data?.message || 'Erreur lors du transfert.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
