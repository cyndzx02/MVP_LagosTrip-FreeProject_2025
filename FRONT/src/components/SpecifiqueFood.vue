<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-screen-content">
      <router-link
        :to="{ name: 'ViewCategorie', params: { category: 'Fruits' } }"
        class="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-brand-500"
      >
        <i class="fas fa-arrow-left"></i>
        <span>Autres produits</span>
      </router-link>

      <div class="mt-8 flex items-center justify-center">
        <div
          v-if="product"
          class="card-soft w-full max-w-md p-6 sm:p-8"
        >
          <div class="flex flex-col items-center text-center">
            <div class="h-36 w-36 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200 sm:h-40 sm:w-40">
              <img :src="product.image" :alt="product.name" class="h-full w-full object-cover" />
            </div>

            <h1 class="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
              {{ product.name }}
            </h1>
            <p class="mt-1 text-lg font-semibold text-brand-500">
              {{ computedPrice }} CFA
            </p>

            <div class="mt-6 flex items-center gap-3">
              <button
                type="button"
                class="flex h-10 w-10 items-center justify-center rounded-md bg-brand-500 text-lg font-bold text-white transition hover:bg-brand-600 disabled:opacity-50 disabled:hover:bg-brand-500"
                :disabled="quantity <= 1"
                @click="decreaseQuantity"
                aria-label="Diminuer"
              >−</button>
              <input
                v-model.number="quantity"
                type="number"
                min="1"
                class="h-10 w-16 rounded-md border border-slate-300 text-center text-base outline-none focus:border-brand-500"
                @input="updatePrice"
              />
              <button
                type="button"
                class="flex h-10 w-10 items-center justify-center rounded-md bg-brand-500 text-lg font-bold text-white transition hover:bg-brand-600"
                @click="increaseQuantity"
                aria-label="Augmenter"
              >+</button>
            </div>

            <button
              type="button"
              class="btn-primary mt-6 w-full text-base"
              @click="addToCart"
            >
              Ajouter au panier
            </button>
          </div>
        </div>

        <div v-else class="card-soft w-full max-w-md p-6 text-center">
          <p class="text-slate-700">Produit introuvable.</p>
          <router-link to="/home" class="mt-4 inline-block font-semibold text-brand-500 hover:underline">
            Retour à l'accueil
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tomate from "../assets/Veggies/tomato.png"
import Ails from "../assets/Veggies/ails.png"
import Aubergine from "../assets/Veggies/aubergine.png"
import Carotte from "../assets/Veggies/carotte.png"
import Concombre from "../assets/Veggies/concombre.png"
import Ginger from "../assets/Veggies/ginger.png"
import Gombo from "../assets/Veggies/gombo.png"
import Haricot_Rouge from "../assets/Veggies/haricotrouge.png"
import Haricot_Vert from "../assets/Veggies/haricotvert.png"
import Laittue from "../assets/Veggies/laittue.png"

import Boeuf from "../assets/Meats/beef.png"
import Chicken_Breast from "../assets/Meats/chicken-breast.png"
import Chicken_Meat from "../assets/Meats/chicken-meat.png"
import rawMeat from "../assets/Meats/rawMeat.png"

import Banane from "../assets/Fruits/banane.png"
import Fraise from "../assets/Fruits/fraise.png"
import Orange from "../assets/Fruits/orange.png"
import Kiwi from "../assets/Fruits/kiwi.png"
import Passion_Fruits from "../assets/Fruits/passionFruit.png"

import Tilapia from "../assets/Fishes/tilapia.png"
import Sardine from "../assets/Fishes/sardine.png"
import Tuna from "../assets/Fishes/tuna.png"

export default {
  name: 'SpecifiqueFood',
  data() {
    return {
      quantity: 1,
      products: [
        { name: "Carotte", price: 200, image: Carotte },
        { name: "Tomate", price: 100, image: Tomate },
        { name: "Ails", price: 100, image: Ails },
        { name: "Aubergine", price: 300, image: Aubergine },
        { name: "Concombre", price: 200, image: Concombre },
        { name: "Ginger", price: 50, image: Ginger },
        { name: "Gombo", price: 100, image: Gombo },
        { name: "Haricot Rouge", price: 530, image: Haricot_Rouge },
        { name: "Haricot Vert", price: 500, image: Haricot_Vert },
        { name: "Laittue", price: 530, image: Laittue },
        { name: "Bœuf", price: 2500, image: Boeuf },
        { name: "Chicken Breast", price: 1800, image: Chicken_Breast },
        { name: "Chicken Meat", price: 1800, image: Chicken_Meat },
        { name: "Raw Meat", price: 3000, image: rawMeat },
        { name: "Tilapia", price: 5000, image: Tilapia },
        { name: "Tuna", price: 1600, image: Tuna },
        { name: "Sardine", price: 500, image: Sardine },
        { name: "Banane", price: 530, image: Banane },
        { name: "Kiwi", price: 320, image: Kiwi },
        { name: "Fraise", price: 300, image: Fraise },
        { name: "Orange", price: 300, image: Orange },
        { name: "Fruit de la passion", price: 300, image: Passion_Fruits },
      ],
    }
  },
  computed: {
    foodName() {
      return this.$route.params.foodName
    },
    product() {
      return this.products.find(p => p.name === this.foodName)
    },
    computedPrice() {
      if (!this.product) return '0.00'
      return (this.product.price * this.quantity).toFixed(2)
    },
  },
  methods: {
    increaseQuantity() {
      this.quantity++
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--
    },
    updatePrice() {
      this.quantity = Math.max(1, Number(this.quantity) || 1)
    },
    addToCart() {
      if (!this.product) return
      const cart = JSON.parse(localStorage.getItem('cart')) || []
      const existingProductIndex = cart.findIndex(item => item.name === this.product.name)

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += this.quantity
        cart[existingProductIndex].totalPrice = (
          cart[existingProductIndex].price * cart[existingProductIndex].quantity
        ).toFixed(2)
      } else {
        cart.push({
          id: `${this.product.name}-${Date.now()}`,
          name: this.product.name,
          price: this.product.price,
          quantity: this.quantity,
          totalPrice: (this.product.price * this.quantity).toFixed(2),
        })
      }

      localStorage.setItem('cart', JSON.stringify(cart))
      this.$router.push({ name: 'Panier' })
    },
  },
}
</script>
