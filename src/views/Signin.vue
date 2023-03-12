<template>
  <div class="index">
    <Navbar />
    <div class="content-formulario">
      <div class="formulario">
        <h1>Create an Account</h1>
        <form id="signin" class="form">
          <div class="input-group">
            <input
              type="text"
              v-model="fullname"
              id="fullname"
              name="fullname"
              class="input"
            />
            <label for="fullname" v-bind:class="{ fijar: fullname }"
              ><i class="fas fa-signature"></i> Fullname</label
            >
          </div>
          <div class="input-group">
            <input type="email" v-model="email" id="email" name="email" class="input" />
            <label for="email" v-bind:class="{ fijar: email }"
              ><i class="fas fa-envelope"></i> Email</label
            >
          </div>
          <div class="input-group">
            <input type="password" v-model="pass" id="pass" name="pass" class="input" />
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
          <button class="btn-sign" id="sign" type="button" @click="signin()">
            Sign Up
          </button>
          <router-link to="/login">you have an account? enter here</router-link>
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
          <p>Cuenta registrada correctamente.</p>
        </template>
        <template v-else>
          <lottie-player
            src="https://assets2.lottiefiles.com/private_files/lf30_ltbsyn9h.json"
            background="transparent"
            speed="1"
            style="width: 150px; height: 150px"
            autoplay
          ></lottie-player>
          <p>Error:</p>
        </template>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { signin } from "../api/apiUser";
export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      fullname: "",
      email: "",
      pass: "",
      errors: [],
      showResponse: undefined,
    };
  },
  mounted() {},
  methods: {
    signin() {
      this.errors = [];
      if (!this.fullname) {
        this.errors.push("Fullname required.");
      }
      if (!this.email) {
        this.errors.push("Email required.");
      }
      if (!this.pass) {
        this.errors.push("Password required.");
      }
      if (this.fullname && this.email && this.pass) {
        let sign = document.getElementById("sign");
        let message = document.getElementsByClassName("message")[0];
        sign.innerHTML = '<i id="spinner" class="fas fa-spinner"></i>';
        const data = {
          id: Math.floor(Math.random() * 1000),
          fullname: this.fullname,
          email: this.email,
          pass: this.pass,
        };
        let self = this;
        const urlProd = "http://127.0.0.1:8000/usuarios/createAccount";
        // const urlProd = "https://spottifakeapi.tk/index.php/usuarios/createAccount";

        setTimeout(async function () {
          if (await signin(urlProd, JSON.stringify(data), sign, message)) {
            self.showResponse = true;
            setTimeout(function () {
              self.$router.push("/login");
            }, 2000);
          } else {
            self.showResponse = false;
          }
          setTimeout(function () {
            message.classList.remove("show-modal");
            sign.classList.remove("response");
            setTimeout(function () {
              sign.innerHTML = "Sign Up";
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
