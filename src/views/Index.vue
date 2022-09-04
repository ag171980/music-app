<template>
  <div class="index">
    <Navbar />
    <div id="Home" class="home">
      <div class="info-app">
        <h1 class="animate__animated animate__fadeInUp">
          SPOTI<span>FAKE</span>
        </h1>
        <p class="animate__animated animate__fadeInUp animate__delay-0-6s">
          SPOTIFAKE is a non-profit music web application made as a practice by
          a Fullstack Developer.
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/oI8Ltv0jE-I"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <!-- https://www.youtube.com/embed/A_g3lMcWVy0?&autoplay=1&controls=1&enablejsapi=1 -->
        <div
          class="
            buttons-login
            animate__animated animate__fadeInUp animate__delay-0-6s
          "
        >
          <router-link to="/signin" class="btn register">Sign in</router-link>
          <!-- <router-link to="/login" class="btn login">Log in</router-link> -->
        </div>
      </div>
      <img class="person" src="../assets/home2.png" alt="" />
      <!-- <div class="videos-app ">
        <div class="video-primary animate__animated animate__fadeInUp">
          <img class="principal" :src="actual" alt="" />
          <div class="bar"></div>
        </div>
        <div class="videos-secondaries">
          <img
            @click="selectImage(1)"
            class="secondary animate__animated animate__fadeInUp animate__delay-0-3s"
            src="../assets/banner/image1.jpg"
            alt=""
          />
          <img
            @click="selectImage(2)"
            class="secondary animate__animated animate__fadeInUp animate__delay-0-6s"
            src="../assets/banner/image2.jpg"
            alt=""
          />
          <img
            @click="selectImage(3)"
            class="secondary animate__animated animate__fadeInUp animate__delay-0-9s"
            src="../assets/banner/image3.jpg"
            alt=""
          />
        </div>
      </div> -->

      <!-- <i class="arrow fas fa-angle-down"></i>
      <svg
        class="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#1fbe1c"
          fill-opacity="0.5"
          d="M0,32L48,53.3C96,75,192,117,288,112C384,107,480,53,576,64C672,75,768,149,864,154.7C960,160,1056,96,1152,101.3C1248,107,1344,181,1392,218.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg> -->
    </div>

    <!-- <div id="Features" class="features">
      <svg
        class="top"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#1fbe1c"
          fill-opacity="0.5"
          d="M0,96L48,101.3C96,107,192,117,288,112C384,107,480,85,576,112C672,139,768,213,864,213.3C960,213,1056,139,1152,133.3C1248,128,1344,192,1392,224L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <h2>Features</h2>
      <div class="cards-features">
        <div class="card-feature">
          <div class="icon">
            <i class="fas fa-user"></i>
          </div>
          <div class="text-card">
            <h3>Register & LogIn</h3>
            <p>Register and log in with your email and password to access.</p>
          </div>
        </div>

        <div class="card-feature">
          <div class="icon">
            <i class="fas fa-music"></i>
          </div>
          <div class="text-card">
            <h3>Customize Playlists</h3>
            <p>You can create, customize and manage your playlists.</p>
          </div>
        </div>

        <div class="card-feature">
          <div class="icon">
            <i class="fas fa-sliders-h"></i>
          </div>
          <div class="text-card">
            <h3>Choose your songs</h3>
            <p>Search your favorite songs brought from Youtube.</p>
          </div>
        </div>

        <div class="card-feature">
          <div class="icon">
            <i class="fas fa-headphones"></i>
          </div>
          <div class="text-card">
            <h3>Listen Music</h3>
            <p>listen to your favorite songs.</p>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div id="Contact" class="contact">
      <h2>Contact</h2>
      <div class="contact-form">
        <img src="../assets/contact.png" alt="" />
        <form class="form">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
            required
          />
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div> -->
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import "animate.css";
export default {
  name: "Index",
  components: {
    Navbar,
    Footer,
    // HelloWorld
  },
  data() {
    return {
      cont: 0,
      actual: require("../assets/banner/image1.jpg"),
      imgsCarroussel: ["imagen1.jpg", "imagen2.jpg", "imagen3.jpg"],
    };
  },
  methods: {
    selectImage(numImage) {
      this.cont = numImage - 1;
      console.log(this.imgsCarroussel[0]);
      this.actual = require(`../assets/banner/image${numImage}.jpg`);
      document.getElementsByClassName("bar")[0].style.animation = "none";
      setTimeout(function () {
        document.getElementsByClassName("bar")[0].style.animation =
          "load 5s 2s linear infinite";
      }, 120);

      console.log(numImage);
    },
    showCarr() {
      console.log(this.cont);
      if (this.cont == this.imgsCarroussel.length - 1) {
        this.cont = 0;
      } else {
        this.cont++;
      }
      this.actual = require(`../assets/banner/image${this.cont + 1}.jpg`);
      document.getElementsByClassName("bar")[0].style.animation = "none";
      setTimeout(function () {
        document.getElementsByClassName("bar")[0].style.animation =
          "load 5s 2s linear infinite";
      }, 120);
      // for (let i = 0; i < this.imgsCarroussel.length; i++) {
      //   console.log(i);
      //   document.getElementsByClassName("bar")[0].style.animation = "none";
      //   setTimeout(function () {
      //     document.getElementsByClassName("bar")[0].style.animation =
      //       "load 5s 2s linear infinite";
      //   }, 50);
      // }
    },
  },
  mounted() {
    // setInterval(() => {
    //   this.showCarr();
    // }, 7000);
    let recaptchaLink = document.createElement("link");
    recaptchaLink.setAttribute(
      "href",
      "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    );
    document.head.appendChild(recaptchaLink);
  },
};
</script>
<style lang="scss">
@import "../scss/index.scss";
</style>
