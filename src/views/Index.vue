<template>
  <div class="index">
    <div class="show">
      <header>
        <img src="../assets/logo.png" height="60" alt="" />
        <h2>Spotifake</h2>
      </header>
      <div class="welcome">
        <h1>WELCOME TO <span>SPOTIFAKE</span></h1>
        <p>
          Lorem ipsum dolor sit mollitia aliquid corrupti! Id voluptatem ad
          reiciendis
        </p>
        <div class="buttons-login">
          <router-link to="/signin" class="btn register">Sign in</router-link>
          <router-link to="/login" class="btn login">Log in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Index",
  components: {
    // HelloWorld
  },
};
</script>
<style lang="scss">
  @import "../scss/index.scss";
</style>
