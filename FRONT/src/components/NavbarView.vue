<template>
  <!-- <div class="bg-surface-variant pa-4 position-relative rounded-lg ma-2"></div> -->
    <nav class="navbar  ">
      <div class="nav-container ">
        <!-- <h1 class="logo" >MonShop</h1> -->
        <img
          src="../assets/agronova-logo.png"
          alt="Logo"
          class="img-fluid agro-logo"
        />

        <ul class="nav-links">
          <li><router-link to="/home">Accueil</router-link></li>
          <li><router-link to="/PanierView">Panier</router-link></li>
          <li><router-link to="/Paiement">Paiement</router-link></li>
        </ul>
      </div>
    </nav>
  
</template>

<script>
import 'vuetify/styles'
export default {
  // name: "Navbar",
}
</script>

<style scoped>
/* Barre de navigation */

.links-home {
  color: #0d2647;
}

.agro-logo {
  height: 70px !important;
  width: 60px !important;
  
  /* position: fixed; */
}
.navbar {
  /* position: fixed !important; */
  width: auto;
  width: 100%;
  /* box-shadow: 10px !important; */
  z-index: 1000;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #539337;
  padding-bottom: 30px;
  padding: 15px 25px;
  padding-top: 1%;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-container {
  position: static !important;
  width: 100%;
  max-width: 900px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li {
  display: inline;
}

.nav-links a {
  text-decoration: none;
  color:  #ffffff;
  font-size: 18px;
  font-weight: bold;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>
