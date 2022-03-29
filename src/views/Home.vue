<template>
  <div class="home">
    <div class="space"></div>
    <sidebar :dataUser="userActual"></sidebar>
    <div class="page">
      <!-- <div class="header-primary">
        <h1>Welcome User</h1>
        <div class="user-settings">
          <i class="fas fa-user"></i>
          <p>{{userActual.fullname}}</p>
          <i class="fas fa-sort-down"></i>
        </div>
      </div> -->
      <headerUser :dataUser="userActual" />
      <div class="recent-playlists">
        <div class="playlist" v-for="(playlist, idx) in playlists" :key="idx">
          <router-link :to="`/playlist?id=${playlist.id}`" class="description">
            <img :src="playlist.dataImg.dataBase64" height="100" alt="" />
            <p>{{ playlist.name }}</p>
          </router-link>
          <button><i class="fas fa-play"></i></button>
        </div>
      </div>
    </div>
    <!-- <bottombar></bottombar> -->
  </div>
</template>
<script>
import axios from "axios";
import sidebar from "../components/Sidebar.vue";
// import bottombar from "../components/Bottombar.vue";
import headerUser from "../components/HeaderUser.vue";
export default {
  components: {
    sidebar,
    
    headerUser,
  },
  data() {
    return {
      name: "Home",
      userActual: [],
      playlists: [],
    };
  },
  methods: {
    getPlaylists() {
      axios
        .get(
          `http://localhost/api/playlist/get_your_playlists/${this.userActual.id}`
        )
        .then((result) => {
          this.playlists = result.data;
        });
    },
  },
  mounted() {
    if (localStorage.getItem("dataUser")) {
      this.userActual = JSON.parse(localStorage.getItem("dataUser"));
    } else {
      this.$router.push("/login");
    }
    // localStorage.removeItem("dataUser")
    this.getPlaylists();
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
@import "../scss/home.scss";
</style>