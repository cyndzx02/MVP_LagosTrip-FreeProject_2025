<template>
    <div class="form-container">
      <div class="app-title">Move_file</div>
      <div class="form-wrapper">
        <h2 class="form-header">Formulaire for Move_file</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-field">
            <label for="filePath">Chemin file:</label>
            <input type="text" id="filePath" v-model="filePath" placeholder="Entrez le file_path" required />
          </div>
          <div class="form-field">
            <label for="filePath">Chemin directory:</label>
            <input type="text" id="Dest_directory" v-model="Dest_directory" placeholder="Entrez le Dest_directory" required/>
          </div>
          <button type="submit" class="submit-button">Soumettre</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
          filePath: "",
          Dest_directory: "",
      };
    },
    methods: {
     handleSubmit() {
       
      if (this.filePath && this.Dest_directory) {
        const reaction = {
          service: "Dropbox",
          name: "Move_file",
          data: {
            filePath: this.filePath,
            Dest_directory: this.Dest_directory,
          },
        };
        this.$router.push({
          path: "/Newarea",
          query: { reaction: JSON.stringify(reaction) },
        });
      } else {
        alert("Veuillez remplir tous les champs.");
      }
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    background: #fffaf0;
    font-family: 'Arial', sans-serif;
  }
  
  .app-title {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #6b4226;
  }
  
  .form-wrapper {
    background-color: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    text-align: center;
    width: 400px;
    margin: auto;
    transform: translateY(20%);
  }
  
  .form-header {
    font-size: 20px;
    margin-bottom: 20px;
    color: #6b4226;
  }
  
  .form-field {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .form-field label {
    font-size: 14px;
    margin-bottom: 8px;
    display: block;
    color: #6b4226;
  }
  
  .form-field input {
    width: 100%;
    padding: 12px;
    border: 2px solid #d4a373;
    border-radius: 30px;
    font-size: 14px;
    outline: none;
    transition: all 0.3s;
  }
  
  .form-field input:focus {
    border-color: #c19a6b;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .submit-button {
    padding: 10px 20px;
    background-color: #d4a373;
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: #c19a6b;
  }
  </style>
  