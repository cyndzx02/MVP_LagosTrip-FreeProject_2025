<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-screen-content">
      <!-- Back link + title -->
      <router-link
        to="/home"
        class="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-brand-500"
      >
        <i class="fas fa-arrow-left"></i>
        <span>{{ category }}</span>
      </router-link>

      <!-- Search bar -->
      <div class="mt-6 flex w-full items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md ring-1 ring-slate-100 sm:max-w-2xl">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher…"
          class="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
        />
        <button
          type="button"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white transition hover:bg-brand-600"
          @click="search"
          aria-label="Rechercher"
        >
          <i class="fas fa-search"></i>
        </button>
      </div>

      <!-- Item grid -->
      <div
        class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4"
      >
        <div
          v-for="(item, index) in filteredItems"
          :key="index"
          class="flex flex-col items-center text-center"
        >
          <div class="relative h-28 w-28 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200 sm:h-32 sm:w-32">
            <img
              :src="item.image"
              :alt="item.name"
              class="h-full w-full object-cover"
            />
            <button
              type="button"
              class="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white shadow-md transition hover:bg-brand-600"
              @click="goToSpecifiqueFood(item.name)"
              aria-label="Voir le produit"
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <p class="mt-3 text-sm font-bold text-brand-500 sm:text-base">
            {{ item.price }} CFA
          </p>
          <p class="text-sm text-slate-700 sm:text-base">{{ item.name }}</p>
        </div>
      </div>

      <p v-if="filteredItems.length === 0" class="mt-8 text-center text-sm text-slate-500">
        Aucun produit ne correspond à votre recherche.
      </p>
    </div>
  </div>
</template>

<script>
// Veggies
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
import Epinard from "../assets/Veggies/epinard.png"
import Piment from "../assets/Veggies/piment.png"
import Oignon from "../assets/Veggies/oignon.png"
import Persil from "../assets/Veggies/persil.png"
import Poivron from "../assets/Veggies/poivron.png"

// Dairies
import Lait from "../assets/Dairies/milk.png"
import eeg from "../assets/Dairies/oeuf.png"

// Viandes
import Boeuf from "../assets/Meats/beef.png"
import Chicken_Breast from "../assets/Meats/chicken-breast.png"
import Chicken_Meat from "../assets/Meats/chicken-meat.png"
import rawMeat from "../assets/Meats/rawMeat.png"
import Filet_de_boeuf from "../assets/Meats/file-de-boeuf.png"
import Gesier from "../assets/Meats/gesier poulet.png"
import pouletPoitrine from "../assets/Meats/poitrine-poulet.png"
import rosbif from "../assets/Meats/rosbif-boeuf.png"

// Fruits
import Banane from "../assets/Fruits/banane.png"
import Fraise from "../assets/Fruits/fraise.png"
import Orange from "../assets/Fruits/orange.png"
import Kiwi from "../assets/Fruits/kiwi.png"
import Passion_Fruits from "../assets/Fruits/passionFruit.png"

// Fishes
import Saumon_oeuf from "../assets/Fishes/Oeuf saumon.png"
import saumon_sliced from "../assets/Fishes/saumon-lamelle.png"
import saumon_cut from "../assets/Fishes/saumon.png"
import Tilapia from "../assets/Fishes/tilapia.png"
import Sardine from "../assets/Fishes/sardine.png"
import Tuna from "../assets/Fishes/tuna.png"

export default {
  name: 'ViewCategorie',
  data() {
    return {
      searchQuery: "",
      items: {
        Légumes: [
          { name: "Carotte", price: 20, image: Carotte },
          { name: "Tomate", price: 50, image: Tomate },
          { name: "Ails", price: 50, image: Ails },
          { name: "Aubergine", price: 50, image: Aubergine },
          { name: "Concombre", price: 50, image: Concombre },
          { name: "Ginger", price: 50, image: Ginger },
          { name: "Gombo", price: 50, image: Gombo },
          { name: "Haricot Rouge", price: 50, image: Haricot_Rouge },
          { name: "Haricot Vert", price: 50, image: Haricot_Vert },
          { name: "Laittue", price: 50, image: Laittue },
          { name: "Epinard", price: 100, image: Epinard },
          { name: "Oignon", price: 24, image: Oignon },
          { name: "Persil", price: 7, image: Persil },
          { name: "Poivron", price: 56, image: Poivron },
          { name: "Piment", price: 637, image: Piment },
        ],
        Viandes: [
          { name: "Bœuf", price: 50, image: Boeuf },
          { name: "Chicken Breast", price: 30, image: Chicken_Breast },
          { name: "Chicken Meat", price: 30, image: Chicken_Meat },
          { name: "Raw Meat", price: 30, image: rawMeat },
          { name: "Filet de boeuf", price: 24, image: Filet_de_boeuf },
          { name: "Rosbif", price: 34, image: rosbif },
          { name: "Gesier", price: 24, image: Gesier },
          { name: "Poitrine de Poulet", price: 50, image: pouletPoitrine },
        ],
        Poissons: [
          { name: "Tilapia", price: 50, image: Tilapia },
          { name: "Tuna", price: 30, image: Tuna },
          { name: "Sardine", price: 30, image: Sardine },
          { name: "Saumon", price: 40, image: saumon_sliced },
          { name: "Saumon petit morceaux", price: 50, image: saumon_cut },
          { name: "Oeuf de Saumon", price: 39, image: Saumon_oeuf },
        ],
        Fruits: [
          { name: "Banane", price: 50, image: Banane },
          { name: "Kiwi", price: 320, image: Kiwi },
          { name: "Fraise", price: 300, image: Fraise },
          { name: "Orange", price: 30, image: Orange },
          { name: "Fruit de la passion", price: 30, image: Passion_Fruits },
        ],
        Cremeries: [
          { name: "Lait", price: 36, image: Lait },
          { name: "Oeuf", price: 367, image: eeg },
        ],
      },
    }
  },
  computed: {
    category() {
      return this.$route.params.category
    },
    filteredItems() {
      const categoryItems = this.items[this.category] || []
      return categoryItems.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
  },
  methods: {
    search() {
      // Filtering is reactive via searchQuery — this stays for parity with the search button.
    },
    goToSpecifiqueFood(foodName) {
      this.$router.push({
        name: 'SpecifiqueFood',
        params: { foodName },
      })
    },
  },
}
</script>
