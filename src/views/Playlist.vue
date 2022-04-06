<template>
  <div class="playlist">
    <div class="space"></div>
    <sidebar ref="sidebar"></sidebar>
    <div class="myplaylist">
      <headeruser :dataUser="userActual" />
      <div class="header-playlist">
        <div class="photo-playlist">
          <img :src="img" height="250" alt="" />
          <div class="edit-image">
            <i class="fas fa-pen"></i>
            <p>Choose Image</p>
          </div>
        </div>
        <div class="description-playlist">
          <p>Playlist</p>
          <h1>{{ data_playlist.name }}</h1>
          <p id="description">{{ data_playlist.description }}</p>
          <p class="details">
            <b>{{ creatorPlaylist.nameCreator }}</b> •
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
      <div class="playlist">
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
            <p id="duration"><i class="far fa-clock"></i></p>
          </div>
          <div
            class="list-musics"
            v-for="(songs, ids) in songsPlaylist"
            :key="ids"
          >
            <div class="music" @dblclick="showAlert(songs.name, songs.artist)">
              <div class="number">
                <p>{{ ids + 1 }}</p>
                <i @click="putVideo(songs)" class="fas fa-play"></i>
              </div>
              <div class="description-music">
                <img :src="songs.miniature" height="40" alt="" />
                <h2>{{ songs.name }}</h2>
              </div>
              <p class="artist">{{ songs.artist }}</p>
              <div class="duration">
                <p id="duration">
                  {{ songs.duration.minutes }}:{{ songs.duration.seconds }}
                </p>
              </div>
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
    putVideo(arrSong) {

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
    getData(id) {
      axios
        .get(`http://localhost/api/playlist/get_playlist_for_id/${id}`)
        .then((res) => {
          this.creatorPlaylist = res.data[0].userCreator;
          this.data_playlist = res.data[0];
          this.img = res.data[0].dataImg.dataBase64;
          // console.log(this.data_playlist);
          this.songsPlaylist = res.data[0].songs;
          this.totalDurationPlaylist();
        });
    },
    totalDurationPlaylist() {
      let minutes = 0,
        seconds = 0;
      let songs = this.data_playlist.songs;
      for (let i = 0; i < songs.length; i++) {
        seconds += parseInt(songs[i].duration.seconds);
        minutes += parseInt(songs[i].duration.minutes);
      }
      if (seconds > 60) {
        minutes += parseInt(seconds / 60);
        seconds = seconds % 60;
      }
      // console.log(seconds % 60);
      this.durationPlaylist = `${minutes} min ${seconds} secs`;
    },
  },
  mounted() {
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