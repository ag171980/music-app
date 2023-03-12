<template>
  <div class="playlist" :playlist="randomMusic">
    <div class="space"></div>
    <sidebar ref="sidebar"></sidebar>
    <div class="myplaylist">
      <headeruser :dataUser="userActual" />
      <div class="aaa"></div>
      <div class="header-playlist">
        <div class="photo-playlist">
          <div v-if="userActual.id_usuario == data_playlist.id_user_creator">
            <!-- <img :src="data_playlist.img" alt="" /> -->
            <img :src="(data_playlist.img !== undefined)? require(`../assets/thumbnail_playlists/${data_playlist.img}`) : ''" alt="" />
          </div>

          <div class="edit-image" v-if="widthScreen >= 768">
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
            {{ songsPlaylistAux.length }} songs • {{ durationPlaylist }}
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
            <button class="play" @click="randomMusic">
              <i class="fas fa-play"></i>
            </button>
            <!-- <button class="options"><i class="fas fa-ellipsis-h"></i></button> -->
          </div>
          <div class="options-right">
            <div class="searchBar">
              <div class="input-search">
                <input
                  type="text"
                  name="search_song"
                  placeholder="Search in a playlist"
                  v-model="song"
                  @keyup="searchSong"
                />
              </div>
              <button class="search" @click="showSearchBar()">
                <i class="fas fa-search"></i>
              </button>
            </div>
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
          <div class="list-musics" v-for="(songs, ids) in songsPlaylist" :key="ids">
            <div
              class="music"
              @click="this.$parent.$parent.$refs.bottombar.putVideo(songs, ids)"
              v-if="widthScreen <= 768"
            >
              <!-- @click="showAlert(songs.nombre_cancion, songs.artista_cancion)" -->
              <div class="number">
                <p>{{ ids + 1 }}</p>
                <i class="fas fa-play"></i>
              </div>
              <div class="description-music">
                <img :src="songs.thumbnail_cancion" height="40" width="40" alt="" />
                <div class="song-artist">
                  <h2 class="songName">{{ songs.nombre_cancion }}</h2>
                  <p class="artistName">{{ songs.artista_cancion }}</p>
                </div>
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
            <div
              class="music"
              @click="this.$parent.$parent.$refs.bottombar.putVideo(songs, ids)"
              v-else
            >
              <div class="number">
                <p>{{ ids + 1 }}</p>
                <i class="fas fa-play"></i>
              </div>
              <div class="description-music">
                <img :src="songs.thumbnail_cancion" height="40" width="40" alt="" />
                <div class="song-artist">
                  <h2 class="songName">{{ songs.nombre_cancion }}</h2>
                </div>
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
import headeruser from "../components/HeaderUser.vue";
import sidebar from "../components/Sidebar.vue";

import {
  getPlaylist,
  getSongsOfPlaylist,
  totalDurationPlaylist,
} from "../api/apiPlaylist";

export default {
  components: {
    sidebar,
    headeruser,
  },

  name: "Playlist",
  data() {
    return {
      name: "Playlist",
      widthScreen: 0,
      id_playlist: this.$route.query.id,
      creatorPlaylist: {},
      playlist: [],
      data_playlist: [],
      durationPlaylist: 0,
      songsPlaylist: [],
      songsPlaylistAux: [],
      userActual: [],
      img: "",
      stateFilters: true,
      stateSearchBar: false,
      song: "",
      stateBtn: true,
      actualFilter: "Filter By",

      player: "",
      done: "",
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    async getData(id_playlist) {
      this.playlist = await getPlaylist(id_playlist);
      this.creatorPlaylist = {
        id_creator: this.playlist[0].id_user_creator,
        name_creator: this.playlist.nombre_creador,
      };
      this.data_playlist = this.playlist[0];
      this.data_playlist.img = this.playlist[0].thumbnail_playlist;
      // console.log(this.data_playlist);
      document.title = `Spotifake - ${this.data_playlist.nombre_playlist}`;
      this.songsPlaylist = await getSongsOfPlaylist(id_playlist);
      this.songsPlaylistAux = await getSongsOfPlaylist(id_playlist);
      this.$parent.$parent.$refs.bottombar.songsPlaylist = await getSongsOfPlaylist(
        id_playlist
      );
      this.durationPlaylist = await totalDurationPlaylist(this.songsPlaylist);
    },
    // handleScroll() {
    //   console.log(window.scrollY);
    //   //en 367 deberia de aparecer un header con fixed para el titulo de la cancion
    // },
    showSearchBar() {
      if (this.stateSearchBar) {
        document.querySelector(".input-search").classList.remove("show");
      } else {
        document.querySelector(".input-search").classList.add("show");
      }
      this.stateSearchBar = !this.stateSearchBar;
    },
    searchSong() {
      this.songsPlaylist =
        this.song.length === 0
          ? this.songsPlaylistAux
          : this.songsPlaylist.filter((sng) =>
              sng.nombre_cancion.toLowerCase().includes(this.song)
            );
    },
    showAlert(name, artist) {
      let song = {
        name: name,
        artist: artist,
      };
      this.getSong(song);

      return song;
    },
    showFilters() {
      let listFilters = document.getElementsByClassName("list-filters")[0];
      this.stateFilters
        ? listFilters.classList.add("show")
        : listFilters.classList.remove("show");
      this.stateFilters = !this.stateFilters;
    },
    randomMusic() {
      let posRandom = Math.round(Math.random() * this.songsPlaylist.length);
      this.$parent.$parent.$refs.bottombar.putVideo(
        this.songsPlaylist[posRandom],
        posRandom
      );
    },
    chooseFilter(filterSelected) {
      document.getElementsByClassName("list-filters")[0].classList.remove("show");
      this.stateFilters = true;
      this.songsPlaylist.sort((a, b) => {
        let filters = {
          a: {
            Title: a.nombre_cancion,
            Artist: a.artista_cancion,
            Duration: a.duracion_cancion,
            Custom: a.id_cancion,
          },
          b: {
            Title: b.nombre_cancion,
            Artist: b.artista_cancion,
            Duration: b.duracion_cancion,
            Custom: b.id_cancion,
          },
        };

        if (filters.a[filterSelected] > filters.b[filterSelected]) {
          return 1;
        }
        if (filters.a[filterSelected] < filters.b[filterSelected]) {
          return -1;
        }
        return 0;
      });
      this.actualFilter = filterSelected;
    },
  },
  async mounted() {
    if (!localStorage.getItem("dataUser")) {
      return this.$router.push("/login");
    }
    this.userActual = JSON.parse(localStorage.getItem("dataUser"));
    this.widthScreen = screen.width;
    this.getData(this.id_playlist);
  },
};
</script>
<style lang="scss">
@import "../scss/playlist.scss";
</style>
