<template>
  <div class="sidebar">
    <!-- <div class="logo">
      <img src="../assets/logo.png" alt="logo app music spotifake" />
      <h2>SPOTI <span>FAKE</span></h2>
    </div> -->
    <div class="message-create-playlist">
      <template v-if="showMessage === true">
        <lottie-player
          src="https://assets2.lottiefiles.com/private_files/lf30_s8zcfby1.json"
          background="transparent"
          speed="1"
          style="width: 30px; height: 30px"
          autoplay
        ></lottie-player>
        <p>Playlist created successfully</p>
      </template>
      <template v-else-if="showMessage === false">
        <lottie-player
          src="https://assets2.lottiefiles.com/private_files/lf30_ltbsyn9h.json"
          background="transparent"
          speed="1"
          style="width: 30px; height: 30px"
          autoplay
        ></lottie-player>
        <p>There was an error creating your playlist</p>
      </template>
    </div>
    <nav class="menu">
      <router-link to="/home" class="menu-item animate__animated animate__fadeIn">
        <i class="bi bi-house-door"></i>
        <p>Home</p>
      </router-link>
      <router-link to="/search" class="menu-item animate__animated animate__fadeIn">
        <i class="bi bi-search"></i>
        <p>Search</p>
      </router-link>
      <router-link to="/profile" class="menu-item animate__animated animate__fadeIn">
        <i class="bi bi-collection"></i>
        <p>My Playlists</p>
      </router-link>
      <div
        class="menu-item animate__animated animate__fadeIn"
        id="create-playlist"
        @click="modalCreatePlaylist()"
        v-if="nameActualPage == 'Home'"
      >
        <i class="bi bi-plus"></i>
        <p>Create Playlist</p>
      </div>
    </nav>
    <div class="modal-create-playlist">
      <div class="window-modal">
        <div class="top">
          <h2>Create Your Playlist</h2>
          <i @click="modalCreatePlaylist()" class="fas fa-times"></i>
        </div>
        <form enctype="multipart/form-data">
          <div class="file-select">
            <input
              type="file"
              accept="image/*"
              @change="dataFiles"
              multiple
              name="image"
              id="image"
              aria-label="Archivo"
            />
          </div>
          <div class="inputs">
            <div class="input-group">
              <input
                type="text"
                name="nameplaylist"
                id="nameplaylist"
                v-model="newPlaylist.name"
              />
              <label for="nameplaylist">Name</label>
            </div>
            <div class="input-group">
              <textarea
                name="descriptionplaylist"
                id="descriptionplaylist"
                cols="30"
                rows="5"
                v-model="newPlaylist.description"
              ></textarea>
              <label for="descriptionplaylist">Description</label>
            </div>
            <button type="button" @click="createPlaylist()">Save Playlist</button>
          </div>
        </form>
        <p>
          Al continuar, aceptas darle acceso a Spotifake a la imagen que decidas subir.
          Asegurate de tener los derechos para subir la imagen.
        </p>
      </div>
    </div>
    <hr />

    <div class="playlists">
      <div
        class="playlist-sidebar animate__animated animate__fadeIn"
        v-for="(playlist, idx) in myPlaylists"
        :key="idx"
      >
        <router-link
          :to="`/playlist?id=${playlist.id_playlists}`"
          @click="this.$parent.getData(playlist.id_playlists)"
          class="description"
        >
          <p>{{ playlist.nombre_playlist }}</p>
        </router-link>
      </div>
    </div>
  </div>
  <!-- <router-view/> -->
</template>
<script>
import { getPlaylists, createPlaylist } from "../api/apiPlaylist";
export default {
  name: "Sidebar",
  props: ["dataUser"],
  data() {
    return {
      nameActualPage: this.$parent.name,
      userActual: [],
      myPlaylists: [],
      screenWidth: "",
      newPlaylist: {
        name: "",
        description: "",
        img: {},
      },
      imgimg: "",
      stateModal: true,
      showMessage: undefined,
    };
  },
  methods: {
    dataFiles(event) {
      this.newPlaylist.img = event.target.files[0];
    },

    async createPlaylist() {
      let msg = document.querySelector(".message-create-playlist");
      let formData = new FormData();
      formData.append("idUser", this.dataUser.id_usuario);
      formData.append("file", this.newPlaylist.img);
      formData.append("name", this.newPlaylist.name);
      formData.append("description", this.newPlaylist.description);
      msg.classList.add("show");
      this.showMessage = await createPlaylist(formData);
      this.modalCreatePlaylist();
      this.myPlaylists = await getPlaylists(this.userActual.id_usuario);
      setTimeout(() => {
        msg.classList.remove("show");
      }, 3000);
    },
    modalCreatePlaylist() {
      if (this.stateModal) {
        document.getElementsByClassName("modal-create-playlist")[0].classList.add("show");
      } else {
        document
          .getElementsByClassName("modal-create-playlist")[0]
          .classList.remove("show");
      }
      this.stateModal = !this.stateModal;
    },
  },
  async mounted() {
    this.screenWidth = screen.width;

    if (localStorage.getItem("dataUser")) {
      this.userActual = JSON.parse(localStorage.getItem("dataUser"));
      this.myPlaylists = await getPlaylists(this.userActual.id_usuario);
    } else {
      this.$router.push("/login");
    }
  },
};
</script>
