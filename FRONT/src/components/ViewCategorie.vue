<template>
  <div class="container-viewCategory">
    <div class="arrow-category">
      <router-link to="/home" class="arrow-category">
        <p class="arrow-category"><i class="fas fa-arrow-left"> </i> {{category}}</p>
      </router-link>
    </div>
    <header></header>
    <div class="search-bar-category">
      <input type="text" placeholder="Rechercher..." v-model="searchQuery" />
      <button class="search-button-category " @click="search">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <div class="item-list-category ">
      <div class="item-category " v-for="(item, index) in filteredItems" :key="index">
        <div class="circle-category ">
          <img :src="item.image"  alt="Produit" class="item-image-category " />
          <button class="add-btn-category " @click="goToSpecifiqueFood(item.name)">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <p class="item-price-category ">{{ item.price }} €</p>
        <p class="item-name-category ">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// Veggies
import Tomate from "../assets/Veggies/tomato.png";
import Ails from "../assets/Veggies/ails.png";
import Aubergine from "../assets/Veggies/aubergine.png";
import Carotte from "../assets/Veggies/carotte.png";
import Concombre from "../assets/Veggies/concombre.png";
import Ginger from "../assets/Veggies/ginger.png";
import Gombo from "../assets/Veggies/gombo.png";
import Haricot_Rouge from "../assets/Veggies/haricotrouge.png";
import Haricot_Vert from "../assets/Veggies/haricotvert.png";
import Laittue from "../assets/Veggies/laittue.png";
import Epinard from "../assets/Veggies/epinard.png"
import Piment from "../assets/Veggies/piment.png"
import Oignon from "../assets/Veggies/oignon.png"
import Persil from "../assets/Veggies/persil.png"
import Poivron from "../assets/Veggies/poivron.png"


// Dairies
import Lait from "../assets/Dairies/milk.png"
import eeg from "../assets/Dairies/oeuf.png"

// Viandes
import Boeuf from "../assets/Meats/beef.png";
import Chicken_Breast from "../assets/Meats/chicken-breast.png";
import Chicken_Meat from "../assets/Meats/chicken-meat.png";
import rawMeat from "../assets/Meats/rawMeat.png";
import Filet_de_boeuf from "../assets/Meats/file-de-boeuf.png"
import Gesier from "../assets/Meats/gesier poulet.png"
import pouletPoitrine from "../assets/Meats/poitrine-poulet.png"
import rosbif from "../assets/Meats/rosbif-boeuf.png"

// Fruits
import Banane from "../assets/Fruits/banane.png";
import Fraise from "../assets/Fruits/fraise.png";
import Orange from "../assets/Fruits/orange.png";
import Kiwi from "../assets/Fruits/kiwi.png";
import Passion_Fruits from "../assets/Fruits/passionFruit.png";

// Fishes
import Saumon_oeuf from "../assets/Fishes/Oeuf saumon.png"
import saumon_sliced from "../assets/Fishes/saumon-lamelle.png"
import saumon_cut from "../assets/Fishes/saumon.png"
import Tilapia from "../assets/Fishes/tilapia.png";
import Sardine from "../assets/Fishes/sardine.png";
import Tuna from "../assets/Fishes/tuna.png";




