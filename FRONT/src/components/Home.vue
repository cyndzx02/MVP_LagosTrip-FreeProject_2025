<template>
  <div class="min-h-[calc(100vh-4rem)] bg-white px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-screen-content">
      <!-- Search bar -->
      <div class="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md ring-1 ring-slate-100">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="De quoi avez-vous besoin aujourd'hui ?"
          class="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
          @input="filterCategories"
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

      <!-- Categories -->
      <section class="mt-10 sm:mt-14">
        <h2 class="text-center text-xl font-bold text-slate-900 sm:text-2xl">
          Nos catégories
        </h2>

        <div
          class="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4"
        >
          <button
            v-for="(category, index) in filteredCategories"
            :key="index"
            type="button"
            class="group flex flex-col items-center gap-3 focus:outline-none"
            @click="navigateToCategory(category.name)"
          >
            <div
              class="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 transition-transform duration-200 group-hover:scale-105 sm:h-24 sm:w-24"
            >
              <img
                :src="category.icon"
                :alt="category.name"
                class="h-12 w-12 object-contain sm:h-14 sm:w-14"
              />
            </div>
            <span class="text-sm font-semibold text-slate-900 sm:text-base">
              {{ category.name }}
            </span>
          </button>
        </div>

        <p v-if="filteredCategories.length === 0" class="mt-6 text-center text-sm text-slate-500">
          Aucune catégorie ne correspond à votre recherche.
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import fruit from '../assets/Categories/fruit.png'
import meat from '../assets/Categories/meat.png'
import fish from '../assets/Categories/fish.png'
import diaries from '../assets/Categories/dairy-products.png'

export default {
  name: 'HomePage',
  data() {
    return {
      searchQuery: '',
      categories: [
        { name: 'Fruits', icon: fruit },
        { name: 'Viandes', icon: meat },
        { name: 'Poissons', icon: fish },
        { name: 'Crèmerie', icon: diaries },
      ],
      filteredCategories: [],
    }
  },
  created() {
    this.filteredCategories = this.categories
  },
  methods: {
    search() {
      this.filterCategories()
    },
    filterCategories() {
      const query = this.searchQuery.toLowerCase().trim()
      this.filteredCategories =
        query === ''
          ? this.categories
          : this.categories.filter((category) =>
              category.name.toLowerCase().includes(query)
            )
    },
    navigateToCategory(categoryName) {
      this.$router.push({
        name: 'ViewCategorie',
        params: { category: categoryName },
      })
    },
  },
}
</script>
