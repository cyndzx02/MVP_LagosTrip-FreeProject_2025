<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap">
  <!-- <img  class="imgf" alt="Vue logo" src="./assets/th.png" width="125" height="120">
  <h1 class="soul">oul connexion</h1> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <LoginView/> -->
  <RouterView /> 
  <!-- <Login/> -->
  
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld,
    // LoginView
  }
}


</script>
<style>
.imgf{
  position: relative;
  left:460px;
  top:-10px;
}

.soul {
  position:relative;
  left:550px;
  top:-82px;
  font-size: 2em;
  font-family: 'Roboto', sans-serif;

}
</style>