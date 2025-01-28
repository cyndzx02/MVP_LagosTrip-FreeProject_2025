<template>
  <div class="page-container">
    <header class="app-header">
      <h2>Mon Application</h2>
    </header>

    <main class="main-content">
      <div class="mascot-section">
        <img src="@/assets/OIP-removebg-preview.png" alt="Mascotte" class="mascot-image" />
        <div class="content-group">
          <h4 class="welcome-text">Welcome dear visitor ! <br> let's create your own area.</h4>
          <div class="button-group">
            <button class="signin-button" @click="this.$router.push('/Signin')">Sign In</button>
            <button class="signup-button" @click="this.$router.push('/Signup')">Sign Up</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  methods: {
    handleSignin() {
      alert(`Email: ${this.email}, Mot de passe: ${this.password}`);
    },
    handleSignup() {
      alert("Connexion avec Google !");
    },
  }
};
</script>

<style scoped>
/* Conteneur principal */
.page-container {
  background: linear-gradient(to bottom, #a15d4f, #7fc1d8); /* Dégradé de marron à bleu */
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
}

/* En-tête */
.app-header {
  padding: 20px 30px;
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
  text-align: left;
  border-bottom: 2px solid #f0f0f0;
}

/* Contenu principal */
.main-content {
  display: flex;
  margin-left: 120px;
  flex-grow: 1;
}

/* Section avec mascotte et contenu */
.mascot-section {
  display: flex;
  align-items: center;
  gap: 160px; /* Espace entre la mascotte et le contenu */
}

/* Image de la mascotte */
.mascot-image {
  width: 200px;
  height: 300px;
}

/* Groupe de contenu (texte et boutons) */
.content-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin-left: 150px;
}

/* Texte de bienvenue */
.welcome-text {
  font-size: 1.2rem;
  color: #fff; /* Texte en blanc pour contraster avec le fond */
  margin: 0;
  font-weight: bold;
}

/* Boutons */
.button-group {
  display: flex;
  gap: 30px;
}

/* Styles des boutons */
button {
  width: 120px;
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Style bouton Sign In */
.signin-button {
  background-color: #007bff;
  color: white;
  border-radius: 50px;
}

.signin-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

/* Style bouton Sign Up */
.signup-button {
  background-color: #28a745;
  color: white;
  border-radius: 50px;
}

.signup-button:hover {
  background-color: #1e7e34;
  transform: translateY(-2px);
}
</style>
