<template>
  <div class="home">
    <div class="space"></div>
    <sidebar :dataUser="userActual"></sidebar>
    <div class="page">
      <headerUser :dataUser="userActual" />
      <div class="headd"></div>
      <div class="recent">
        <h2 class="">Recently Played</h2>
        <div class="recent-playlists">
          <div
            class="playlist animate__animated animate__fadeInDown"
            v-for="(playlist, idx) in playlists"
            :key="idx"
          >
            <router-link
              :to="`/playlist?id=${playlist.id_playlists}`"
              class="description"
            >
              <!-- Local -->
              <img
                :src="require(`../assets/thumbnail_playlists/${playlist.thumbnail_playlist}`)"
                alt=""
              />

              <!-- <img src="../assets/playlist/portada3.jpg" alt="" /> -->

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
    </div>
    <!-- <bottombar></bottombar> -->
  </div>
</template>
<script>
import sidebar from "../components/Sidebar.vue";
// import bottombar from "../components/Bottombar.vue";
import headerUser from "../components/HeaderUser.vue";
import { getPlaylists } from "../api/apiPlaylist";
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
  methods: {},
  async mounted() {
    if (localStorage.getItem("dataUser")) {
      this.userActual = JSON.parse(localStorage.getItem("dataUser"));
      this.playlists = await getPlaylists(this.userActual.id_usuario);
    } else {
      this.$router.push("/login");
    }
    // localStorage.removeItem("dataUser")
  },
};
</script>
<style lang="scss">
@import "../scss/home.scss";
</style>
