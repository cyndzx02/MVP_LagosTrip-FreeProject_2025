<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-xl">
      <form
        class="card-soft space-y-6 p-6 sm:p-8"
        @submit.prevent="submitBankForm"
      >
        <header class="flex items-center gap-3">
          <router-link
            to="/ResumeCommand"
            class="text-slate-700 transition hover:text-brand-500"
            aria-label="Retour"
          >
            <i class="fas fa-arrow-left"></i>
          </router-link>
          <h1 class="text-xl font-bold text-slate-900 sm:text-2xl">
            Informations bancaires
          </h1>
        </header>

        <!-- Step indicator -->
        <div class="flex items-center justify-center gap-4 sm:gap-8">
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-base font-semibold text-slate-700">1</span>
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-base font-semibold text-white">2</span>
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-base font-semibold text-slate-700">3</span>
        </div>

        <hr class="h-px border-0 bg-gradient-to-r from-brand-500 via-brand-400 to-teal-700" />

        <section class="space-y-4">
          <div>
            <label for="accountId" class="mb-1 block text-sm font-semibold text-slate-700">
              ID du compte
            </label>
            <input
              id="accountId"
              v-model="cardDetails.accountId"
              type="text"
              required
              class="input-field"
            />
          </div>

          <div>
            <label for="bankCode" class="mb-1 block text-sm font-semibold text-slate-700">
              Code banque
            </label>
            <input
              id="bankCode"
              v-model="cardDetails.bankCode"
              type="text"
              required
              class="input-field"
            />
          </div>
        </section>

        <button
          type="submit"
          class="btn-primary w-full text-base"
          :disabled="loading"
        >
          {{ loading ? 'Envoi…' : 'Envoyer' }}
        </button>

        <p
          v-if="message"
          class="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
        >
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
  name: 'PageChekValidCart',
  data() {
    return {
      cardDetails: {
        accountId: '',
        bankCode: '',
      },
      message: '',
      loading: false,
    }
  },
  methods: {
    async submitBankForm() {
      this.message = ''
      this.loading = true
      try {
        await axios.post(
          `${API_BANK_URL}/api/check-card`,
          this.cardDetails,
          { headers: { 'Content-Type': 'application/json' } }
        )
        this.message = 'Données envoyées avec succès !'
        this.$router.push({ name: 'TransferPage' })
      } catch (error) {
        this.message =
          error.response?.data?.message || "Erreur lors de l'envoi des données."
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
