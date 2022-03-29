<template>
  <div class="app">
    <router-view />
    <bottombar
      v-if="this.$route.name != 'Login' && this.$route.name != 'Signin' && this.$route.name != 'Index'"
      ref="bottombar"
    />
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
  methods: {
    asd() {
      alert("asd");
    },
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
