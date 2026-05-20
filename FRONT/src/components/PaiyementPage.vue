<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-xl">
      <form
        class="card-soft space-y-6 p-6 sm:p-8"
        @submit.prevent="submitForm"
      >
        <header class="flex items-center gap-3">
          <router-link
            to="/home"
            class="text-slate-700 transition hover:text-brand-500"
            aria-label="Retour"
          >
            <i class="fas fa-arrow-left"></i>
          </router-link>
          <h1 class="text-xl font-bold text-slate-900 sm:text-2xl">
            Programme ta commande
          </h1>
        </header>

        <!-- Step indicator -->
        <div class="flex items-center justify-center gap-4 sm:gap-8">
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#539337] text-base font-semibold text-white">1</span>
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-base font-semibold text-slate-700">2</span>
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-base font-semibold text-slate-700">3</span>
        </div>

        <hr class="h-px border-0 bg-gradient-to-r from-brand-500 via-brand-400 to-teal-700" />

        <section class="space-y-4">
          <h2 class="flex items-center gap-2 text-base font-semibold text-slate-900 sm:text-lg">
            <i class="fas fa-map-marker-alt text-orange-500"></i>
            Adresse de livraison
          </h2>

          <div>
            <label for="ville" class="mb-1 block text-sm font-semibold text-slate-700">Ville</label>
            <input
              id="ville"
              v-model="location.city"
              type="text"
              required
              placeholder="Entrez votre ville"
              class="input-field"
              @input="saveToLocalStorage"
            />
          </div>

          <div>
            <label for="quartier" class="mb-1 block text-sm font-semibold text-slate-700">Quartier</label>
            <input
              id="quartier"
              v-model="location.district"
              type="text"
              required
              placeholder="Entrez votre quartier"
              class="input-field"
              @input="saveToLocalStorage"
            />
          </div>

          <div>
            <label for="phone" class="mb-1 block text-sm font-semibold text-slate-700">Numéro de téléphone</label>
            <input
              id="phone"
              v-model="location.phone"
              type="tel"
              required
              placeholder="Entrez votre numéro"
              class="input-field"
              @input="saveToLocalStorage"
            />
          </div>

          <button type="submit" class="btn-primary w-full text-base">Suivant</button>
        </section>
      </form>
    </div>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.min.css"

export default {
  name: 'PaiyementPage',
  data() {
    return {
      location: {
        city: '',
        district: '',
        phone: '',
      },
    }
  },
  methods: {
    saveToLocalStorage() {
      localStorage.setItem(
        'deliveryLocation',
        JSON.stringify({ ...this.location })
      )
    },
    loadFromLocalStorage() {
      const saved = JSON.parse(localStorage.getItem('deliveryLocation'))
      if (saved) {
        this.location.city = saved.city || ''
        this.location.district = saved.district || ''
        this.location.phone = saved.phone || ''
      }
    },
    submitForm() {
      this.saveToLocalStorage()
      this.$router.push({ name: 'ResumeCommand' })
    },
  },
  mounted() {
    this.loadFromLocalStorage()
  },
}
</script>
