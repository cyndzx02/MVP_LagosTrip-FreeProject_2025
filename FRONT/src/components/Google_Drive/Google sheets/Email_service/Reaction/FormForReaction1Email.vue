<template>
    <div class="form-container">
      <header>
        <h1 class="app-title">Email: Forward to Another Recipient</h1>
      </header>
      <div class="form-wrapper">
        <h2 class="form-header">Forward Email Automatically</h2>
        <form @submit.prevent="submitForm">
          <div class="form-field">
            <label for="recipient">Original Recipient Email</label>
            <input type="email" id="recipient" v-model="original_recipient" placeholder="Enter recipient email" required />
          </div>
          <div class="form-field">
            <label for="forward">Forward To</label>
            <input type="email" id="forward" v-model="forward_email" placeholder="Enter email to forward to" required />
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
        original_recipient: "",
        forward_email: "",
      };
    },
    methods: {
      submitForm() {
        if (!this.original_recipient || !this.forward_email) {
          alert('Please fill in all fields.');
          return;
        }
        const reaction = {
          service: "email",
          name: "forward_email_to_recipient",
          data: {
            original_recipient: this.original_recipient,
            forward_email: this.forward_email,
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
    margin-top: 80px;
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
.textarea-input {
    width: 100%;
    padding: 12px;
    border: 2px solid #d4a373;
    border-radius: 30px;
    font-size: 14px;
    outline: none;
    transition: all 0.3s;
    font-family: 'Arial', sans-serif;
}

.textarea-input {
    height: 100px;
    resize: none;
}

.form-field input:focus,
.textarea-input:focus {
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