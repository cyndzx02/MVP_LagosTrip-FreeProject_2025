<template>
  <div class="form-container">
    <header>
      <h1 class="app-title">Email: Received with Specific Subject</h1>
    </header>
    <div class="form-wrapper">
      <h2 class="form-header">Monitor Email Reception</h2>
      <form @submit.prevent="submitForm">
        <div class="form-field">
          <label for="email">Email to Monitor</label>
          <input type="email" id="email" v-model="monitor_email" placeholder="Enter email to monitor" required />
        </div>
        <div class="form-field">
          <label for="subject">Subject or Keyword</label>
          <input type="text" id="subject" v-model="email_subject" placeholder="Enter subject or keyword" required />
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
      monitor_email: "",
      email_subject: "",
    };
  },
  methods: {
    submitForm() {
      if (!this.monitor_email || !this.email_subject) {
        alert('Please fill in all fields.');
        return;
      }
      const action = {
        service: "email",
        name: "email_received_with_subject",
        data: {
          monitor_email: this.monitor_email,
          email_subject: this.email_subject,
        },
      };
      this.$router.push({
        path: "/Newarea",
        query: { action: JSON.stringify(action) },
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
    background: #f4efe9;
    font-family: 'Arial', sans-serif;
  }
  
  .app-title {
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #8b4513;
  }
  
  .form-wrapper {
    background-color: #ffffff;
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
    color: #5c4033;
  }
  
  .form-field {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .form-field label {
    font-size: 14px;
    margin-bottom: 8px;
    display: block;
    color: #8b4513; 
  }
  
  .form-field input {
    width: 100%;
    padding: 12px;
    border: 2px solid #cd853f;
    border-radius: 30px;
    font-size: 14px;
    outline: none;
    transition: all 0.3s;
  }
  
  .form-field input:focus {
    border-color: #a0522d;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .submit-button {
    padding: 10px 20px;
    background-color: #8b4513;
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-button:hover {
    background-color: #cd853f;
  }
  </style>
  