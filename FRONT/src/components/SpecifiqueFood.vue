<template>
  <div class="product-page">
    <div class="product-container">
      <!-- Image en cercle -->
      <div class="product-image">
        <img :src="product.image" alt="Produit" />
      </div>

      <!-- Détails du produit -->
      <div class="product-details">
        <h2>{{ product.name }}</h2>
        <p class="price">{{ computedPrice }} €</p>

        <!-- Sélecteur de quantité -->
        <div class="quantity-selector">
          <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
          <input type="number" v-model="quantity" min="1" @input="updatePrice" />
          <button @click="increaseQuantity">+</button>
        </div>

        <!-- Bouton Ajouter au panier -->
        <button class="add-to-cart" @click="addToCart">Ajouter au panier</button>
      </div>
    </div>
  </div>
</template>

<script>
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

import Boeuf from "../assets/Meats/beef.png";
import Chicken_Breast from "../assets/Meats/chicken-breast.png";
import Chicken_Meat from "../assets/Meats/chicken-meat.png";
import rawMeat from "../assets/Meats/rawMeat.png";

import Banane from "../assets/Fruits/banane.png";
import Fraise from "../assets/Fruits/fraise.png";
import Orange from "../assets/Fruits/orange.png";
import Kiwi from "../assets/Fruits/kiwi.png";
import Passion_Fruits from "../assets/Fruits/passionFruit.png";

import Tilapia from "../assets/Fishes/tilapia.png";
import Sardine from "../assets/Fishes/sardine.png";
import Tuna from "../assets/Fishes/tuna.png";

export default {
  data() {
    return {
      quantity: 1, // Quantité par défaut
      foodName: this.$route.params.foodName, // Récupérer le foodName de l'URL
      products: [
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
        { name: "Bœuf", price: 50, image: Boeuf },
        { name: "Chicken Breast", price: 30, image: Chicken_Breast },
        { name: "Chicken Meat", price: 30, image: Chicken_Meat },
        { name: "Raw Meat", price: 30, image: rawMeat },
        { name: "Tilapia", price: 50, image: Tilapia },
        { name: "Tuna", price: 30, image: Tuna },
        { name: "Sardine", price: 30, image: Sardine },
        { name: "Banane", price: 50, image: Banane },
        { name: "Kiwi", price: 320, image: Kiwi },
        { name: "Fraise", price: 300, image: Fraise },
        { name: "Orange", price: 30, image: Orange },
        { name: "Fruit de la passion", price: 30, image: Passion_Fruits },
      ],
    };
  },
  computed: {
    product() {
      return this.products.find(product => product.name === this.foodName);
    },
    computedPrice() {
      return (this.product.price * this.quantity).toFixed(2); // Calcul dynamique du prix
    },
  },
  methods: {
  increaseQuantity() {
    this.quantity++;
  },
  decreaseQuantity() {
    if (this.quantity > 1) this.quantity--;
  },
  updatePrice() {
    this.quantity = Math.max(1, this.quantity);
  },
  addToCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.name === this.product.name);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += this.quantity;
      cart[existingProductIndex].totalPrice = (cart[existingProductIndex].price * cart[existingProductIndex].quantity).toFixed(2);
    } else {
      const productData = {
        name: this.product.name,
        price: this.product.price,
        quantity: this.quantity,
        totalPrice: (this.product.price * this.quantity).toFixed(2),
      };
      cart.push(productData);
    }

    // Sauvegarder le panier dans le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    this.$router.push({ name: 'Panier'});

    // let to = JSON.parse(localStorage.getItem('cart'));
    // console.log(to);
  },
},

};
</script>
  
  <style scoped>
/* Container principal */
.product-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
}

.product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

/* Image du produit */
.product-image img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

/* Détails du produit */
.product-details {
  text-align: center;
  margin-top: 20px;
}

.product-details h2 {
  font-size: 22px;
  font-weight: bold;
}

.price {
  font-size: 18px;
  color: #008080;
  margin-top: 10px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.quantity-selector button {
  background-color: #008080;
  color: white;
  border: none;
  padding: 10px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}

.quantity-selector input {
  width: 60px;
  padding: 5px;
  text-align: center;
  font-size: 18px;
  margin: 0 10px;
}

.add-to-cart {
  background-color: #008080;
  color: white;
  padding: 15px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
}

.add-to-cart:hover {
  background-color: #006666;
}

/* Media Queries pour rendre la page responsive */

/* Pour les petits écrans comme les smartphones */
@media (max-width: 600px) {
  .product-container {
    padding: 30px;
  }

  .product-image img {
    width: 120px;
    height: 120px;
  }

.product-details h2 {
    font-size: 18px;
  }

  .price {
    font-size: 16px;
  }

  .quantity-selector button {
    padding: 8px;
    font-size: 16px;
  }

  .quantity-selector input {
    width: 50px;
    font-size: 16px;
  }

  .add-to-cart {
    font-size: 16px;
    padding: 12px;
  }
}

/* Pour les tablettes */
@media (max-width: 900px) {
  .product-container {
    padding: 50px;
  }

  .product-image img {
    width: 130px;
    height: 130px;
  }

  .product-details h2 {
    font-size: 20px;
  }

  .price {
    font-size: 17px;
  }

  .quantity-selector button {
    padding: 9px;
    font-size: 17px;
  }

  .quantity-selector input {
    width: 55px;
    font-size: 17px;
  }

  .add-to-cart {
    font-size: 17px;
    padding: 14px;
  }
}

/* Pour les grands écrans */
@media (min-width: 1200px) {
  .product-container {
    padding: 60px;
  }

  .product-image img {
    width: 150px;
    height: 150px;
  }

  .product-details h2 {
    font-size: 22px;
  }

  .price {
    font-size: 18px;
  }

  .quantity-selector button {
    padding: 10px;
    font-size: 18px;
  }

  .quantity-selector input {
    width: 60px;
    font-size: 18px;
  }

  .add-to-cart {
    font-size: 18px;
    padding: 15px;
  }
}
</style>
