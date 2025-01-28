<template>
  <div class="form-container">
    <header>
      <h1 class="app-title">Nom de l'application</h1>
    </header>
    <div class="form-wrapper">
      <h2 class="form-header">Post a Tweet</h2>
      <form @submit.prevent="submitForm">
        <div class="form-field">
          <label for="post-text">Body</label>
          <textarea
            id="post-text"
            v-model="body"
            placeholder="Enter your post text"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      body: "", // Lié au champ textarea
    };
  },
  methods: {
    submitForm() {
      if (this.body.trim()) {
        // Création de l'objet reaction
        const reaction = {
          service: "Twitter",
          name: "post_tweet",
          data: {
            body: this.body.trim(),
          },
        };
        // Redirection vers NewArea avec les données encodées
        this.$router.push({
          path: "/NewArea",
          query: {
            reaction: JSON.stringify(reaction),
          },
        });
      } else {
        alert("Veuillez remplir le champ de texte avant de soumettre.");
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
  margin-top: 20vh;
  transform: translateY(-50%);
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

.form-field textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #d4a373;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
  resize: none;
}

.form-field textarea:focus {
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
