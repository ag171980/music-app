<template>
  <div class="sidebar">
    <!-- <div class="logo">
      <img src="../assets/logo.png" alt="logo app music spotifake" />
      <h2>SPOTI <span>FAKE</span></h2>
    </div> -->
    <nav class="menu">
      <router-link to="/home" class="menu-item">
        <!-- <i class="fas fa-home"></i> -->
        <i class="bi bi-house-door"></i>
        <p>Home</p>
      </router-link>
      <router-link to="/search" class="menu-item">
        <!-- <i class="fas fa-search"></i> -->
        <i class="bi bi-search"></i>
        <p>Search</p>
      </router-link>
      <div
        class="menu-item"
        id="create-playlist"
        @click="modalCreatePlaylist()"
        v-if="nameActualPage == 'Home'"
      >
        <!-- <i class="fas fa-plus"></i> -->
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
            <button type="button" @click="createPlaylist()">
              Save Playlist
            </button>
          </div>
        </form>
        <p>
          Al continuar, aceptas darle acceso a Spotifake a la imagen que decidas
          subir. Asegurate de tener los derechos para subir la imagen.
        </p>
      </div>
    </div>
    <hr />

    <div class="playlists">
      <div
        class="playlist-sidebar"
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
import axios from "axios";
export default {
  name: "Sidebar",
  props: ["dataUser"],
  data() {
    return {
      nameActualPage: this.$parent.name,
      userActual: [],
      myPlaylists: [],
      newPlaylist: {
        name: "",
        description: "",
        img: {},
      },
      imgimg: "",
      stateModal: true,
    };
  },
  methods: {
    dataFiles(event) {
      this.newPlaylist.img = event.target.files[0];
    },
    getPlaylists() {
      const urlProd = `http://localhost:8000/playlists/getPlaylistsUser/${this.userActual.id_usuario}`;
      // const urlProd = `https://spottifakeapi.tk/index.php/playlists/getPlaylistsUser/${this.userActual.id_usuario}`;
      axios.get(urlProd).then((result) => {
        this.myPlaylists = result.data;
      });
    },

    createPlaylist() {
      let formData = new FormData();
      formData.append("idUser", this.dataUser.id_usuario);
      formData.append("file", this.newPlaylist.img);
      formData.append("name", this.newPlaylist.name);
      formData.append("description", this.newPlaylist.description);
      const urlProd = `http://localhost:8000/playlists/createPlaylist`;
      // const urlProd = `https://spottifakeapi.tk/index.php/playlists/createPlaylist`;
      axios
        .post(urlProd, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((result) => {
          console.log(result.data);
          this.$parent.getPlaylists();
          this.getPlaylists();
          this.modalCreatePlaylist();
        });
    },
    modalCreatePlaylist() {
      if (this.stateModal) {
        document
          .getElementsByClassName("modal-create-playlist")[0]
          .classList.add("show");
        this.stateModal = false;
      } else {
        document
          .getElementsByClassName("modal-create-playlist")[0]
          .classList.remove("show");
        this.stateModal = true;
      }
    },
  },
  mounted() {
    let iconsBs = document.createElement("link");
    iconsBs.setAttribute("rel", "stylesheet");
    iconsBs.setAttribute(
      "href",
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
    );

    document.head.appendChild(iconsBs);

    if (localStorage.getItem("dataUser")) {
      this.userActual = JSON.parse(localStorage.getItem("dataUser"));
    } else {
      this.$router.push("/login");
    }
    this.getPlaylists();
  },
};
</script>