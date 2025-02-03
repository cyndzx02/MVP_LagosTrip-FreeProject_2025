<template>
  <div class="row login-row">
    <div class="col-md-6 offset-md-3">
      <div class="">
        <form class="form-login" @submit.prevent="handleSubmit">
          <div class="">
            <label class="all-label">Email</label>
            <input type="email" class="form-input" required v-model="email" />
          </div>
          <div class="">
            <label class="all-label">Password</label>
            <input
              type="password"
              class="form-input"
              required
              v-model="password"
            />
            <div v-if="passwordError" class="error" >{{ passwordError }}</div>
          </div>

          <div class="my-3">
            <button type="submit" class="btn rounded-lg pill login-button">Login</button>
          </div>
          <router-link to="/register" >
          Don't have an account? Register
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
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

<style scoped>
/* { */

/* .login-box{
  /* background-color: black !important; */
.login-row {
  height: 100vh;
  padding-top: 9%;
  background-color: #f0f0f0;
}
.login-button{
  margin-left: 0 !important;
  font-size: 20px;
  width: 100% !important;
  align-self: center;
  margin: 4px 2px;
  color: white !important;
  cursor: pointer !important;
  border-radius: 35px !important;
  background-color: rgb(6, 6, 66);
}

.form-login {
  max-width: 420px !important;
  margin: 30px auto !important;
  background: rgb(255, 255, 255) !important;
  text-align: left !important;
  padding: 40px !important;
  border-radius: 10px !important;
  margin-top: 3%;
  /* margin-top: 5%; */
}
.all-label {
  color: #aaa !important;
  display: inline-block !important;
  margin: 25px 0 15px !important;
  font-size: 0.6em !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
  font-weight: bold !important;
}
.form-input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}

</style>