export default {
  data() {
    return {
      searchQuery: "",
      category: this.$route.params.category, // Récupérer le paramètre 'category' de l'URL
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
          {name: "Epinard", price: 100, image: Epinard},
          {name: "Oignon", price: 24, image: Oignon},
          {name: "Persil", price: 7, image: Persil},
          {name: "Poivron", price: 56, image: Poivron},
          {name: "Piment", price: 637, image: Piment},
        ],
        Viandes: [
          { name: "Bœuf", price: 50, image: Boeuf },
          { name: "Chicken Breast", price: 30, image: Chicken_Breast },
          { name: "Chicken Meat", price: 30, image: Chicken_Meat },
          { name: "Raw Meat", price: 30, image: rawMeat },
          {name: "Filet de boeuf", price: 24, image: Filet_de_boeuf},
          {name: "Rosbif", price:34, image: rosbif},
          {name: "Gesier", price: 24, image: Gesier},
          {name: "Poitrine de Poulet", price: 50, image: pouletPoitrine},
        ],
        Poissons: [
          { name: "Tilapia", price: 50, image: Tilapia },
          { name: "Tuna", price: 30, image: Tuna },
          { name: "Sardine", price: 30, image: Sardine },
          {name: "Saumon", price: 40, image: saumon_sliced},
          {name: "Saumon petit morceaux", price: 50, image: saumon_cut},
          {name: "Oeuf de Saumon", price: 39, image: Saumon_oeuf},
        ],
        Fruits: [
          { name: "Banane", price: 50, image: Banane },
          { name: "Kiwi", price: 320, image: Kiwi },
          { name: "Fraise", price: 300, image: Fraise },
          { name: "Orange", price: 30, image: Orange },
          { name: "Fruit de la passion", price: 30, image: Passion_Fruits },
        ],
        Cremeries: [
          {name: "Lait", price: 36, image: Lait},
          {name:"Eeg",price: 367, image: eeg},
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
      return categoryItems.filter((item) => {
        return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    search() {
      console.log("Recherche effectuée pour : ", this.searchQuery);
    },
    goToSpecifiqueFood(foodName) {
      this.$router.push({
        name: "SpecifiqueFood",
        params: { foodName: foodName },
      });
    },
  },
};
</script>

<style scoped>
/* Styles de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.arrow-category{
  margin-top: 0.5%;
  margin-left: 0.5%;
  color:black;
  left: 0;
  position: fixed;
  text-decoration: none;
  margin-right: 5%;
  background-color: #f8f8f8;
}

body {
  font-family: Arial, sans-serif;
}

.container-viewCategory {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  width: 100%;
  min-height: 100vh;
}

.search-bar-category {
  margin-top: 6%;
  position: fixed;
  z-index: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  padding: 5px 10px;
  background-color: #fff;
  margin-bottom: 5%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px;
}

.search-bar-category input {
  border: none;
  outline: none;
  padding: 10px;
  font-size: 16px;
  width: 80%;
}

.search-button-category {
  background-color: #008080;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
}

.search-button-category  i {
  font-size: 18px;
}

.search-button-category:hover {
  background-color: #006666;
}

.item-list-category  {
  /* position: fixed;
  z-index: 100%; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-items: center;
  /* margin-top: 20px; */
  width: 70%;
  max-width: 1000px;
  margin-top: 5cm;
  position:relative;
  z-index: 15%;
}

/* Item (cercle) */
.item-category  {
  text-align: center;
  position: relative;
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.circle-category  {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;
}

.item-image-category  {
  width: 100%;
  height: 100%;
  object-fit: cover;
  scale: 0.1px !important;
}

.add-btn-category  {
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

.add-btn-category:hover {
  background-color: #006666;
}

/* Texte */
.item-price-category  {
  font-weight: bold;
  font-size: 16px;
  margin-top: 5px;
}

.item-name-category  {
  font-size: 14px;
  color: #555;
}

/* Media Queries pour la réactivité */

/* Tablettes et écrans moyens */
@media (max-width: 1024px) {
  .search-bar-category {
    width: 80%; /* Adapter la largeur de la barre de recherche */
  }

  .item-list-category  {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes */
    gap: 30px; /* Espacement réduit entre les cartes */
  }
}

/* Mobiles */
@media (max-width: 768px) {
  .search-bar-category {
    width: 80%;
  }
  
  .item-list-category  {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-items: center;
  margin-top: 20px;
  width: 100%;
  max-width: 1000px;
}
  .item-image-category  {
  width: 100%;
  height: 100%;
  object-fit: cover;
  scale: 0.1px !important;
}
  .item-list-category  {
    /* margin-right: 0.5%;
    margin-left: 0.5%;
    padding-right: 5%; */

    grid-template-columns: repeat(2, 1fr); /* 2 colonnes */
    gap: 20px; /* Espacement plus petit */
    scale: 4px;
    width: -3%;
  }

  .item-price-category  {
    font-size: 14px; /* Ajuster la taille de la police */
  }

  .item-name-category  {
    font-size: 12px; /* Ajuster la taille de la police */
  }
}


</style>
