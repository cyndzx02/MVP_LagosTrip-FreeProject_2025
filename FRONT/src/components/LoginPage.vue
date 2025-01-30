<template>
  <div class="row">
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
            <button type="submit" class="btn btn-primary pill login-button">Login</button>
          </div>
        </form>
      </div>
      <!-- Login page -->
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

<style>
/* { */

/* .login-box{
  /* background-color: black !important; */

.login-button{
  margin-left: 0 !important;
  font-size: 70%;
  width: 50% !important;
  align-self: center;
  background-color: rgb(6, 6, 66);
}

.form-login {
  max-width: 420px !important;
  margin: 30px auto !important;
  background: rgb(207, 203, 203) !important;
  text-align: left !important;
  padding: 40px !important;
  border-radius: 10px !important;
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
/* 
#app {
  background-color: #beeba0;
} */
</style>
