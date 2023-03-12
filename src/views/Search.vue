<template>
  <div class="search">
    <div class="space"></div>
    <sidebar ref="sidebar"></sidebar>
    <div class="page">
      <headeruser ref="headeruser" :dataUser="userActual"></headeruser>
      <!-- Implementar registro de ultimas busquedas, que se guarde el historial de busquedas y se muesstren los ultimos 5 -->
      <div class="results-head">
        <h2>Songs</h2>
        <p v-if="resultOf != ''">Results of: "{{ resultOf }}"</p>
      </div>
      <div class="alert">
        <p id="msg-addSong">asdadasd</p>
      </div>
      <div class="results">
        <div class="first">
          <div
            class="first-result"
            v-for="(results, idr) in resultsSearch.filter(
              (res, ind) => ind === 0
            )"
            :key="idr"
          >
            <img :src="results.snippet.thumbnails.medium.url" alt="" />
              <div class="description-song">
                <div class="description">
                  <p class="title">{{ results.snippet.title }}</p>
                  <p class="artist">
                    {{ results.snippet.channelTitle }}
                  </p>
                </div>
                <button :id="idr" class="btn-result" @click="openList(idr)">Add</button>
              </div>
          </div>
        </div>
        <div class="others-results">
          <div
            class="result"
            v-for="(results, idr) in resultsSearch.filter(
              (res, ind) => ind !== 0
            )"
            :key="idr"
          >
            <div class="img-title">
              <img :src="results.snippet.thumbnails.medium.url" alt="" />
              <div class="description">
                <p class="title">{{ results.snippet.title }}</p>
                <p class="artist">
                  {{ results.snippet.channelTitle }}
                </p>
              </div>
            </div>
            <button :id="idr" class="btn-result" @click="openList(idr+1)">
              Add 
            </button>
          </div>
        </div>
      </div>
      <div class="modal">
        <div class="modal-playlists">
          <h2>Add to playlist:</h2>
          <div
            class="playlists"
            v-for="(playlist, idp) in playlists"
            :key="idp"
          >
            <div
              :id="playlist.id"
              class="playlist"
              @click="selectPlaylist(idp)"
            >
              <img
                :src="`assets/${playlist.thumbnail_playlist}`"
                height="50"
                width="50"
                alt=""
              />
              <p>{{ playlist.nombre_playlist }}</p>
            </div>
          </div>
          <!-- <p class="alert">{{ alertPlaylistNotSelected }}</p> -->
          <div class="bottom-modal-playlists">
            <button @click="openList()">Cancel</button>
            <button class="confirm" @click="addToPlaylistSelected()">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <bottombar></bottombar> -->
  </div>
</template>
<script>
import headeruser from "../components/HeaderUser.vue";
import sidebar from "../components/Sidebar.vue";

import axios from "axios";
export default {
  name: "search",
  data() {
    return {
      name: "Search",
      alertPlaylistNotSelected: "",
      songsSelected: [],
      playlistSelected: [],
      resultOf: "",
      modalPlaylists: false,
      playlists: [],
      userActual: [],
      resultsSearch: [],
      asd: {},
      songAddToPlaylist: {
        idPlaylist: 0,
        song: {
          id: 0,
          name: "",
          artist: "",
          miniature: "",
          duration: "",
        },
      },
    };
  },
  components: {
    sidebar,
    headeruser,
  },
  methods: {
    selectPlaylist(id) {
      this.clearSelected();
      this.playlistSelected = this.playlists[id];
      this.songAddToPlaylist.idPlaylist = this.playlists[id].id_playlists;
      // console.log(this.playlists[id])
      // this.songAddToPlaylist.song.asd = this.playlists[id].id_playlist;
      document.getElementsByClassName("playlist")[id].classList.add("selected");
    },
    clearSelected() {
      let playlist = document.getElementsByClassName("playlist");
      for (let i = 0; i < playlist.length; i++) {
        playlist[i].classList.remove("selected");
      }
    },
    findSelected() {
      let playlist = document.getElementsByClassName("playlist");
      let pos = 10;
      for (let i = 0; i < playlist.length; i++) {
        if (playlist[i].classList.contains("selected")) {
          pos = i;
        }
      }
      if (pos == 10) {
        this.alertPlaylistNotSelected = "**Select a playlist to add this song";
      }
      return pos;
    },
    convertYTTimeToSeconds(duration) {
      const durationOfVideo = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      duration.split("").map((item, index, array) => {
        if (array[index] == "H") {
          if (!isNaN(Number(array[index - 2]))) {
            durationOfVideo.hours = Number(
              `${array[index - 2]}${array[index - 1]}`
            );
          } else {
            durationOfVideo.hours = Number(array[index - 1]);
          }
        }
        if (array[index] == "M") {
          if (!isNaN(Number(array[index - 2]))) {
            durationOfVideo.minutes = Number(
              `${array[index - 2]}${array[index - 1]}`
            );
          } else {
            durationOfVideo.minutes = Number(array[index - 1]);
          }
        }
        if (array[index] == "S") {
          if (!isNaN(Number(array[index - 2]))) {
            durationOfVideo.seconds = Number(
              `${array[index - 2]}${array[index - 1]}`
            );
          } else {
            durationOfVideo.seconds = Number(array[index - 1]);
          }
        }
      });
      return durationOfVideo;
    },
    async getDurationOfSong(id) {
      const request = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&maxResults=25&key=${this.$refs.headeruser.key}`
      );
      this.songAddToPlaylist.song.duration = this.convertYTTimeToSeconds(
        request.data.items[0].contentDetails.duration
      );
    },
    addToPlaylistSelected() {
      axios
        .post(
          `http://localhost:8000/playlists/addSongToPlaylist`,
          JSON.stringify(this.songAddToPlaylist)
        )
        .then((res) => {
          console.log(res.data);
          document.querySelector("#msg-addSong").innerHTML = res.data.msg;
          document.querySelector(".alert").classList.add("show");

          setTimeout(() => {
            document.querySelector(".alert").classList.remove("show");
          }, 1500);
          document.querySelector(".modal").classList.remove("show");
        });
    },

    openList(idSongSelected = null) {
      if (this.modalPlaylists) {
        document.getElementsByClassName("modal")[0].classList.remove("show");
        this.modalPlaylists = false;
      } else {
        this.songsSelected = this.resultsSearch[idSongSelected];
        this.songAddToPlaylist.song = {
          id: this.resultsSearch[idSongSelected].id.videoId,
          artist: this.resultsSearch[idSongSelected].snippet.channelTitle,
          name: this.resultsSearch[idSongSelected].snippet.title,

          miniature:
            this.resultsSearch[idSongSelected].snippet.thumbnails.high.url,
        };

        this.getDurationOfSong(this.songAddToPlaylist.song.id);

        document.getElementsByClassName("modal")[0].classList.add("show");
        this.modalPlaylists = true;
      }
    },
    getPlaylists() {
      axios
        .get(
          `http://localhost:8000/playlists/getPlaylistsUser/${this.userActual.id_usuario}`
        )
        .then((result) => {
          console.log(result.data);
          this.playlists = result.data;
        });
    },
  },
  mounted() {
    document.title = this.name;
    if (localStorage.getItem("dataUser")) {
      this.userActual = JSON.parse(localStorage.getItem("dataUser"));
    } else {
      this.$router.push("/login");
    }

    this.getPlaylists();
    console.log(this.userActual.id_usuario);
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
@import "../scss/search.scss";
</style>