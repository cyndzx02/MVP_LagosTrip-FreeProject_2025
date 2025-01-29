<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div class="login-box">
        <!-- <div>
          <h3>Login</h3>
          <hr />
        </div> -->
        <form class="form-login" @submit.prevent="handleSubmit">
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
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
      <!-- Login page -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
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
/* 
#app {
  background-color: #beeba0;
} */
</style>
