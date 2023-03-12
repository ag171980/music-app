import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    stateBtn: true,
    msg: 'asdzxczcxz',
    songsPlaylist: [],
    data_playlist: {},
    posRandomPlaylist: undefined
  },
  mutations: {},
  actions: {
    async randomMusic () {
      this.state.posRandomPlaylist = Math.round(
        Math.random() * this.state.songsPlaylist.length
      )
      console.log(this.state.posRandomPlaylist)
      // this.putVideo(
      //   this.state.songsPlaylist[this.state.posRandomPlaylist],
      //   this.state.posRandomPlaylist
      // )
      this.dispatch('putVideo')
    },
    putVideo () {
      let contentVideoYT = document.querySelector('.contentVideoYT')
      contentVideoYT.innerHTML = `<iframe
      id="videoYT"
      width="120"
      height="85"
      src="https://www.youtube.com/embed/${
        this.state.songsPlaylist[this.state.posRandomPlaylist].id
      }?&autoplay=1&controls=1&enablejsapi=1"
      title="YouTube video player"
      frameborder="0"
      autoplay
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>`
      let videoYoutube = document.getElementById('videoYT')
      videoYoutube.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      )
      console.log(contentVideoYT)
    }
  },
  getters: {}
})
