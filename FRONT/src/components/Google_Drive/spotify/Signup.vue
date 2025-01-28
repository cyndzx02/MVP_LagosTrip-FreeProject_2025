<template>
  <div class="login-container">

    <div class="login-form">
      <h4>Inscription</h4>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <input type="text" id="name" v-model="name" placeholder="Entrez votre Nom" required />
        </div>

        <div class="form-group">
          <input type="text" id="surname" v-model="surname" placeholder="Entrez votre Prenom" required />
        </div>

        <div class="form-group">
          <input type="email" id="email" v-model="email" placeholder="Entrez votre email" required />
        </div>

        <div class="form-group">
          <input type="password" id="password" v-model="password" placeholder="Entrez votre mot de passe" required />
        </div>

        <button type="submit" class="btn-login">S'inscrire</button>
      </form>

      <div class="separator">
        <span>Ou</span>
      </div>

      <div class="social-login">
        <button @click="loginWithGoogle" class="btn-google">
          <img src="@/assets/google_img.png" alt="Google Logo" />
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
  name: 'Sign_up',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      surname: '',
    };
  },
  methods: {
    async handleRegister() {
      this.clearErrors();

      if (!this.email || !this.isValidEmail(this.email)) {
        return alert('Please enter a valid email or phone number.');
      }
      if (!this.name || !this.surname) {
        return alert('Please enter your name and surname.');
      }
      if (!this.password || this.password.length < 4 || this.password.length > 60) {
        return alert('Your password must contain between 4 and 60 characters.');
      }

      try {
        const response = await axios.post('http://localhost:8080/api/users/register', {
          email: this.email,
          password: this.password,
          name: this.name,
          surname: this.surname,
        });


        if (response.data.message) {
          console.log(response.data);
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('isAdmin',response.data.isAdmin);
          localStorage.setItem('email', this.email);

          if (response.data.isAdmin) {
            this.$router.push('/Page_administrateur');

          } else {
            this.$router.push('/Main');

          }
        } else {
          alert(response.data.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        alert('Une erreur est survenue lors de l\'inscription');
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
      window.location.href = 'http://localhost:8080/api/users/google-login'; // Redirection vers l'authentification Google
    },
    loginWithFacebook() {
      alert("Connexion avec Facebook !");
    }
  }
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

.login-form h2 {
  margin-bottom: 20px;
  color: #555;
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
