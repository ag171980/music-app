<template>
  <div class="bottombar">
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
    <iframe
      id="videoYT"
      width="120"
      height="85"
      src=""
      title="YouTube video player"
      frameborder="0"
      autoplay
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <!-- https://www.youtube.com/embed/r63YPAW2G9M -->

    <div class="controls">
      <div class="controls-top">
        <!-- <button id="btnPlay" @click="actionMusic(stateBtn)"> -->
        <button id="btnPlay" @click="changeStateVideo()">
          <i class="fas fa-play"></i>
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
      <i
        v-else-if="valueVol < 50 && valueVol != 0"
        class="fas fa-volume-down"
      ></i>
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
var myVar;
var sec = 0;
var min = 0;
var totalSeconds = 0;
// var player;
export default {
  data() {
    return {
      valueVol: 0,
      stateModalEditDataPlaylist: true,
      stateBtn: true,
      timer: {
        minutes: 0,
        seconds: 15,
      },
      songActually: {
        img: "empty",
      },
      songLast: {},
      totalSeconds: 0,
    };
  },
  methods: {
    changeStateVideo() {
      let videoYT = document.getElementById("videoYT");
      if (this.stateBtn) {
        videoYT.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
        this.actionMusic("change");
        this.changeBtnPlay(this.stateBtn);
      } else {
        videoYT.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
        this.actionMusic("change");
        this.changeBtnPlay(this.stateBtn);
      }
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
      var ini = document.getElementById("ini");
      if (totalSeconds <= this.totalSeconds) {
        if (sec == 60) {
          min++;
          sec = 0;
        }
        ini.innerHTML = sec > 9 ? `${min}:${sec}` : `${min}:0${sec}`;
        sec++;
        totalSeconds++;
      } else {
        totalSeconds = 0;
        sec = 0;
        min = 0;
      }
    },
    restartDataFromTimer() {
      let fill = document.getElementById("fill");
      fill.style.animation = "none";
      fill.offsetHeight;
      fill.style.animation = null;
      totalSeconds = 0;
      sec = 0;
      min = 0;
      fill.style.animation = `bar-progress ${this.totalSeconds}s steps(${this.totalSeconds},end)`;
    },
    actionMusic(stateVideo) {
      if (stateVideo == "change") {
        if (this.stateBtn) {
          document.getElementById("fill").classList.add("paused");
          clearInterval(myVar);
        } else {
          document.getElementById("fill").classList.remove("paused");
          myVar = setInterval(this.myTimer, 1000);
        }
      } else {
        this.restartDataFromTimer();
        clearInterval(myVar);
        myVar = setInterval(this.myTimer, 1000);
      }
    },
    changeBtnPlay(state) {
      const btn = document.getElementById("btnPlay");
      if (state) {
        btn.innerHTML = `<i class="fas fa-play"></i>`;
        this.stateBtn = false;
      } else {
        btn.innerHTML = `<i class="fas fa-pause"></i>`;
        this.stateBtn = true;
      }
    },
  },
};
</script>