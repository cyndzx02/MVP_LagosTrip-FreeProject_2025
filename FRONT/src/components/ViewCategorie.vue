<template>
    <div class="container">

        <header>
        <i class="fas fa-arrow-left"></i>
        <h2>Legume</h2>
      </header>
      <!-- Barre de recherche -->
      <div class="search-bar">
        <input type="text" placeholder="Rechercher..." v-model="searchQuery" />
        <button class="search-button" @click="search">
          <i class="fas fa-search"></i> <!-- Icône de recherche -->
        </button>
      </div>
  
      <!-- Liste des articles -->
      <div class="item-list">
        <div class="item" v-for="(item, index) in filteredItems" :key="index">
          <div class="circle">
            <img :src="item.image" alt="Produit" class="item-image" />
            <button class="add-btn"><i class="fas fa-plus"></i></button>
          </div>
          <p class="item-price">{{ item.price }} €</p>
          <p class="item-name">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </template>

<script>

import tomato from "../assets/Veggies/tomato.png"
import ails from "../assets/Veggies/ails.png"
// import ginger from "../assets/Veggies/ginger.png"
// import gombo from "../assets/Veggies/gombo.png"



export default {
  data() {
    return {
      searchQuery: "",
      items: [
        { name: "Tomate", price: 10, image: tomato },
        { name: "Ail", price: 20, image: ails },
        // { name: "Gombo", price: 20, image: gombo },
        // { name: "Ail", price: 20, image: ginger },
        // { name: "Ail", price: 20, image: epinard },
        // { name: "Ail", price: 20, image: haricotrouge },
        // { name: "Ail", price: 20, image: haricotvert },
        // { name: "Ail", price: 20, image: persil },
        // { name: "Produit 3", price: 30, image:  },
        // { name: "Produit 4", price: 40, image:  },
        // { name: "Produit 5", price: 50, image:  },
        // { name: "Produit 6", price: 60, image:  }
      ]
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  methods: {
    search() {
      console.log("Recherche effectuée pour : ", this.searchQuery);
    }
  }
};
</script>

<style>
/* Styles de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif; /* Choisir une police générique */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  width: 100%;
  min-height: 100vh;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border-radius: 25px;
  padding: 5px 10px;
  background-color: #fff;
  margin-bottom: 5%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%; /* Responsivité de la barre de recherche */
  max-width: 800px; /* Largeur maximale de la barre de recherche */
}

.search-bar input {
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
  width: 80%; /* Ajustement du champ de recherche */
}

.search-button {
  background-color: #008080;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
}

.search-button i {
  font-size: 18px;
}

.search-button:hover {
  background-color: #006666;
}

.item-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  justify-items: center;
  margin-top: 20px;
  width: 90%;
  max-width: 1000px; /* Largeur maximale de la grille des articles */
}

/* Item (cercle) */
.item {
  text-align: center;
  position: relative;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.add-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 128, 128, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
}

.add-btn:hover {
  background-color: #006666;
}

/* Texte */
.item-price {
  font-weight: bold;
  font-size: 16px;
  margin-top: 5px;
}

.item-name {
  font-size: 14px;
  color: #555;
}

/* Media Queries pour la réactivité */

/* Tablettes et écrans moyens */
@media (max-width: 1024px) {
  .search-bar {
    width: 80%; /* Adapter la largeur de la barre de recherche */
  }

  .item-list {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes */
    gap: 30px; /* Espacement réduit entre les cartes */
  }
}

/* Mobiles */
@media (max-width: 768px) {
  .search-bar {
    width: 80%;
  }

  .item-list {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes */
    gap: 20px; /* Espacement plus petit */
  }

  .item-price {
    font-size: 14px; /* Ajuster la taille de la police */
  }

  .item-name {
    font-size: 12px; /* Ajuster la taille de la police */
  }
}

</style>