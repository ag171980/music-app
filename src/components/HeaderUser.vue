<template>
  <div class="headerUser">
    <div class="header-primary">
      <h1 v-if="namePageActual == 'Home'">Welcome {{ dataUser.fullname }}</h1>
      <div class="arrows">
        <button v-if="namePageActual != 'Home'" href="">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button v-if="namePageActual != 'Home'" href="">
          <i class="fas fa-chevron-right"></i>
        </button>
        <div class="searchbar" v-if="namePageActual == 'Search'">
          <input
            type="text"
            v-model="searchInYT"
            placeholder="Search a music..."
          />
          <i class="fas fa-search" @click="searchMusic()"></i>
        </div>
      </div>
      <div class="user-settings" @click="openModalSettings()">
        <i class="fas fa-user"></i>
        <p>{{ dataUser.fullname }}</p>
        <i class="fas fa-sort-down"></i>
      </div>
    </div>
    <div :class="{ 'modal-settings': true, modalOn: stateSettings }">
      <p>Log Out</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HeaderUser",
  props: ["dataUser"],
  data() {
    return {
      dat: this.dataUser,
      stateSettings: false,
      namePageActual: this.$parent.name,
      searchInYT: "",
      // AIzaSyATyct37Zv28gLbaIE3Me_VuzRQjm5e6Ic
      //AIzaSyBo1zRgN23QOSVM8EzGFiGxVC1FZ6FGLNw
      key: "AIzaSyATyct37Zv28gLbaIE3Me_VuzRQjm5e6Ic",
    };
  },
  methods: {
    openModalSettings() {
      this.stateSettings
        ? (this.stateSettings = false)
        : (this.stateSettings = true);
    },
    searchMusic() {
      this.$parent.resultOf = this.searchInYT;
      // console.log(this.$parent.resultOf)
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.searchInYT}&key=${this.key}`
        )
        .then((res) => {
          this.$parent.resultsSearch = res.data.items;
          console.log(res.data);
        });
    },
  }
};
</script>