<template>
  <div class="home">
    <div class="space"></div>
    <sidebar :dataUser="userActual"></sidebar>
    <div class="page">
      <headerUser :dataUser="userActual" />
      <div class="headd">
        <!-- <img class="bg" src="../assets/home2.png" alt="" /> -->
      </div>
      <h2>Recently Played</h2>
      <div class="recent-playlists">
        <div class="playlist animate__animated animate__fadeInDown" v-for="(playlist, idx) in playlists" :key="idx">
          <router-link
            :to="`/playlist?id=${playlist.id_playlists}`"
            class="description"
          >
            <!-- Local -->
            <!-- <img
              :src="`thumbnail_playlists/` + playlist.thumbnail_playlist"
              alt=""
            /> -->

            <img src="../assets/playlist/portada3.jpg" alt="" />

            <!-- Production -->
            <!-- <img
              :src="`https://spotifakestorage.s3.amazonaws.com/` + playlist.thumbnail_playlist"
              alt=""
            /> -->
            <p>{{ playlist.nombre_playlist }}</p>
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
      const urlProd = `http://localhost:8000/playlists/getPlaylistsUser/${this.userActual.id_usuario}`;
      // const urlProd = `https://spottifakeapi.tk/index.php/playlists/getPlaylistsUser/${this.userActual.id_usuario}`;
      axios.get(urlProd).then((result) => {
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