<template>
  <div class="index">
    <Navbar />
    <div class="content-formulario">
      <div class="formulario">
        <h1>Log In</h1>
        <form id="signin" class="form">
          <div class="input-group">
            <input
              type="email"
              v-model="email"
              id="email"
              name="email"
              class="input"
              required
            />
            <label for="email" v-bind:class="{ fijar: email }"
              ><i class="fas fa-envelope"></i> Email</label
            >
          </div>
          <div class="input-group">
            <input
              type="password"
              v-model="pass"
              id="pass"
              name="pass"
              class="input"
              required
            />
            <label for="pass" v-bind:class="{ fijar: pass }"
              ><i class="fas fa-key"></i> Password</label
            >
          </div>
          <div class="errors" v-if="errors.length">
            <p>Please correct the following error(s):</p>
            <ul>
              <li v-for="(error, ide) in errors" :key="ide">{{ error }}</li>
            </ul>
          </div>
          <button class="btn-sign" id="log" type="button" @click="login()">Log In</button>
          <router-link to="/signin">you don't have an account? enter here</router-link>
        </form>
      </div>
    </div>
    <div class="message">
      <div id="modal" class="modal">
        <template v-if="showResponse === true">
          <lottie-player
            src="https://assets2.lottiefiles.com/private_files/lf30_s8zcfby1.json"
            background="transparent"
            speed="1"
            style="width: 150px; height: 150px"
            autoplay
          ></lottie-player>
          <p>Inicio de sesión exitoso</p>
        </template>
        <template v-else>
          <lottie-player
            src="https://assets2.lottiefiles.com/private_files/lf30_ltbsyn9h.json"
            background="transparent"
            speed="1"
            style="width: 150px; height: 150px"
            autoplay
          ></lottie-player>
          <p>Error, email o contraseña incorrecta</p>
        </template>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
// import axios from "axios";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { login } from "../api/apiUser";
export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      email: "",
      pass: "",
      errors: [],
      showResponse: undefined,
    };
  },
  // mounted() {

  // },
  methods: {
    async login() {
      this.errors = [];
      if (!this.email) {
        this.errors.push("Email required.");
      }
      if (!this.pass) {
        this.errors.push("Password required.");
      }
      if (this.email && this.pass) {
        let sign = document.getElementById("log");
        let message = document.getElementsByClassName("message")[0];
        sign.innerHTML = '<i id="spinner" class="fas fa-spinner"></i>';
        const data = {
          email: this.email,
          pass: this.pass,
        };
        let self = this;
        const urlProd = "http://127.0.0.1:8000/usuarios/login";
        // const urlProd = "https://spottifakeapi.tk/index.php/usuarios/login";
        setTimeout(async function () {
          if (await login(urlProd, JSON.stringify(data), sign, message)) {
            self.showResponse = true;
            setTimeout(function () {
              self.$router.push("/home");
            }, 2000);
          } else {
            self.showResponse = false;
          }
          setTimeout(function () {
            message.classList.remove("show-modal");
            sign.classList.remove("response");
            setTimeout(function () {
              sign.innerHTML = "Log In";
            }, 500);
            sign.style.backgroundColor = "#1fbe1c";
          }, 6000);
        }, 2000);
      }
    },
  },
};
</script>
<style lang="scss">
@import "../scss/form.scss";
</style>
