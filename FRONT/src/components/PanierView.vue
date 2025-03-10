<template>
  <div class="cart-page">
    <div class="cart-container">
      <h2>Votre Panier</h2>

      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Votre panier est vide.</p>
      </div>

      <div v-else>
        <!-- Liste des articles du panier -->
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <div class="cart-item-details">
            <h3>{{ item.name }}</h3>
            <p>Prix : {{ item.price }} CFA</p>
            <div class="quantity-control">
              <button @click="decreaseQuantity(index)" :disabled="item.quantity <= 1">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(index)">+</button>
            </div>
            <p>Total : {{ (item.price * item.quantity).toFixed(2) }} CFA</p>
            <button @click="removeFromCart(index)" class="remove-item">Supprimer</button>
          </div>
        </div>

        <!-- Total du panier -->
        <div class="cart-total">
          <h3>Total : {{ totalPrice }} CFA</h3>
          <button @click="checkout" class="checkout-button">Passer à la caisse</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Charger les items du panier depuis le localStorage
      cartItems: JSON.parse(localStorage.getItem('cart')) || [], // S'il n'y a rien, on initialise un tableau vide
    };
  },
  computed: {
    // Calcul du total du panier
    totalPrice() {
      return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    },
  },
  methods: {
    // Méthode pour augmenter la quantité d'un produit
    increaseQuantity(index) {
      this.cartItems[index].quantity++;
      this.updateLocalStorage(); // Mise à jour du localStorage après modification
    },
    // Méthode pour diminuer la quantité d'un produit
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
        this.updateLocalStorage(); // Mise à jour du localStorage après modification
      }
    },
    // Méthode pour supprimer un produit du panier
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
      this.updateLocalStorage(); // Mise à jour du localStorage après suppression
    },
    updateLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },
    checkout() {
      alert("Passer à la caisse");
    },
  },
  watch: {
    cartItems(newCartItems) {
      localStorage.setItem('cart', JSON.stringify(newCartItems));
    },
  },
};
</script>

<style scoped>
  /* Style global de la page */
  .cart-page {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    background-color: #f8f8f8;
  }
  
  /* Conteneur principal */
  .cart-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
  }
  
  h2 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  /* Style des éléments du panier */
  .cart-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .cart-item-details h3 {
    font-size: 18px;
    font-weight: bold;
  }
  
  .cart-item p {
    font-size: 16px;
    margin: 5px 0;
  }
  
  /* Boutons de gestion des quantités */
  .quantity-control {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .quantity-control button {
    background-color: #0a2850;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .quantity-control button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  /* Bouton supprimer */
  .remove-item {
    background-color: #ff4040;
    color: white;
    padding: 8px 12px;
    border-radius: 5px;
    border: none;
    /* #0a2850 */
    border-radius: 25px;
    cursor: pointer;
  }
  
  .remove-item:hover {
    background-color: #cc3333;
  }
  
  /* Total du panier */
  .cart-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  
  /* Bouton de paiement */
  .checkout-button {
    background-color: #0a2850;
    color: white;
    padding: 12px 20px;
    border-radius: 5px;
    border: none;
    transition: ease-in;
    border-radius: 25px;
    cursor: pointer;
    width: 100%;
  }
  
  .checkout-button:hover {
    background-color: #006666;
  }
  
  /* Panier vide */
  .empty-cart {
    text-align: center;
    font-size: 18px;
    color: #888;
  }
</style>
  