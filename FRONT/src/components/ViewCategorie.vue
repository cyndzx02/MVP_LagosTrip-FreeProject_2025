<template>
  <div class="container">
    <header>
      <i class="fas fa-arrow-left"></i>
      <h2>{{ category }}</h2> <!-- Affiche le titre en fonction de la catégorie -->
    </header>

    <div class="search-bar">
      <input type="text" placeholder="Rechercher..." v-model="searchQuery" />
      <button class="search-button" @click="search">
        <i class="fas fa-search"></i> 
      </button>
    </div>

    <div class="item-list">
      <div class="item" v-for="(item, index) in filteredItems" :key="index">
        <div class="circle">
          <img :src="item.image" alt="Produit" class="item-image" />
          <button class="add-btn" @click="goToSpecifiqueFood(item.name)"><i class="fas fa-plus"></i></button>
        </div>
        <p class="item-price">{{ item.price }} €</p>
        <p class="item-name">{{ item.name }}</p>
      </div>
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

// Viandes
import Boeuf from "../assets/Meats/beef.png"
import Chicken_Breast from "../assets/Meats/chicken-breast.png"
import Chicken_Meat from "../assets/Meats/chicken-meat.png"
import rawMeat from "../assets/Meats/rawMeat.png"

// Fruits
import Banane from "../assets/Fruits/banane.png"
import Fraise from "../assets/Fruits/fraise.png"
import Orange from "../assets/Fruits/orange.png"
import Kiwi from "../assets/Fruits/kiwi.png"
import Passion_Fruits from "../assets/Fruits/passionFruit.png"

// Fishes
import Tilapia from "../assets/Fishes/tilapia.png"
import Sardine from "../assets/Fishes/sardine.png"
import Tuna from "../assets/Fishes/tuna.png"

export default {
  data() {
    return {
      searchQuery: "",
      category: this.$route.params.category, // Récupérer le paramètre 'category' de l'URL
      items: {
        Légumes: [
          { name: "Carotte", price: 20, image:  Carotte},
          { name: "Tomate",  price: 50, image: Tomate },
          { name: "Ails",  price: 50, image: Ails },
          { name: "Aubergine",  price: 50, image: Aubergine },
          { name: "Concombre",  price: 50, image: Concombre },
          { name: "Ginger",  price: 50, image: Ginger },
          { name: "Gombo",  price: 50, image: Gombo },
          { name: "Haricot Rouge",  price: 50, image: Haricot_Rouge },
          { name: "Haricot Vert",  price: 50, image: Haricot_Vert },
          { name: "Laittue",  price: 50, image: Laittue },
        ],
        Viandes: [
          { name: "Bœuf", price: 50, image: Boeuf },
          { name: "Chicken Breast", price: 30, image:  Chicken_Breast},
          { name: "Chicken Meat", price: 30, image:  Chicken_Meat},
          { name: "Raw Meat", price: 30, image:  rawMeat},
        ],
        Poissons: [
          { name: "Tilapia", price: 50, image:  Tilapia},
          { name: "Tuna", price: 30, image:  Tuna},
          { name: "Sardine", price: 30, image:  Sardine},
        ],
        Fruits: [
          { name: "Banane", price: 50, image:  Banane},
          { name: "Kiwi", price: 320, image: Kiwi },
          { name: "Fraise", price: 300, image: Fraise },
          { name: "Orange", price: 30, image: Orange },
          { name: "Fruit de la passion", price: 30, image: Passion_Fruits },
        ],

      },
    };
  },
  created() {
    console.log("Catégorie récupérée:", this.category); // Affiche la catégorie dans la console
  },
  computed: {
    
    filteredItems() {
      // Filtrer les items en fonction de la catégorie et de la recherche
      const categoryItems = this.items[this.category] || []; // Vérifier si la catégorie existe
      return categoryItems.filter(item => {
        return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  methods: {
    search() {
      console.log("Recherche effectuée pour : ", this.searchQuery);
    },
    goToSpecifiqueFood(foodName) {
    this.$router.push({ name: 'SpecifiqueFood', params: { foodName: foodName } });
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