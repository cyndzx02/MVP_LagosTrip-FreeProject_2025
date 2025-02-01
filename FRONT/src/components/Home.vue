<template>
  <div class="container all-color home-page text-center">
    <div class="row location-and-basket d-flex justify-content-between align-items-center px-3 mt-4">
      <div class="location d-flex align-items-center">
        <i class="bi bi-geo-alt-fill location-icon"></i>
      </div>
      <div class="basket">
        <i class="bi bi-basket2 basket-logo"></i>
      </div>
    </div>

    <div class="search-bar all-color">
      <input type="text" placeholder="De quoi avez-vous besoin aujourd'hui ?" v-model="searchQuery" @input="filterCategories"/>
      <button class="search-button" @click="search">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <div class="grid-container all-color">
      <h5 class="fw-bold our-category">Nos catégories</h5>
      <div class="categories-grid">
        <div v-for="(category, index) in filteredCategories" :key="index" class="category-item" @click="navigateToCategory(category.name)">
          <div class="category-circle">
            <img :src="category.icon" 
                 :alt="category.name" 
                 class="categoryimg img-fluid" />
          </div>
          <p class="category-name">{{ category.name }}</p>
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
import frozen from "../assets/Categories/frozen.png";

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
        { name: "Surgelés", icon: frozen },
        // {name: "", icon: frozen},

      ],
      filteredCategories: [] // Tableau pour les catégories filtrées
    };
  },
  created() {
    // Initialiser filteredCategories avec toutes les catégories au départ
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
        this.filteredCategories = this.categories.filter(category =>
          category.name.toLowerCase().includes(query) 
        );
      }
    },
    navigateToCategory(categoryName) {
      this.$router.push({ name: 'ViewCategorie', params: { category: categoryName } });
    }
  },
};
</script>

<style>
/* Mise en page de la page d'accueil */
.our-category{
  padding-bottom: 2%;
  
}
.container.home-page {
  padding: 10px;
  margin-top: 15px;
}

.all-color{
  background-color: #fff;
}

/* Icônes localisation et panier */
/* .location-and-basket {
  margin-top: 10px;
}

.location-icon {
  font-size: 20px;
  margin-right: 5px;
}

.basket-logo {
  font-size: 24px;
  cursor: pointer;
} */

/* Barre de recherche améliorée */
.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 5px; */
  border-radius: 25px;
  /* padding: 5px 10px; */
  background-color: #fff;
  /* margin-bottom: 1%; */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px;
}

.search-bar input {
  border: none;
  outline: none;
  /* padding: 5px; */
  font-size: 16px;
  width: 80%;
}

.search-button {
  background-color: #0a2850;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
}

.search-button:hover {
  background-color: #0a2850;
}

/* Grille des catégories avec plus d'espace */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  justify-content: center;
  /* margin-top: 5px; */
}

.category-item {
  /* margin-top: -12px; */
  text-align: center;
  cursor: pointer;
}

.category-circle {
  width: 90px;
  height: 90px;
  background-color: #0a2850;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 100%; */
  /* margin: auto; */
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.category-circle:hover {
  transform: scale(1.1);
}

.categoryimg {
  width: 70px;
  height: 70px;
  object-fit: contain;
}

.category-name {
  font-size: 15;
  font-weight: bold;
  /* margin-top: 5px; */
  cursor: pointer;
}

/* Responsivité */
@media screen and (max-width: 991px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes sur les écrans moyens */
  }
}

@media screen and (max-width: 767px) {
  .categories-grid {
    grid-template-columns: 1fr; /* 1 colonne sur les petits écrans */
    gap: 30px; /* Réduit l'espacement entre les éléments */
  }

  .category-circle {
    width: 100px;
    height: 100px; /* Réduit la taille des cercles pour les petits écrans */
  }

  .categoryimg {
    width: 50px;
    height: 50px; /* Réduit la taille de l'icône des catégories */
  }

  .category-name {
    font-size: 14px; /* Ajuste la taille du texte pour les petits écrans */
  }

  .search-bar {
    width: 100%; /* Prend toute la largeur sur les petits écrans */
    max-width: none;
    margin-top: 50px; /* Ajuster la marge pour les petits écrans */
  }

  .search-bar input {
    width: 70%; /* Réduit la largeur du champ de recherche sur les petits écrans */
  }

  .search-button {
    padding: 8px;
  }

  .location-and-basket {
    flex-direction: column; /* Empile les éléments sur les petits écrans */
    align-items: center;
  }

  .location-icon {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .basket-logo {
    font-size: 20px;
    margin-top: 10px; /* Espacement entre le panier et la localisation */
  }
}
</style>
