<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-xl">
      <form
        class="card-soft space-y-6 p-6 sm:p-8"
        @submit.prevent="goToValidation"
      >
        <header class="flex items-center gap-3">
          <router-link
            to="/Paiement"
            class="text-slate-700 transition hover:text-brand-500"
            aria-label="Retour"
          >
            <i class="fas fa-arrow-left"></i>
          </router-link>
          <h1 class="text-xl font-bold text-slate-900 sm:text-2xl">
            Résumé des informations
          </h1>
        </header>

        <!-- Step indicator -->
        <div class="flex items-center justify-center gap-4 sm:gap-8">
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-base font-semibold text-slate-700">1</span>
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#539337] text-base font-semibold text-white">2</span>
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-base font-semibold text-slate-700">3</span>
        </div>

        <hr class="h-px border-0 bg-gradient-to-r from-brand-500 via-brand-400 to-teal-700" />

        <!-- Order summary -->
        <section class="space-y-3">
          <button
            type="button"
            class="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-brand-500"
            @click="toggleSummary"
          >
            <span class="text-base font-semibold text-slate-900">Résumé de la commande</span>
            <i :class="['fas', showSummary ? 'fa-chevron-up' : 'fa-chevron-down', 'text-slate-500']"></i>
          </button>
          <div v-if="showSummary" class="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <p>Prix total : <span class="font-semibold">{{ totalPrice }} CFA</span></p>
            <p>Prix de livraison : <span class="font-semibold">{{ deliveryPrice }} CFA</span></p>
          </div>

          <button
            type="button"
            class="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-brand-500"
            @click="toggleProducts"
          >
            <span class="text-base font-semibold text-slate-900">Liste des produits</span>
            <i :class="['fas', showProducts ? 'fa-chevron-up' : 'fa-chevron-down', 'text-slate-500']"></i>
          </button>
          <ul v-if="showProducts" class="space-y-1 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <li
              v-for="(product, index) in cartItems"
              :key="product.id || `${product.name}-${index}`"
            >
              {{ product.name }} — {{ product.price }} CFA × {{ product.quantity }}
            </li>
            <li v-if="cartItems.length === 0" class="text-slate-500">Panier vide.</li>
          </ul>

          <button
            type="button"
            class="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-brand-500"
            @click="toggleLocationInfo"
          >
            <span class="text-base font-semibold text-slate-900">Informations de localisation</span>
            <i :class="['fas', showLocationInfo ? 'fa-chevron-up' : 'fa-chevron-down', 'text-slate-500']"></i>
          </button>
          <div v-if="showLocationInfo" class="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <p>Ville : <span class="font-semibold">{{ location.city || '—' }}</span></p>
            <p>Quartier : <span class="font-semibold">{{ location.district || '—' }}</span></p>
          </div>
        </section>

        <button type="submit" class="btn-primary w-full text-base">Suivant</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResumeCommand',
  data() {
    return {
      cartItems: JSON.parse(localStorage.getItem('cart')) || [],
      deliveryPrice: 10,
      location: {
        city: '',
        district: '',
        phone: '',
      },
      showSummary: false,
      showProducts: false,
      showLocationInfo: false,
    }
  },
  computed: {
    totalPrice() {
      return this.cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2)
    },
  },
  methods: {
    toggleSummary() { this.showSummary = !this.showSummary },
    toggleProducts() { this.showProducts = !this.showProducts },
    toggleLocationInfo() { this.showLocationInfo = !this.showLocationInfo },
    goToValidation() {
      this.$router.push({ name: 'PageChekValidCart' })
    },
  },
  mounted() {
    const stored = JSON.parse(localStorage.getItem('deliveryLocation'))
    if (stored) {
      this.location.city = stored.city || ''
      this.location.district = stored.district || ''
      this.location.phone = stored.phone || ''
    }
  },
}
</script>
