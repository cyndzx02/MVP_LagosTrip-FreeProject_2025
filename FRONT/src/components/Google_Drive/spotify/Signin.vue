<template>
  <div class="login-container">
    <div class="login-form">
      <h4>Connectez-vous à votre compte</h4>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input type="email" id="email" v-model="email" placeholder="Entrez votre email" required />
        </div>

        <div class="form-group">
          <input type="password" id="password" v-model="password" placeholder="Entrez votre mot de passe" required />
        </div>

        <button type="submit" class="btn-login">Se connecter</button>
      </form>

      <div class="separator">
        <span>Ou</span>
      </div>

      <div class="social-login">
        <button @click="loginWithGoogle" class="btn-google">
          <img src="@/assets/google_img.png" alt="Google Logo">
          Connexion avec Google
        </button>
        <button @click="loginWithFacebook" class="btn-facebook">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="Facebook Logo" />
          Connexion avec Facebook
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Sign_in',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      this.clearErrors();

      if (!this.email || !this.isValidEmail(this.email)) {
        return alert('Veuillez entrer un email valide.');
      }
      if (!this.password || this.password.length < 4 || this.password.length > 60) {
        return alert('Votre mot de passe doit contenir entre 4 et 60 caractères.');
      }

      try {
        const response = await axios.post('http://localhost:8080/api/users/login', {
          email: this.email,
          password: this.password,
        });

        if (response.data.message) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('email', this.email);

          // localStorage.setItem('id', response.data.id);
          // localStorage.setItem('isAdmin', response.data.isAdmin);
          console.log(response.data.isAdmin)
          if (response.data.isAdmin) {
            this.$router.push('/Page_administrateur');

          } else {
            this.$router.push('/Main');


          }
        } else {
          alert(response.data.message || 'Échec de la connexion');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
      }
    },
    isValidEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    clearErrors() {
      this.emailError = '';
      this.passwordError = '';
    },
    loginWithGoogle() {
      // Ouvrir une fenêtre popup pour l'authentification Google
      const googleAuthPopup = window.open('http://localhost:8080/api/users/google-login', '_blank', 'width=600,height=600');

      // Attendre le message du popup (quand l'utilisateur se connecte avec Google)
      const handleGoogleAuthResponse = (event) => {
        if (event.origin === 'http://localhost:8080' && event.data.token) {
          // Sauvegarder le token dans le localStorage
          localStorage.setItem('authToken', event.data.token);

          // Fermer la popup une fois l'authentification terminée
          googleAuthPopup.close();
          // Rediriger l'utilisateur vers la page principale
          this.$router.push('/Main');
        }
      };

      // Ajouter l'écouteur d'événement pour recevoir le message
      window.addEventListener('message', handleGoogleAuthResponse, false);
    },
    loginWithFacebook() {
      // Code à ajouter pour l'authentification avec Facebook si nécessaire
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
}

.app-name {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.login-form {
  background: white;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-form h4 {
  margin-bottom: 20px;
  color: #555;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
}

.form-group input:focus {
  border-color: #007bff;
  outline: none;
}

.btn-login {
  width: 100%;
  padding: 5px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
}

.btn-login:hover {
  background-color: #0056b3;
}

.social-login {
  margin-top: 20px;
}

.btn-google,
.btn-facebook {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

.btn-google {
  background-color: #ffffff;
  border: 1px solid #ddd;
}

.btn-google img {
  width: 18px;
  margin-right: 8px;
}

.btn-facebook {
  background-color: #4267b2;
  color: white;
}

.btn-facebook img {
  width: 18px;
  margin-right: 8px;
}

.separator {
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
}

.separator span {
  background: #fff;
  padding: 0 1rem;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #ddd;
}
</style>
