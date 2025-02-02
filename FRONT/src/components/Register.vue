<template>
  <div class="row register-row">
    <div class="col-md-6 offset-md-3">
      <div class="login-box">
        <form class="form-register" @submit.prevent="handleSubmit">
          <p class="register">Register</p>
          <div class="form-group">
            <label class="label-register">Name</label>
            <input type="name" class="register-input" required v-model="name" />
          </div>
          <div class="form-group">
            <label class="label-register">Email</label>
            <input type="email" class="register-input" required v-model="email" />
          </div>
          <div class="form-group">
            <label class="label-register">Password</label>
            <input
              type="password"
              class="register-input"
              required
              v-model="password"
            />
            <div v-if="passwordError" class="error">{{ passwordError }}</div>
          </div>

          <div class="my-3">
            <button type="submit" class="btn register-btn pill rounded-lg">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "RegisterPage",

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
      if (!this.passwordError) {
        console.log("email:", this.email);
        console.log("password:", this.password);
        var name = this.name; var email = this.email; var password = this.password;
        axios
          .post("http://localhost:3000/register",{name, email, password})
          .then((response) => (this.info = response.data))
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style  scoped>
/* { */
.register-row {
   /* height: 50%;  */
  background-color: #f0f0f0;
}
.register {
  margin-left: 150px !important;
  color: #aaa;
  display: inline-block;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
.register-btn {
  cursor: pointer !important;
  border-radius: 35px !important;
  margin-left: 0 !important;
  font-size: 20px;
  width: 100% !important;
  align-self: center;
  background-color: rgb(6, 6, 66);
}

.form-register {
 
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;

}
.label-register {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
.register-input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

</style>
<!--  -->