<template>
    <div class="container">
      
      <form @submit.prevent="submitForm" class="form-container">
  
        <header>
          <i class="fas fa-arrow-left"></i>
          <h2> Resumé des informations</h2>
        </header>
  
        <!-- Barre de progression -->
        <div class="progress-bar">
          <button class="step">1</button>
          <button class="step active">2</button>
          <button class="step">3</button>
        </div>
  
        <!-- Traité horizontal stylisé -->
        <hr class="progress-separator">
  
        <!-- Titre avec icône -->
       
        <!-- Informations de livraison -->
        <section class="delivery-info">
            <div class="summary-container">
    <div class="card" @click="toggleSummary">
      <h3>Résumé de la commande</h3>
      <p v-if="showSummary">Prix total : {{ totalPrice }} €</p>
      <p v-if="showSummary">Prix de livraison : {{ deliveryPrice }} €</p>
    </div>

    <div class="card" @click="toggleProducts">
      <h3>Liste des produits</h3>
      <p v-if="showProducts">Cliquez pour afficher les détails</p>
      <ul v-if="showProducts">
        <li v-for="(product, index) in cartItems" :key="index">
          {{ product.name }} - {{ product.price }} €
        </li>
      </ul>
    </div>
    <div class="card" @click="toggleLocationInfo">
            <h3>Informations de localisation</h3>
            <p v-if="showLocationInfo">
              Ville : {{ location.city }}<br>
              Quartier : {{ location.district }}<br>
              <!-- Téléphone : {{ location.phone }} -->
            </p>
          </div>

    
  </div>
          <button class="btn" type="submit" @click="this.$router.push({ name: 'PageChekValidCart' });">Suivant</button>
        </section>
      </form>
    </div>
  </template>




<script>
export default {
  data() {
    return {
      cartItems: JSON.parse(localStorage.getItem('cart')) || [],
      deliveryPrice: 10, 
      location: {
        city: '',
        district: '',
        phone: ''
      },
      showSummary: false,
      showProducts: false,
      showLocationInfo: false
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2);
    },
  },
  methods: {
    toggleSummary() {
      this.showSummary = !this.showSummary;
    },
    toggleProducts() {
      this.showProducts = !this.showProducts;
    },
    toggleLocationInfo() {
      this.showLocationInfo = !this.showLocationInfo;
    }
  },
  mounted() {
    // Récupérer les données de livraison depuis localStorage
    const storedLocation = JSON.parse(localStorage.getItem('deliveryLocation'));
    if (storedLocation) {
      this.location.city = storedLocation.city || '';
      this.location.district = storedLocation.district || '';
      this.location.phone = storedLocation.phone || '';
    }
  }
};
</script>

<style scoped>
.container-resumeCommand {
  /* margin-top: 0.5cm; */
  /* padding: 20px; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f8f8f8;
  padding: 20px;
  box-sizing: border-box;
}

.summary-container-resumeCommand {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.card-resumeCommand {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 5%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.card-resumeCommand .resume-command {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.card-resumeCommand .p_resume {
  margin: 10px 0;
  font-size: 16px;
}

.card-resumeCommand .ul_resume {
  list-style: none;
  padding: 0;
}

.card-resumeCommand .li_resume {
  font-size: 14px;
  margin: 5px 0;
}

/* Animation au survol */
/* .card:hover {
  background-color: #f0f0f0;
  transform: translateY(-5px);
} */

/* Styles de la barre de progression */
.progress-bar-resumeCommand {
  display: flex;
  gap: 40px;
  justify-content: center;
}

.step-resumeCommand {
  width: 40px;
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: black;
  cursor: pointer;
  transition: background-color 0.3s;
}

.step-resumeCommand.active-resumeCommand {
  background-color: #008080;
  color: white;
}

.step-resumeCommand:hover {
  background-color: #006666;
  color: white;
}

.progress-separator-resumeCommand {
  width: 90%;
  border: none;
  height: 2px;
  background: linear-gradient(to right, #008080, #00b3b3, #008080);
}

.btn-resumeCommand {
  padding: 10px 20px;
  margin-right: 2cm;
  background-color: rgb(6, 6, 66);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* .btn:hover {
  background-color: #45a049;
} */

/* Lorsque l'écran est plus petit que 768px */
@media (max-width: 768px) {
  .summary-container-resumeCommand {
    padding: 15px;
    width: 100%;
  }

  .card-resumeCommand .resume-command {
    font-size: 18px;
  }

  .card-resumeCommand .p_resume {
    font-size: 14px;
  }

  .card-resumeCommand .li_resume {
    font-size: 12px;
  }

  .progress-bar-resumeCommand {
    gap: 20px; /* Moins d'espace entre les étapes */
  }

  .step-resumeCommand {
    width: 25px;
    height: 25px;
    font-size: 12px;
  }

  .btn-resumeCommand {
    width: 100%; /* Le bouton "Suivant" prend toute la largeur de l'écran */
    padding: 12px;
    font-size: 16px;
  }
}

/* Lorsque l'écran est plus petit que 480px (mobiles très petits) */
@media (max-width: 480px) {
  .card-resumeCommand {
    padding: 15px; /* Réduire la marge intérieure des cartes */
  }

  .progress-bar-resumeCommand {
    gap: 20px;
  }

  .btn-resumeCommand{
    font-size: 14px;
  }
}
</style>
