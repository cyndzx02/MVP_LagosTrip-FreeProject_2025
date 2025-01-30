<template>
  <div class="container">
    
    <form @submit.prevent="submitForm" class="form-container">

      <header>
        <i class="fas fa-arrow-left"></i>
        <h2>Programme ta commande</h2>
      </header>

      <!-- Barre de progression -->
      <div class="progress-bar">
        <button class="step active">1</button>
        <button class="step">2</button>
        <button class="step">3</button>
      </div>

      <!-- Traité horizontal stylisé -->
      <hr class="progress-separator">

      <!-- Titre avec icône -->
     
      <!-- Informations de livraison -->
      <section class="delivery-info">
        <h3><i class="fas fa-map-marker-alt"></i> Adresse de livraison:</h3>
        <div class="form-group">
          <label for="ville">Ville</label>
          <input type="text" id="ville" v-model="location.city" required placeholder="Entrez votre ville" />
        </div>

        <div class="form-group">
          <label for="quartier">Quartier</label>
          <input type="text" id="quartier" v-model="location.district" required placeholder="Entrez votre quartier" />
        </div>

        <div class="form-group">
          <label for="phone">Numéro de téléphone</label>
          <input type="tel" id="phone" v-model="location.phone" required placeholder="Entrez votre numéro de téléphone" />
        </div>

        <button class="btn" type="submit">Suivant</button>
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

<style>
/* Container principal */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
  background-color: #f8f8f8;
  padding: 20px;
  box-sizing: border-box;
}

/* Formulaire */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espacement plus grand entre les éléments */
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px; /* Agrandit la largeur du formulaire */
}

header {
  display: flex;
  align-items: center;
  font-size: 15px; /* Augmentation de la taille de la police */
  font-weight: bold;
}

.progress-bar {
  display: flex;
  gap: 40px;
  justify-content: center;
}

.step {
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

.step.active {
  background-color: #008080;
  color: white;
}

.step:hover {
  background-color: #006666;
  color: white;
}

.progress-separator {
  width: 90%;
  border: none;
  height: 2px;
  background: linear-gradient(to right, #008080, #00b3b3, #008080);
}

.delivery-info h3 {
  font-size: 18px;
  display: flex;
  align-items: center; /* Alignement de l'icône et du texte */
  gap: 10px; /* Espacement entre l'icône et le texte */
}

.delivery-info .form-group {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espacement entre les champs du formulaire */
}

label {
  font-size: 16px; /* Plus grande taille de texte pour les labels */
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

.btn {
  padding: 14px;
  width: 100%;
  background-color: #008080;
  color: white;
  border-radius: 5px;
  text-align: center;
  font-size: 18px; /* Taille du texte du bouton plus grande */
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #006666;
}

h3 i {
  color: #f15411; /* Choisissez la couleur que vous préférez */
}


/* Responsive */
@media (max-width: 600px) {
  .form-container {
    width: 100%; /* Prend toute la largeur sur les petits écrans */
    padding: 20px;
  }

  header {
    font-size: 18px;
  }

  .step {
    width: 35px;
    height: 35px;
    font-size: 18px;
  }

  .progress-bar {
    gap: 20px; /* Moins d'espace entre les étapes */
  }

  .delivery-info h3 {
    font-size: 16px; /* Réduit la taille du titre */
  }

  input {
    padding: 10px;
    font-size: 14px; /* Plus petit texte d'entrée */
  }

  .btn {
    font-size: 16px; /* Réduit la taille du bouton sur mobile */
    padding: 12px;
  }
}
</style>
