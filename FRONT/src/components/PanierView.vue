<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-2xl">
      <div class="card-soft p-6 sm:p-8">
        <h1 class="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Votre panier
        </h1>

        <div v-if="cartItems.length === 0" class="mt-8 text-center text-slate-500">
          <p>Votre panier est vide.</p>
          <router-link to="/home" class="mt-4 inline-block font-semibold text-brand-500 hover:underline">
            Continuer mes achats
          </router-link>
        </div>

        <ul v-else class="mt-6 divide-y divide-slate-200">
          <li
            v-for="(item, index) in cartItems"
            :key="item.id || `${item.name}-${index}`"
            class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex-1">
              <h2 class="text-base font-semibold text-slate-900 sm:text-lg">
                {{ item.name }}
              </h2>
              <p class="text-sm text-slate-500">{{ item.price }} CFA</p>
            </div>

            <div class="flex items-center gap-3">
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-md bg-brand-500 text-white transition hover:bg-brand-600 disabled:bg-slate-300 disabled:hover:bg-slate-300"
                :disabled="item.quantity <= 1"
                @click="decreaseQuantity(index)"
                aria-label="Diminuer"
              >−</button>
              <span class="min-w-[1.5rem] text-center text-base font-semibold">
                {{ item.quantity }}
              </span>
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-md bg-brand-500 text-white transition hover:bg-brand-600"
                @click="increaseQuantity(index)"
                aria-label="Augmenter"
              >+</button>
            </div>

            <div class="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
              <p class="text-sm font-bold text-slate-900 sm:text-base">
                {{ (item.price * item.quantity).toFixed(2) }} CFA
              </p>
              <button
                type="button"
                class="text-xs font-semibold text-red-600 hover:text-red-700 sm:text-sm"
                @click="removeFromCart(index)"
              >
                Supprimer
              </button>
            </div>
          </li>
        </ul>

        <div v-if="cartItems.length > 0" class="mt-6 border-t border-slate-200 pt-6">
          <div class="flex items-center justify-between">
            <span class="text-lg font-bold text-slate-900">Total</span>
            <span class="text-lg font-bold text-brand-500">{{ totalPrice }} CFA</span>
          </div>
          <button type="button" class="btn-primary mt-4 w-full text-base" @click="checkout">
            Passer à la caisse
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanierView',
  data() {
    return {
      cartItems: JSON.parse(localStorage.getItem('cart')) || [],
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
    increaseQuantity(index) {
      this.cartItems[index].quantity++
      this.updateLocalStorage()
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--
        this.updateLocalStorage()
      }
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1)
      this.updateLocalStorage()
    },
    updateLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
    },
    checkout() {
      this.$router.push({ name: 'Paiement' })
    },
  },
}
</script>
