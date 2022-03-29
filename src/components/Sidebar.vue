<template>
  <div class="sidebar">
    <img src="../assets/logo.png" class="logo" alt="logo app music spotifake" />
    <nav class="menu">
      <router-link to="/home" class="menu-item">
        <i class="fas fa-home"></i>
        <p>Home</p>
      </router-link>
      <router-link to="/search" class="menu-item">
        <i class="fas fa-search"></i>
        <p>Search</p>
      </router-link>
      <div
        class="menu-item"
        id="create-playlist"
        @click="modalCreatePlaylist()"
        v-if="nameActualPage == 'Home'"
      >
        <i class="fas fa-plus"></i>
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
          :to="`/playlist?id=${playlist.id}`"
          @click="this.$parent.getData(playlist.id)"
          class="description"
        >
          <p>{{ playlist.name }}</p>
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
      newPlaylist:{
        name:"",
        description:"",
        img:{}
      },
      stateModal: true,
    };
  },
  methods: {
    dataFiles(event) {
      const reader = new FileReader();
      const file = event.target.files[0];
      let nameImg = event.target.files[0].name;
      let rawImg;
      let arrData = {
        name: nameImg,
        dataBase64: "",
      };
      reader.onloadend = () => {
        rawImg = reader.result;
        arrData.dataBase64 = rawImg;
      };
      reader.readAsDataURL(file);
      this.newPlaylist.img = arrData;
    },
    getPlaylists() {
      axios
        .get(
          `http://localhost/api/playlist/get_your_playlists/${this.userActual.id}`
        )
        .then((result) => {
          this.myPlaylists = result.data;
        });
    },

    createPlaylist() {
      const playlist = {
        userCreator: this.dataUser,
        idUser: this.dataUser.id,
        name: this.newPlaylist.name,
        description: this.newPlaylist.description,
        dataImg: this.newPlaylist.img,
      };
      axios
        .post(
          "http://localhost/api/playlist/insert_playlist",
          JSON.stringify(playlist)
        )
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
    if (localStorage.getItem("dataUser")) {
      this.userActual = JSON.parse(localStorage.getItem("dataUser"));
    } else {
      this.$router.push("/login");
    }
    this.getPlaylists();
  },
};
</script>