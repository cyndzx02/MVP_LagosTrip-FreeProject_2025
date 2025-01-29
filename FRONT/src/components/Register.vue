<template>
    <div class="row register-row">
      <div class="col-md-6 offset-md-3">
        <div class="login-box">
          <form class="form-login" @submit.prevent="handleSubmit">

            <p class="register">Register</p>
            <div class="form-group">
              <label>Name</label>
              <input type="name" class="form-control" required v-model="name" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" required v-model="email" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                required
                v-model="password"
              />
              <div v-if="passwordError" class="error" >{{ passwordError }}</div>
            </div>
  
            <div class="my-3">
              <button type="submit" class="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Login",
    data() {
      return {
        name: "",
        email: "",
        password: "",
        passwordError: "",
      };
    },
    methods: {
      handleSubmit() {
        //console.log("form submitted");
        this.passwordError =
          this.password.length > 5
            ? ""
            : "Password must be at least 6 characters long";
            if (!this.passwordError){
              console.log('email:', this.email)
              console.log('password:', this.password)
            }
      },
    },
  };
  </script>
  
  <style>
  /* { */
  .register-row{
    background-color: #beeba0;
  }
  .register{
    margin-left: 150px !important;
    color: #aaa;
    display: inline-block;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  .btn{
    margin-left: 140px !important;
    font-size: 70%;
  }

  form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
    /* margin-top: 5%; */
  }
  label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
  }
  
  /* #app {
    background-color: #beeba0;
  } */
  </style>
  