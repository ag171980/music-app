<template>
  <div class="bottombar">
    <div class="barra" id="bar_mobile">
      <div id="fill_mobile"></div>
    </div>
    <div class="music">
      <div v-if="songActually.img != 'empty'">
        <img :src="songActually.img" height="60" width="60" />
      </div>

      <div class="description">
        <div class="title">
          <h4>{{ songActually.name }}</h4>
        </div>
        <p>{{ songActually.artist }}</p>
      </div>
    </div>
    <div class="contentVideoYT"></div>
    <!-- https://www.youtube.com/embed/r63YPAW2G9M -->

    <div class="controls">
      <div class="controls-top">
        <!-- <button id="btnPlay" @click="actionMusic(stateBtn)"> -->
        <button id="btnShuffle" @click="btnSuffle()">
          <i class="fas fa-random"></i>
        </button>
        <button id="btnBack" @click="changeSong('backward')">
          <i class="fas fa-step-backward"></i>
        </button>
        <button id="btnPlay" @click="changeStateVideo()">
          <i class="fas fa-play"></i>
        </button>
        <button id="btnNext" @click="changeSong('forward')">
          <i class="fas fa-step-forward"></i>
        </button>
        <button id="btnRepeat">
          <i class="fas fa-repeat-alt"></i>
        </button>
      </div>
      <div class="controls-bottom">
        <p id="ini">0:00</p>
        <div id="bar">
          <div id="fill" class="fill-bar">
            <div id="ball"></div>
          </div>
        </div>
        <p id="durationSong">0:00</p>
      </div>
    </div>
    <div class="volumen">
      <i v-if="valueVol == 0" class="fas fa-volume-mute"></i>
      <i v-else-if="valueVol < 50 && valueVol != 0" class="fas fa-volume-down"></i>
      <i v-else-if="valueVol >= 50" class="fas fa-volume-up"></i>
      <input
        type="range"
        @change="volumeVideo(valueVol)"
        v-model="valueVol"
        step="1"
        min="0"
        max="100"
      />
      <i class="fas fa-expand-alt"></i>
    </div>
  </div>
</template>
<script>
// import {
//   changeBtnPlay,
//   changeStateVideo,
//   volumeVideo,
//   actionMusic,
//   myTimer,
//   restartDataFromTimer,
// } from "../functions/optionsPlaylist";

