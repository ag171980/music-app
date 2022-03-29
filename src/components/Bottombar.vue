<template>
  <div class="bottombar">
    <div class="music">
      <img :src="songActually.img" height="70" alt="" />
      <div class="description">
        <h4>{{ songActually.name }}</h4>
        <p>{{ songActually.artist }}</p>
      </div>
    </div>
    <iframe
      id="videoYT"
      width="120"
      height="85"
      src="https://www.youtube.com/embed/r63YPAW2G9M"
      title="YouTube video player"
      frameborder="0"
      autoplay
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>

    <div class="controls">
      <div class="controls-top">
        <!-- <button id="btnPlay" @click="actionMusic(stateBtn)"> -->
        <button id="btnPlay" @click="changeStateVideo()">
          <i class="fas fa-play"></i>
        </button>
      </div>
      <div class="controls-bottom">
        <span id="ini">0:00</span>
        {{ timer.seconds }}
        <div id="bar">
          <div id="fill">
            <div id="ball"></div>
          </div>
        </div>
        <span id="durationSong">0:00</span>
      </div>
    </div>
    <div class="volumen">
      <!-- <i class="fas fa-volume-mute"></i>
      <i class="fas fa-volume-off"></i>
      <i class="fas fa-volume-down"></i> -->
      <i class="fas fa-volume-up"></i>
      <progress id="bar" value="0" max="100"></progress>
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
      stateBtn: true,
      timer: {
        minutes: 0,
        seconds: 0,
      },
      songActually: {},
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
        this.changeBtnPlay(this.stateBtn);
      } else {
        videoYT.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
        this.changeBtnPlay(this.stateBtn);
      }
    },

    getSong(song) {
      this.songLast == ""
        ? (this.songLast = {
            img: song.miniature,
            name: song.name,
            artist: song.artist,
            duration: song.duration,
          })
        : (this.songLast = this.songActually);

      this.songActually = {
        img: song.miniature,
        name: song.name,
        artist: song.artist,
        duration: song.duration,
      };

      document.getElementById(
        "durationSong"
      ).innerHTML = `${this.songActually.duration.minutes}:${this.songActually.duration.seconds}`;

      this.totalSeconds = this.convertTime(this.songActually.duration);
      this.actionMusic();
    },
    convertTime(arr) {
      let secs = 0;
      secs += arr.seconds + arr.minutes * 60;
      return secs;
    },
    myTimer() {
      console.log(`${min}:${sec}`);
      var ini = document.getElementById("ini");
      if (totalSeconds <= this.totalSeconds) {
        if (sec == 60) {
          min++;
          sec = 0;
        }
        ini.innerHTML = sec > 9 ? `${min}:${sec}` : `${min}:0${sec}`;
        this.timer.seconds = sec;
        sec++;
        totalSeconds++;
      }
    },
    restartDataFromTimer() {
      document.getElementById("fill").style.animation = ``;
      sec = 0;
      min = 0;
      document.getElementById(
        "fill"
      ).style.animation = `bar-progress ${this.totalSeconds}s steps(${this.totalSeconds},end)`;
    },
    actionMusic() {
      this.changeBtnPlay();
      this.restartDataFromTimer();
      clearInterval(myVar);
      myVar = setInterval(this.myTimer, 1000);
    },

    changeBtnPlay(state) {
      const btn = document.getElementById("btnPlay");
      if (state) {
        btn.innerHTML = `<i class="fas fa-play"></i>`;
        console.log("pausa!")
        this.stateBtn = false;
      } else {
        btn.innerHTML = `<i class="fas fa-pause"></i>`;
        console.log("siga!")
        this.stateBtn = true;
      }
    },
  },
  mounted() {
  },
};
</script>