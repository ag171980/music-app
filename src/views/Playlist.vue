<template>
  <div class="playlist">
    <div class="space"></div>
    <sidebar ref="sidebar"></sidebar>
    <div class="myplaylist">
      <headeruser :dataUser="userActual" />

      <div class="header-playlist">
        <div class="photo-playlist">
          <div v-if="userActual.id_usuario == data_playlist.id_user_creator">
            <!-- <img :src="data_playlist.img" alt="" /> -->
            <img src="../assets/playlist/portada3.jpg" alt="" />
          </div>
          <div class="edit-image">
            <i class="fas fa-pen"></i>
            <p>Choose Image</p>
          </div>
        </div>
        <div class="description-playlist">
          <p>Playlist</p>
          <h1 @click="editDataPlaylist">{{ data_playlist.nombre_playlist }}</h1>
          <p id="description">{{ data_playlist.descripcion_playlist }}</p>
          <p class="details">
            <span id="nameCreator">{{ creatorPlaylist.name_creator }}</span> •
            {{ songsPlaylist.length }} songs • {{ durationPlaylist }}
          </p>
        </div>
        <!-- <iframe
          id="videoYT"
          width="300"
          height="185"
          src="https://www.youtube.com/embed/r63YPAW2G9M"
          title="YouTube video player"
          frameborder="0"
          autoplay
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> -->
      </div>

      <div class="list-songs">
        <div class="options-playlist">
          <div class="options-left">
            <button class="play"><i class="fas fa-play"></i></button>
            <button class="options"><i class="fas fa-ellipsis-h"></i></button>
          </div>
          <div class="options-right">
            <button class="search"><i class="fas fa-search"></i></button>
            <div class="filters">
              <div class="filter" @click="showFilters()">
                <p>{{ actualFilter }}</p>
                <i class="dropdown fas fa-sort-down"></i>
              </div>
              <div class="list-filters">
                <div class="filter-item" @click="chooseFilter('Custom')">
                  <p>Custom</p>
                </div>
                <div class="filter-item" @click="chooseFilter('Title')">
                  <p>Title</p>
                </div>
                <div class="filter-item" @click="chooseFilter('Artist')">
                  <p>Artist</p>
                </div>
                <div class="filter-item" @click="chooseFilter('Duration')">
                  <p>Duration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="playlist-musics">
          <div class="head-playlist">
            <p id="number">#</p>
            <p id="title">TITLE</p>
            <p id="artist">ARTIST</p>
            <p id="addedAt">ADDED AT</p>
            <p id="duration"><i class="far fa-clock"></i></p>
            <p id="option"></p>
          </div>
          <div
            class="list-musics"
            v-for="(songs, ids) in songsPlaylist"
            :key="ids"
          >
            <div
              class="music"
              @click="putVideo(songs, ids)"
              v-if="widthScreen <= 768"
            >
              <!-- @click="showAlert(songs.nombre_cancion, songs.artista_cancion)" -->
              <div class="number">
                <p>{{ ids + 1 }}</p>
                <i class="fas fa-play"></i>
              </div>
              <div class="description-music">
                <img
                  :src="songs.thumbnail_cancion"
                  height="40"
                  width="40"
                  alt=""
                />
                <h2 class="songName">{{ songs.nombre_cancion }}</h2>
              </div>
              <p class="artist">{{ songs.artista_cancion }}</p>
              <p class="addedAt">9/12/18</p>
              <div class="duration">
                <p id="duration">
                  {{ parseInt(songs.duracion_cancion / 60) }}:{{
                    parseInt(songs.duracion_cancion % 60)
                  }}
                </p>
              </div>
              <!-- opciones -->
              <p class="options">
                <i class="fas fa-ellipsis-h"></i>
              </p>
            </div>
            <div class="music" v-else>
              <div class="number">
                <p>{{ ids + 1 }}</p>
                <i @click="putVideo(songs, ids)" class="fas fa-play"></i>
              </div>
              <div class="description-music">
                <img
                  :src="songs.thumbnail_cancion"
                  height="40"
                  width="40"
                  alt=""
                />
                <h2 class="songName">{{ songs.nombre_cancion }}</h2>
              </div>
              <p class="artist">{{ songs.artista_cancion }}</p>
              <p class="addedAt">9/12/18</p>
              <div class="duration">
                <p id="duration">
                  {{ parseInt(songs.duracion_cancion / 60) }}:{{
                    parseInt(songs.duracion_cancion % 60)
                  }}
                </p>
              </div>
              <!-- opciones -->
              <p class="options">
                <i class="fas fa-ellipsis-h"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import headeruser from "../components/HeaderUser.vue";
