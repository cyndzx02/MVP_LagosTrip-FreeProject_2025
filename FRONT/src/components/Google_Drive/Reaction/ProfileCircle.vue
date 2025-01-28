<template>
    <div class="profile-circle" @click="goToProfile">
      <h4>vp</h4>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfileCircle',
    methods: {
      goToProfile() {
        this.$router.push('/Profil');
      },
    },
  };
  </script>
  
  <style scoped>
  .profile-circle {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: #4A90E2; /* Bleu */
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .profile-circle h4 {
    margin: 0;
    font-size: 1rem; /* Ajustez la taille de la police si nécessaire */
    color: white; /* Couleur du texte */
  }
  
  .profile-circle:hover {
    background-color: #357ABD; /* Changement de couleur au survol */
  }
  </style>
  