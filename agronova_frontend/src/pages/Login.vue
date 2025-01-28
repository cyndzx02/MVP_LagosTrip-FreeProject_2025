<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Login</h3>
          <hr />
        </div>
        <form>
          <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" />
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
  name: "LoginPage",
};
</script>

<style>
 {
  /* #app{
        font-family: Avenir;
        text-align: center;
        color: black;
        margin-top: 60px;
    } */
}
</style>
