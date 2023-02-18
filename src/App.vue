<template>
  <div class="app">
    <router-view />
    <!-- <div v-if="widthScreen > 768"> -->
    <bottombar
      v-if="
        this.$route.name != 'Login' &&
        this.$route.name != 'Signin' &&
        this.$route.name != 'Index'
      "
      ref="bottombar"
    />
    <!-- </div> -->
  </div>

  <!-- <Sidebar /> -->
</template>
<script>
import bottombar from "./components/Bottombar.vue";

export default {
  name: "App",
  components: {
    bottombar,
  },
  data() {
    return {
      widthScreen: 0,
    };
  },
  methods: {
    asd() {
      alert("asd");
    },
  },
  mounted() {
    this.widthScreen = screen.width;
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://kit.fontawesome.com/5b23b3e9e6.js"
    );
    document.head.appendChild(recaptchaScript);
  },
};
</script>
<style lang="scss">
@import "./scss/app.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
