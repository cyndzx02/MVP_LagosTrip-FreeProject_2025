<template>
  <div class="page-container">
      <header class="app-header">
          <h2>Mon Application</h2>
      </header>

      <div class="centered-text">
          <p>Create your New area</p>
      </div>

      <div class="input-container">
          <input type="text" placeholder="Name" v-model="formInput.field1" />
          <input type="text" placeholder="Hours" v-model="formInput.field2" />
          <input type="text" placeholder="Minute" v-model="formInput.field3" />
          <input type="text" placeholder="Second" v-model="formInput.field4" />
      </div>

      <button class="save-button" @click="handleSave">Save</button>
  </div>
</template>


<script>
export default {
    name: "InputPage",
    data() {
        return {
            formInput: {
                name: "",
                hours: "",
                minute: "",
                second: ""
            }
        };
    },
    methods: {
      handleSave() {
            alert("Données sauvegardées : " + JSON.stringify(this.formInput));
            this.$router.push('/Main')
        }
    }
};
</script>


<style scoped>

.page-container {
    background-color: #f6f8fa;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Roboto", sans-serif;
    padding: 20px;
}

.app-header {
    align-self: flex-start;
    margin-bottom: 20px;
    padding-left: 20px;
}

.app-header h2 {
    font-size: 2.5rem;
    font-weight: bold;
    color:#a45555;
}

.centered-text {
    text-align: center;
    margin: 20px 0;
    font-size: 1.5rem;
    font-weight: bold;
    color:#a45555;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif
}

.input-container {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.input-container input {
    padding: 10px;
    font-size: 1rem;
    border: 2px solid #bdc3c7;
    border-radius: 5px;
    background-color: #ecf0f1;
    /* color: #1c78b6;  */
    transition: border-color 0.3s;
}

.input-container input:focus {
    border-color: #3498db;
    outline: none;
}

.save-button {
    margin-top: 20px;
    padding: 12px 20px;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #0a69d6;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
}

.save-button:hover {
    background-color: #2980b9; 
    transform: scale(1.05); 
}

/* .save-button:active {
    transform: scale(1); 
    background-color: #1c6e9e; 
} */

/* Responsive pour écrans petits */
@media (max-width: 600px) {
    .app-header h2 {
        font-size: 1.8rem;
    }

    .centered-text {
        font-size: 1rem;
    }

    .input-container {
        gap: 10px;
    }

    .save-button {
        padding: 10px 16px;
        font-size: 0.9rem;
    }
}
</style>
