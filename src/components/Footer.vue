<template>
  <footer class="footer">
    <p class="developed">
      Developed by
      <a href="https://github.com/ag171980" target="_blank" id="myName"
        >Teoo19</a
      >
    </p>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      stateSocial: true,
    };
  },
  methods: {
    getName() {
      const socials = document.getElementById("socials");
      if (this.stateSocial) {
        socials.classList.remove("show");
        this.stateSocial = false;
      } else {
        socials.classList.add("show");
        this.stateSocial = true;
      }
      console.log(this.stateSocial);
    },
  },
};
</script>
<style lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.developed {
  font-size: 24px;
  color: #1fbe1c;
  padding: 10px 0;
}
#myName {
  text-decoration: none;
  color: #1fbe1c;
  margin-top: 30%;
  animation: neon 3s infinite;
}
#myName:hover {
  cursor: pointer;
}
// .socials {
//   opacity: 0;
//   visibility: hidden;
//   position: absolute;
//   bottom: 0;
//   left: 60%;
//   transform: translateX(-50%);
//   transition: 0.5s all;
//   i {
//     position: relative;
//     top: 0px;
//     color: #1fbe1c;
//     font-size: 23px;
//     padding: 15px;
//     transition: 0.3s all;
//     &:hover {
//       cursor: pointer;
//       top: -10px;
//     }
//   }
// }
.show {
  visibility: visible;
  opacity: 1;
}

@keyframes neon {
  0% {
    text-shadow: none;
  }
  50% {
    text-shadow: 0 0 5px rgba(30, 206, 31, 1), 0 0 10px rgba(30, 206, 31, 1),
      0 0 20px rgba(30, 206, 31, 1), 0 0 40px rgba(25, 157, 25, 1),
      0 0 80px rgba(25, 157, 25, 1), 0 0 90px rgba(25, 157, 25, 1),
      0 0 100px rgba(19, 104, 19, 1), 0 0 140px rgba(19, 104, 19, 1),
      0 0 180px rgba(19, 104, 19, 1);
  }
  100% {
    text-shadow: none;
  }
}
</style>
