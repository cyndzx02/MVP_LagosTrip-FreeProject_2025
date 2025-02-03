<template>
  <div class="container-resumeCommand">
    <form @submit.prevent="submitForm" class="form-container-resumeCommand">
      <header class="head">
        <router-link to="/Paiement" class="head">
          <h2>
            <i class="fas fa-arrow-left head"></i> Resumé des informations
          </h2>
        </router-link>
      </header>

      <!-- Barre de progression -->
      <div class="progress-bar-resumeCommand">
        <button class="step-resumeCommand">1</button>
        <button class="step-resumeCommand active-resumeCommand">2</button>
        <button class="step-resumeCommand">3</button>
      </div>

      <!-- Traité horizontal stylisé -->
      <hr class="progress-separator-resumeCommand" />

      <!-- Titre avec icône -->

      <!-- Informations de livraison -->
      <section class="delivery-info-resumeCommand">
        <div class="summary-container-resumeCommand">
          <div class="card-resumeCommand" @click="toggleSummary">
            <h3 class="h3_resume">Résumé de la commande</h3>
            <p class="p_resume" v-if="showSummary">
              Prix total : {{ totalPrice }} CFA
            </p>
            <p class="p_resume" v-if="showSummary">
              Prix de livraison : {{ deliveryPrice }} CFA
            </p>
          </div>

          <div class="card-resumeCommand" @click="toggleProducts">
            <h3 class="ul_resume">Liste des produits</h3>
            <p class="p_resume" v-if="showProducts">
              Cliquez pour afficher les détails
            </p>
            <ul class="ul_resume" v-if="showProducts">
              <li
                class="li_resume"
                v-for="(product, index) in cartItems"
                :key="index"
              >
                {{ product.name }} - {{ product.price }} CFA
              </li>
            </ul>
          </div>
          <div class="card-resumeCommand" @click="toggleLocationInfo">
            <h3 class="h3_resume">Informations de localisation</h3>
            <p class="p_resume" v-if="showLocationInfo">
              Ville : {{ location.city }}<br />
              Quartier : {{ location.district }}<br />
              <!-- Téléphone : {{ location.phone }} -->
            </p>
          </div>
        </div>
        <button
          class="btn-resumeCommand"
          type="submit"
          @click="this.$router.push({ name: 'PageChekValidCart' })"
        >
          Suivant
        </button>
      </section>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: JSON.parse(localStorage.getItem("cart")) || [],
      deliveryPrice: 10,
      location: {
        city: "",
        district: "",
        phone: "",
      },
      showSummary: false,
      showProducts: false,
      showLocationInfo: false,
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
    },
  },
  mounted() {
    // Récupérer les données de livraison depuis localStorage
    const storedLocation = JSON.parse(localStorage.getItem("deliveryLocation"));
    if (storedLocation) {
      this.location.city = storedLocation.city || "";
      this.location.district = storedLocation.district || "";
      this.location.phone = storedLocation.phone || "";
    }
  },
};
</script>

<style scoped>
.head {
  text-decoration: none;
  color: black;
}

.form-container-resumeCommand {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f8f8f8;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
}
.container-resumeCommand {
  /* margin-top: 0.5cm; */
  /* padding: 20px; */
  display: flex;
  text-decoration: none;
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
  text-decoration: none;
  color: black;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.card-resumeCommand {
  text-decoration: none;
  color: black;
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
  text-decoration: none;
  /* color: black; */
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
  background-color: rgb(14, 14, 100);;
  color: white;
}

.step-resumeCommand:hover {
  background-color: rgb(6, 6, 212);;
  color: white;
}

.progress-separator-resumeCommand {
  width: 90%;
  border: none;
  height: 2px;
  background: linear-gradient(to right, rgb(6, 6, 66), #345050, #084747);
}

.btn-resumeCommand {
  padding: 10px 20px;
  margin-right: 3cm;
  width: 100%;
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

  .btn-resumeCommand {
    font-size: 14px;
  }
}
</style>
