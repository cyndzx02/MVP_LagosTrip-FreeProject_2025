<template>
    <div class="product-page">
      <div class="product-container">
        <!-- Image en cercle -->
        <div class="product-image">
          <img :src="product.image" alt="Aliment" />
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
  export default {
    data() {
      return {
        product: {
          name: "Aliment Exemple",
          price: 10, // Prix par unité
          image: "https://via.placeholder.com/200", // Image de l'aliment
        },
        quantity: 1, // Quantité par défaut
      };
    },
    computed: {
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
        this.quantity = Math.max(1, this.quantity); // Empêcher la quantité d'être inférieure à 1
      },
      addToCart() {
        console.log(`${this.quantity} x ${this.product.name} ajouté(s) au panier`);
        // Ajouter la logique pour ajouter au panier ici
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
