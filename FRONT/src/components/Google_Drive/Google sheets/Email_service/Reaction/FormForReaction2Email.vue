<template>
    <div class="form-container">
      <header>
        <h1 class="app-title">Email: Automatic Reply</h1>
      </header>
      <div class="form-wrapper">
        <h2 class="form-header">Send Automatic Reply</h2>
        <form @submit.prevent="submitForm">
          <div class="form-field">
            <label for="sender">Sender Email</label>
            <input type="email" id="sender" v-model="sender_email" placeholder="Enter sender's email" required />
          </div>
          <div class="form-field">
            <label for="response">Response Message</label>
            <textarea id="response" v-model="response_message" placeholder="Enter your response message" required></textarea>
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
        sender_email: "",
        response_message: "",
      };
    },
    methods: {
      submitForm() {
        if (!this.sender_email || !this.response_message) {
          alert('Please fill in all fields.');
          return;
        }
        const reaction = {
          service: "email",
          name: "send_automatic_reply",
          data: {
            sender_email: this.sender_email,
            response_message: this.response_message,
          },
        };
        this.$router.push({
          path: "/Newarea",
          query: { reaction: JSON.stringify(reaction) },
        });
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
    /* margin: auto; */
    margin-top: 100px;
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

.form-field input,
.form-field select {
    width: 100%;
    padding: 12px;
    border: 2px solid #d4a373;
    border-radius: 30px;
    font-size: 14px;
    outline: none;
    transition: all 0.3s;
    font-family: 'Arial', sans-serif;
}

.form-field input:focus,
.form-field select:focus {
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