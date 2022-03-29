<template>
  <div class="index">
    <div class="show">
      <div class="formulario">
        <h1>LOG IN</h1>
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
            <label for="email" v-bind:class="{ fijar: email }">Email</label>
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
            <label for="pass" v-bind:class="{ fijar: pass }">Password</label>
          </div>
          <div class="errors" v-if="errors.length">
            <p>Please correct the following error(s):</p>
            <ul>
              <li v-for="(error, ide) in errors" :key="ide">{{ error }}</li>
            </ul>
          </div>
          <button id="log" type="button" @click="login()">Login now</button>
          <router-link to="/signin">you don't have an account? enter here</router-link
          >
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
      email: "",
      pass: "",
      errors: [],
    };
  },
  // mounted() {

  // },
  methods: {
    login() {
      this.errors = [];
      if (!this.email) {
        this.errors.push("Email required.");
      }
      if (!this.pass) {
        this.errors.push("Password required.");
      }
      if (this.email && this.pass) {
        const data = {
          email: this.email,
          pass: this.pass,
        };
        let self = this;
        axios
          .post(
            "http://localhost/api/usuarios/valid_usuario",
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
            console.log(result.data);
            if (result.data) {

              document.getElementById("modal").innerHTML = `<lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_s8zcfby1.json" background="transparent" speed="1" style="width: 150px; height: 150px;" autoplay></lottie-player>
              <p>Inicio de sesión exitoso</p>`;

              setTimeout(function () {
                localStorage.setItem("dataUser", JSON.stringify(result.data));
                self.$router.push("/home");
              }, 2000);
            } else {
              document.getElementById("modal").innerHTML = `<lottie-player src="https://assets2.lottiefiles.com/private_files/lf30_ltbsyn9h.json" background="transparent" speed="1" style="width: 150px; height: 150px;" autoplay></lottie-player>
              <p>Error, email o contraseña incorrecta</p>
              <a href="/login">Back</a>`;
            }
          });
      }
    },
  },
};
</script>
<style lang="scss">
@import "../scss/form.scss";
</style>