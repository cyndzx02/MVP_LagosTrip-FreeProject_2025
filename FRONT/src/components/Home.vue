<template>
  <div class="container-home all-color home-page text-center">
    <div class="search-bar-home all-color-home">
      <input
        type="text"
        placeholder="De quoi avez-vous besoin aujourd'hui ?"
        v-model="searchQuery"
        @input="filterCategories"
      />
      <button class="search-button-home" @click="search">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <div class="grid-container-home all-color-home">
      <h5 class="fw-bold our-category-home">Nos catégories</h5>
      <div class="categories-grid-home">
        <div
          v-for="(category, index) in filteredCategories"
          :key="index"
          class="category-item-home"
          @click="navigateToCategory(category.name)"
        >
          <div class="category-circle-home">
            <img
              :src="category.icon"
              :alt="category.name"
              class="categoryimg-home img-fluid"
            />
          </div>
          <p class="category-name-home">{{ category.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fruit from "../assets/Categories/fruit.png";
import meat from "../assets/Categories/meat.png";
import fish from "../assets/Categories/fish.png";
import diaries from "../assets/Categories/dairy-products.png";
//import from "..//"
export default {
  name: "HomePage",
  data() {
    return {
      searchQuery: "",
      categories: [
        { name: "Fruits", icon: fruit },
        { name: "Viandes", icon: meat },
        { name: "Poissons", icon: fish },
        { name: "Crèmerie", icon: diaries },
        // { name: "Surgelés", icon: frozen },
        // {name: "", icon: frozen},
      ],
      filteredCategories: [],
    };
  },
  created() {
    this.filteredCategories = this.categories;
  },
  methods: {
    // Méthode de recherche
    search() {
      this.filterCategories();
    },
    filterCategories() {
      const query = this.searchQuery.toLowerCase().trim();
      if (query === "") {
        this.filteredCategories = this.categories;
      } else {
        this.filteredCategories = this.categories.filter((category) =>
          category.name.toLowerCase().includes(query)
        );
      }
    },
    navigateToCategory(categoryName) {
      this.$router.push({
        name: "ViewCategorie",
        params: { category: categoryName },
      });
    },
  },
};
</script>

<style scoped>
/* Mise en page de la page d'accueil */
.our-category-home {
  /* padding-bottom: 5cm; */
  margin-top: 5cm;
  margin-right: 4cm ;
  /* background-color: black; */
  /* padding-top: 4%; */
}
.container-home.home-page {
  padding: 10px;
  margin-top: 15px;
}

.all-color-home {
  background-color: #fff;
}

/* Barre de recherche améliorée */
.search-bar-home {
  /* padding: 5px 10px; */
  /* margin-bottom: 1%; */
  /* display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -50px;
  border-radius: 25px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px; */
  margin-top: 6%;
  position: fixed;
  z-index: 100%;
  display: flex;
  justify-content: center;
  margin-left: 5cm;
  align-items: center;
  border-radius: 25px;
  padding: 5px 10px;
  background-color: #fff;
  margin-bottom: 5%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px;
}

.search-bar-home input {
  border: none;
  outline: none;
  /* padding: 5px; */
  font-size: 16px;
  width: 80%;
}

.search-button-home {
  background-color: #0a2850;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
}

.search-button-home:hover {
  background-color: #0a2850;
}

/* Grille des catégories avec plus d'espace */
.categories-grid-home {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-left: 5%;
  justify-items: center;
  width: 70%;
  align-items: center;
  /* max-width: 1000px; */
  margin-top: 0.5cm;
}

.category-item-home {
  /* margin-top: -12px; */
  text-align: center;
  cursor: pointer;
}

.category-circle-home {
  width: 90px;
  height: 90px;
  background-color: #0a2850;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.category-circle-home:hover {
  transform: scale(1.1);
}

.categoryimg-home {
  width: 70px;
  height: 70px;
  object-fit: contain;
}

.category-name-home {
  font-size: 15;
  font-weight: bold;
  cursor: pointer;
}


@media screen and (max-width: 991px) {
  .categories-grid-home {
    grid-template-columns: repeat(
      2,
      1fr
    );
  }
}

@media screen and (max-width: 767px) {
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
  .our-category {
  margin-right: 5%;
  /* padding-bottom: 3%; */
  margin-bottom: 5%;
  }
  .category-circle {
    margin-right: 5%;
    width: 100px;
    height: 100px;
  }

  .categoryimg {
    margin-right: 5%;
    width: 50px;
    height: 50px;
  }

  .category-name {
    font-size: 14px;
  }

  .search-bar {
    width: 100%;
    max-width: 100%;
    margin-top: -50%;
    margin-right: 10cm;
  }

  .search-bar input {
    width: 70%; 
  }

  .search-button {
    padding: 8px;
  }
}
</style>