import sidebar from "../components/Sidebar.vue";
export default {
  components: {
    sidebar,
    headeruser,
  },

  name: "Playlist",
  data() {
    return {
      widthScreen: 0,
      id_playlist: this.$route.query.id,
      creatorPlaylist: {},
      data_playlist: [],
      durationPlaylist: 0,
      songsPlaylist: [],
      userActual: [],
      img: "",
      stateFilters: true,
      actualFilter: "Filter By",
      player: "",
      done: "",
    };
  },
  methods: {
    editDataPlaylist() {
      console.log();
    },
    putVideo(arrSong, id) {
      let nameSongOfPlaylistToStart =
        document.getElementsByClassName("songName")[id];
      nameSongOfPlaylistToStart.style.color = "#29e925";
      let videoYoutube = document.getElementById("videoYT");
      videoYoutube.src = `https://www.youtube.com/embed/${arrSong.id}?&autoplay=1&controls=1&enablejsapi=1`;

      this.$parent.$parent.$refs.bottombar.getSong(arrSong);
    },
    showAlert(name, artist) {
      let song = {
        name: name,
        artist: artist,
      };
      this.$refs.bottombar.getSong(song);
      return song;
    },
    showFilters() {
      if (this.stateFilters) {
        document
          .getElementsByClassName("list-filters")[0]
          .classList.add("show");
        this.stateFilters = false;
      } else {
        document
          .getElementsByClassName("list-filters")[0]
          .classList.remove("show");
        this.stateFilters = true;
      }
    },
    chooseFilter(filterSelected) {
      this.actualFilter = filterSelected;
      document
        .getElementsByClassName("list-filters")[0]
        .classList.remove("show");
      this.stateFilters = true;
    },
    getDataPlaylist(id) {
      axios
        .get(`http://localhost:8000/playlists/getPlaylistForId/${id}`)
        .then((res) => {
          // console.log(res.data)
          this.creatorPlaylist = {
            id_creator: res.data[0].id_user_creator,
            name_creator: res.data.nombre_creador,
          };
          this.data_playlist = res.data[0];
          this.data_playlist.img = res.data[0].thumbnail_playlist;
        });
    },

    getSongsOfPlaylist(id) {
      axios
        .get(`http://localhost:8000/playlists/getSongsByIdPlaylist/${id}`)
        .then((res) => {
          console.log(res.data);

          this.songsPlaylist = res.data;
          this.totalDurationPlaylist();
        });
    },
    getData(id) {
      this.getDataPlaylist(id);
      this.getSongsOfPlaylist(id);
    },
    totalDurationPlaylist() {
      let minutes = 0,
        seconds = 0;
      // let songs = this.data_playlist.songs;
      let songs = this.songsPlaylist;

      // for (let i = 0; i < songs.length; i++) {
      //   seconds += parseInt(songs[i].duration.seconds);
      //   minutes += parseInt(songs[i].duration.minutes);
      // }
      // if (seconds > 60) {
      //   minutes += parseInt(seconds / 60);
      //   seconds = seconds % 60;
      // }
      // console.log(seconds % 60);
      let totalSeconds = 0;
      for (let i = 0; i < songs.length; i++) {
        totalSeconds += songs[i].duracion_cancion;
      }
      minutes = parseInt(totalSeconds / 60);
      seconds = totalSeconds % 60;
      this.durationPlaylist = `${minutes} min ${seconds} s`;
    },
  },
  mounted() {
    this.widthScreen = screen.width;
    if (localStorage.getItem("dataUser")) {
      this.userActual = JSON.parse(localStorage.getItem("dataUser"));
    } else {
      this.$router.push("/login");
    }

    this.getData(this.id_playlist);
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
@import "../scss/playlist.scss";
</style>