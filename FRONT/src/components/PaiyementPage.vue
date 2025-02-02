<template>
  <div class="container-paiement">
    <form @submit.prevent="submitForm" class="form-container-paiement">
      <header class="header-paiement">
        <router-link class="arrow-color-paiement" to="/home"> 
          <i class="fas fa-arrow-left arrow-color-paiement"></i>
        </router-link>
        <h2>Programme ta commande</h2>
      </header>

      <!-- Barre de progression -->
      <div class="progress-bar-paiement">
        <button class="step-paiement active-paiement">1</button>
        <button class="step-paiement">2</button>
        <button class="step-paiement">3</button>
      </div>

      <!-- Traité horizontal stylisé -->
      <hr class="progress-separator-paiement">

      <!-- Titre avec icône -->
     
      <!-- Informations de livraison -->
      <section class="delivery-info-paiement">
        <h3><i class="fas fa-map-marker-alt"></i> Adresse de livraison:</h3>
        <div class="form-group-paiement">
          <label for="ville">Ville</label>
          <input type="text" id="ville" v-model="location.city" required placeholder="Entrez votre ville" />
        </div>

        <div class="form-group-paiement">
          <label for="quartier">Quartier</label>
          <input type="text" id="quartier" v-model="location.district" required placeholder="Entrez votre quartier" />
        </div>

        <div class="form-group-paiement">
          <label for="phone">Numéro de téléphone</label>
          <input type="tel" id="phone" v-model="location.phone" required placeholder="Entrez votre numéro de téléphone" />
        </div>

        <button class="btn-paiement rounded-lg" type="submit" @click="this.$router.push({ name: 'ResumeCommand'});
">Suivant</button>
      </section>
    </form>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.min.css';

export default {
  data() {
    return {
      location: {
        city: '',
        district: '',
        phone: ''
      }
    };
  },
  methods: {
    submitForm() {
      console.log("Formulaire soumis", this.location);
    }
  }
};
</script>

<style scoped>
/* Container principal */
.container-paiement {
  /* margin-top: 2%; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
  background-color: #f8f8f8;
  padding: 20px;
  box-sizing: border-box;
}

.arrow-color-paiement{
  position: inherit;
  color: black;
  margin-right: 5%;
}

/* Formulaire */
.form-container-paiement {
  display: flex;
  flex-direction: column;
  gap: 20px; 
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.header-paiement {
  display: flex;
  align-items: center;
  font-size: 15px; 
  font-weight: bold;
}

.progress-bar-paiement {
  display: flex;
  gap: 40px;
  justify-content: center;
}

.step-paiement {
  width: 40px; /* Taille des étapes plus grande */
  height: 40px;
  background-color: #e0e0e0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px; /* Taille de la police plus grande */
  color: black;
  cursor: pointer;
  transition: background-color 0.3s;
}

.step-paiement.active-paiement {
  background-color: #539337;
  color: white;
}

.step-paiement:hover {
  background-color: #125858;
  color: white;
}

.progress-separator-paiement {
  width: 90%;
  border: none;
  height: 2px;
  background: linear-gradient(to right, #0a2850, #0a2850, #008080);
}

.delivery-info-paiement h3 {
  font-size: 18px;
  display: flex;
  align-items: center; /* Alignement de l'icône et du texte */
  gap: 10px; /* Espacement entre l'icône et le texte */
}

.delivery-info-paiement .form-group-paiement {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espacement entre les champs du formulaire */
}

label {
  font-size: 16px;
  font-weight: bold;
}

input {
  padding: 12px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
}

input[type="tel"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.btn-paiement {
  padding: 14px;
  width: 100%;
  background-color: #0a2850;
  color: white;
  border-radius: 5px;
  text-align: center;
  font-size: 18px; /* Taille du texte du bouton plus grande */
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}

.btn-paiement:hover {
  background-color: #0a2850;
}

h3 i {
  color: #f15411; /* Choisissez la couleur que vous préférez */
}


/* Responsive */
@media (max-width: 600px) {
  .form-container-paiement {
    width: 100%; /* Prend toute la largeur sur les petits écrans */
    padding: 20px;
  }

.header-paiement {
    font-size: 18px;
  }

  .step-paiement {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }

  .progress-bar-paiement {
    gap: 20px; /* Moins d'espace entre les étapes */
  }

  .delivery-info-paiement h3 {
    font-size: 16px; /* Réduit la taille du titre */
  }

  input {
    padding: 10px;
    font-size: 14px; /* Plus petit texte d'entrée */
  }

  .btn-paiement {
    font-size: 16px; /* Réduit la taille du bouton sur mobile */
    padding: 12px;
  }
}
</style>
