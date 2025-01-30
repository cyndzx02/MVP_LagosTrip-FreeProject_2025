<template>
    <nav class="navbar">
      <div class="nav-container">
        <h1 class="logo">MonShop</h1>
        <ul class="nav-links">
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/cart">Panier</router-link></li>
        </ul>
      </div>
    </nav>
  </template>
  
  <style scoped>
  /* Barre de navigation */
  .navbar {
    background-color: #008080;
    padding: 15px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .nav-container {
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
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
  
  .nav-links a:hover {
    text-decoration: underline;
  }
  </style>
  