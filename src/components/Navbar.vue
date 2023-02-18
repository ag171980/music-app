<template>
  <div class="navbar">
    <div class="logo">
      <img src="../assets/logo.png" alt="" />
      <h1>SPOTI<span>FAKE</span></h1>
    </div>
    <div @click="openMenu" class="btn-hamb">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <div class="menu-desplegable">
      <a @click="closeMenu" class="item-desplegable" href="/">Home</a>
      <!-- <a @click="closeMenu" class="item-desplegable" href="#Features"
        >Features</a
      >
      <a @click="closeMenu" class="item-desplegable" href="#Contact">Contact</a> -->
      <div class="line"></div>
      <router-link to="/signin" class="item-desplegable">Sign Up</router-link>
      <router-link to="/login" class="item-desplegable">Log In</router-link>
    </div>
    <div class="menu">
      <router-link
        v-if="namePageActual != 'Index'"
        to="/"
        class="item-menu animate__animated animate__fadeIn"
        >Home</router-link
      >
      <div v-if="namePageActual != 'Index'" class="line"></div>
      <router-link
        to="/signin"
        class="item-menu animate__animated animate__fadeIn animate__delay-0-8s"
        >Sign Up</router-link
      >
      <router-link
        to="/login"
        class="item-menu animate__animated animate__fadeIn animate__delay-1s"
        >Log In</router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      menuDesplegable: false,
      namePageActual: this.$route.name,
    };
  },
  methods: {
    openMenu() {
      let item = document.getElementsByClassName("item-desplegable");
      if (this.menuDesplegable) {
        document.getElementsByClassName("menu-desplegable")[0].style.height =
          "0";
        for (let i = 0; i < item.length; i++) {
          item[i].style.visibility = "hidden";
          item[i].style.opacity = "0";
        }
        this.menuDesplegable = false;
      } else {
        document.getElementsByClassName("menu-desplegable")[0].style.height =
          "300px";
        setTimeout(() => {
          for (let i = 0; i < item.length; i++) {
            item[i].style.visibility = "visible";
            item[i].style.opacity = "1";
          }
        }, 500);
        this.menuDesplegable = true;
      }
    },
    closeMenu() {
      let item = document.getElementsByClassName("item-desplegable");
      document.getElementsByClassName("menu-desplegable")[0].style.height = "0";
      for (let i = 0; i < item.length; i++) {
        item[i].style.visibility = "hidden";
        item[i].style.opacity = "0";
      }
      this.menuDesplegable = false;
    },
  },
};
</script>