// import { getSongsOfPlaylist } from "../api/apiPlaylist";
var myVar;
var sec = 0;
var min = 0;
var totalSeconds = 0;
// var player;
export default {
  data() {
    return {
      id_playlist: this.$route.query.id,
      valueVol: 0,
      stateModalEditDataPlaylist: true,
      stateBtn: true,
      stateShuffle: false,
      timer: {
        minutes: 0,
        seconds: 15,
      },
      songActually: {
        img: "empty",
      },
      posActual: undefined,
      songLast: {},
      totalSeconds: 0,
      playlist: {},
      songsPlaylist: {},
    };
  },
  async mounted() {
    // this.songsPlaylist = await getSongsOfPlaylist(this.id_playlist);
    console.log(this.songsPlaylist);
  },

  methods: {
    changeSong(moveTo) {
      const cantSongs = parseInt(this.songsPlaylist.length);
      if (this.stateShuffle === true) {
        this.randomMusic();
      } else {
        if (moveTo === "forward") {
          this.posActual += 1;
          if (this.posActual === cantSongs) {
            this.posActual = 0;
          }
        } else {
          this.posActual -= 1;
          if (this.posActual === -1) {
            this.posActual = parseInt(cantSongs - 1);
          }
        }
        this.putVideo(this.songsPlaylist[this.posActual], this.posActual);
        // console.log(
        //   `cambio a la ${
        //     moveTo === "forward" ? "proxima" : "anterior"
        //   } cancion sin ser random`
        // );
      }
    },
    btnSuffle() {
      document.querySelector(
        "#btnShuffle"
      ).innerHTML = `<i class="fas fa-random" style="color:${
        !this.stateShuffle ? "#a82dff" : "white"
      }"></i>`;
      this.stateShuffle = !this.stateShuffle;
    },
    clearSelected() {
      document.querySelectorAll(".songName").forEach((song) => {
        song.style.color = "white";
      });
    },
    selectMusic(id) {
      this.clearSelected();
      let nameSongOfPlaylistToStart = document.getElementsByClassName("songName")[id];
      nameSongOfPlaylistToStart.style.color = "#a82dff";
    },
    putVideo(arrSong, id) {
      this.posActual = id
      console.log(id);
      this.selectMusic(id);
      let contentVideoYT = document.querySelector(".contentVideoYT");
      contentVideoYT.innerHTML = `<iframe
      id="videoYT"
      width="120"
      height="85"
      src="https://www.youtube.com/embed/${arrSong.id}?&autoplay=1&controls=1&enablejsapi=1"
      title="YouTube video player"
      frameborder="0"
      autoplay
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>`;
      let videoYoutube = document.getElementById("videoYT");
      videoYoutube.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
      this.getSong(arrSong);
      this.changeBtnPlay(!this.stateBtn);
    },
    changeStateVideo() {
      // this.stateBtn = changeStateVideo(this.stateBtn, this.totalSeconds);
      let videoYT = document.getElementById("videoYT");

      videoYT.contentWindow.postMessage(
        `{"event":"command","func":${
          this.stateBtn ? '"pauseVideo"' : '"playVideo"'
        },"args":""}`,
        "*"
      );
      this.actionMusic("change");
      this.changeBtnPlay(this.stateBtn);

      this.stateBtn = !this.stateBtn;
    },
    volumeVideo(valVolumen) {
      let videoYT = document.getElementById("videoYT");
      videoYT.contentWindow.postMessage(
        `{"event":"command","func":"setVolume","args":[${valVolumen}]}`,
        "*"
      );
    },
    getSong(song) {
      this.songLast == ""
        ? (this.songLast = {
            img: song.thumbnail_cancion,
            name: song.nombre_cancion,
            artist: song.artista_cancion,
            duration: {
              minutes: parseInt(song.duracion_cancion / 60),
              seconds: parseInt(song.duracion_cancion % 60),
            },
          })
        : (this.songLast = this.songActually);

      this.songActually = {
        img: song.thumbnail_cancion,
        name: song.nombre_cancion,
        artist: song.artista_cancion,
        duration: {
          minutes: parseInt(song.duracion_cancion / 60),
          seconds: parseInt(song.duracion_cancion % 60),
        },
      };

      document.getElementById(
        "durationSong"
      ).innerHTML = `${this.songActually.duration.minutes}:${this.songActually.duration.seconds}`;

      this.totalSeconds = this.convertTime(this.songActually.duration);
      this.volumeVideo(this.valueVol);
      this.actionMusic("start");
    },
    convertTime(arr) {
      let secs = 0;
      secs += arr.seconds + arr.minutes * 60;
      return secs;
    },
    myTimer() {
      // this.totalSeconds = myTimer(this.totalSeconds);
      var ini = document.getElementById("ini");
      if (totalSeconds <= this.totalSeconds) {
        if (sec == 60) {
          min++;
          sec = 0;
        }
        ini.innerHTML = sec > 9 ? `${min}:${sec}` : `${min}:0${sec}`;
        sec++;
        totalSeconds++;
        // this.randomMusic();
      } else {
        this.changeSong('forward');
        totalSeconds = 0;
        sec = 0;
        min = 0;
      }
    },
    async randomMusic() {
      let posRandom = Math.round(Math.random() * this.songsPlaylist.length);
      this.posActual = posRandom;
      this.putVideo(this.songsPlaylist[posRandom], posRandom);
      console.log(`length: ${this.songsPlaylist.length}`);
      console.log(`posRandom: ${posRandom}`);
    },
    restartDataFromTimer() {
      // restartDataFromTimer(this.totalSeconds);
      let fill = document.getElementById("fill");
      let fill_mobile = document.getElementById("fill_mobile");
      fill.style.animation = "none";
      fill.offsetHeight;
      fill.style.animation = null;
      totalSeconds = 0;
      sec = 0;
      min = 0;
      fill.style.animation = `bar-progress ${this.totalSeconds}s steps(${this.totalSeconds},end)`;
      fill_mobile.style.animation = "none";
      fill_mobile.offsetHeight;
      fill_mobile.style.animation = null;
      fill_mobile.style.animation = `bar-progress ${this.totalSeconds}s steps(${this.totalSeconds},end)`;
    },
    actionMusic(stateVideo) {
      // actionMusic(stateVideo, this.stateBtn, this.myTimer, this.totalSeconds);
      if (stateVideo == "change") {
        if (this.stateBtn) {
          document.getElementById("fill").classList.add("paused");
          document.getElementById("fill_mobile").classList.add("paused");
          clearInterval(myVar);
        } else {
          document.getElementById("fill").classList.remove("paused");
          document.getElementById("fill_mobile").classList.remove("paused");
          myVar = setInterval(this.myTimer, 1000);
        }
      } else {
        this.restartDataFromTimer();
        clearInterval(myVar);
        myVar = setInterval(this.myTimer, 1000);
      }
    },
    changeBtnPlay(state) {
      // changeBtnPlay(state, this.stateBtn);
      const btn = document.getElementById("btnPlay");
      btn.innerHTML = `<i class="fas fa-${state ? "play" : "pause"}"></i>`;
      state = !state;
    },
  },
};
</script>
