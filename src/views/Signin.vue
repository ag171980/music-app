<template>
  <div class="index">
    <div class="show">
      <div class="formulario">
        <h1>SIGN IN</h1>
        <form id="signin" class="form">
          <div class="input-group">
            <input
              type="text"
              v-model="fullname"
              id="fullname"
              name="fullname"
              class="input"
            />
            <label for="fullname" v-bind:class="{ fijar: fullname }">Fullname</label>
          </div>
          <div class="input-group">
            <input
              type="email"
              v-model="email"
              id="email"
              name="email"
              class="input"
            />
            <label for="email" v-bind:class="{ fijar: email }">Email</label>
          </div>
          <div class="input-group">
            <input
              type="password"
              v-model="pass"
              id="pass"
              name="pass"
              class="input"
            />
            <label for="pass" v-bind:class="{ fijar: pass }">Password</label>
          </div>
          <div class="errors" v-if="errors.length">
            <p>Please correct the following error(s):</p>
            <ul>
              <li v-for="(error, ide) in errors" :key="ide">{{ error }}</li>
            </ul>
          </div>
          <button id="sign" type="button" @click="signin()">
            Register now
          </button>
          <router-link to="/login">you have an account? enter here</router-link>
        </form>
      </div>
      <div class="message">
        <div id="modal" class="modal"></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      fullname: "",
      email: "",
      pass: "",
      errors: [],
    };
  },
  mounted() {
    // axios.get("https://jsonplaceholder.typicode.com/todos").then((result) => {
    //   console.log(result);
    // });
  },
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
        const data = {
          id: Math.floor(Math.random() * 1000),
          fullname: this.fullname,
          email: this.email,
          pass: this.pass,
        };
        axios
          .post(
            "http://localhost/api/usuarios/send_usuario",
            JSON.stringify(data)
          )
          .then((result) => {
            //Creacion del modal
            let recaptchaScript = document.createElement("script");
            recaptchaScript.setAttribute(
              "src",
              "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
            );
            document.head.appendChild(recaptchaScript);

            document
              .getElementsByClassName("message")[0]
              .classList.add("show-modal");
            if (result.data == "Cuenta registrada correctamente") {
              document.getElementById(
                "modal"
              ).innerHTML = `<lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_s8zcfby1.json" background="transparent" speed="1" style="width: 150px; height: 150px;" autoplay></lottie-player>
          <p>${result.data}</p>
          <a href="/login">Go to Login</a>`;
            } else {
              document.getElementById(
                "modal"
              ).innerHTML = `<lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_ltbsyn9h.json" background="transparent" speed="1" style="width: 150px; height: 150px;" autoplay></lottie-player>
          <p>${result.data}</p>
          <a href="/signin">Back</a>`;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }

      // const headers = {
      //   "Content-Type": "application/json;charset=UTF-8",
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Methods":
      //     " GET, POST, PATCH, PUT, DELETE, OPTIONS",
      //   "Access-Control-Allow-Headers": " Origin, Content-Type, X-Auth-Token",
      //   "cors": true,
      // };
    },
  },
};
</script>
<style lang="scss">
@import "../scss/form.scss";
</style>