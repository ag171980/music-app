var myVar
var sec = 0
var min = 0
var totalSeconds = 0

export const chooseFilter = (filterSelected, stateFilters, songsPlaylist) => {
  document.getElementsByClassName('list-filters')[0].classList.remove('show')
  stateFilters = true
  songsPlaylist.sort((a, b) => {
    let filters = {
      a: {
        Title: a.nombre_cancion,
        Artist: a.artista_cancion,
        Duration: a.duracion_cancion,
        Custom: a.id_cancion
      },
      b: {
        Title: b.nombre_cancion,
        Artist: b.artista_cancion,
        Duration: b.duracion_cancion,
        Custom: b.id_cancion
      }
    }

    if (filters.a[filterSelected] > filters.b[filterSelected]) {
      return 1
    }
    if (filters.a[filterSelected] < filters.b[filterSelected]) {
      return -1
    }
    return 0
  })
  return filterSelected
}

export const showAlert = (
  name,
  artist,
  songLast,
  songActually,
  totalSeconds,
  valueVol,
  stateBtn,
  myTimer
) => {
  let song = {
    name: name,
    artist: artist
  }
  getSong(
    song,
    songLast,
    songActually,
    totalSeconds,
    valueVol,
    stateBtn,
    myTimer
  )
  //   song,
  //   songLast,
  //   songActually,
  //   totalSeconds,
  //   valueVol,
  //   stateBtn,
  //   myTimer

  return song
}
export const showFilters = stateFilters => {
  let listFilters = document.getElementsByClassName('list-filters')[0]
  stateFilters
    ? listFilters.classList.add('show')
    : listFilters.classList.remove('show')
  stateFilters = !stateFilters
}
export const showSearchBar = stateSearchBar => {
  if (stateSearchBar) {
    document.querySelector('.input-search').classList.remove('show')
  } else {
    document.querySelector('.input-search').classList.add('show')
  }
  stateSearchBar = !stateSearchBar
}

export const searchSong = (songsPlaylist, song, songsPlaylistAux) => {
  return song.length === 0
    ? songsPlaylistAux
    : songsPlaylist.filter(sng =>
        sng.nombre_cancion.toLowerCase().includes(song)
      )
}

export const randomMusic = (songsPlaylist, stateBtn) => {
  let posRandom = Math.round(Math.random() * songsPlaylist.length)
  putVideo(songsPlaylist[posRandom], posRandom, stateBtn)
}

export const putVideo = (arrSong, id, stateBtn) => {
  selectMusic(id)
  let contentVideoYT = document.querySelector('.contentVideoYT')
  contentVideoYT.innerHTML = `<iframe
      id="videoYT"
      width="120"
      height="85"
      src="https://www.youtube.com/embed/${arrSong.id}?&autoplay=1&controls=1&enablejsapi=1"
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
  getSong(arrSong, stateBtn)
}
export const selectMusic = id => {
  clearSelected()
  let nameSongOfPlaylistToStart =
    document.getElementsByClassName('songName')[id]
  nameSongOfPlaylistToStart.style.color = '#a82dff'
}
export const clearSelected = () => {
  document.querySelectorAll('.songName').forEach(song => {
    song.style.color = 'white'
  })
}

export const getSong = (
  song,
  songLast,
  songActually,
  totalSeconds,
  valueVol,
  stateBtn
) => {
  songLast == ''
    ? (songLast = {
        img: song.thumbnail_cancion,
        name: song.nombre_cancion,
        artist: song.artista_cancion,
        duration: {
          minutes: parseInt(song.duracion_cancion / 60),
          seconds: parseInt(song.duracion_cancion % 60)
        }
      })
    : (songLast = songActually)

  songActually = {
    img: song.thumbnail_cancion,
    name: song.nombre_cancion,
    artist: song.artista_cancion,
    duration: {
      minutes: parseInt(song.duracion_cancion / 60),
      seconds: parseInt(song.duracion_cancion % 60)
    }
  }
  document.getElementById(
    'durationSong'
  ).innerHTML = `${songActually.duration.minutes}:${songActually.duration.seconds}`
  totalSeconds = convertTime(songActually.duration)
  volumeVideo(valueVol)
  actionMusic('start', stateBtn, totalSeconds)
  changeBtnPlay(stateBtn)
  let response = {
    songLast: songLast,
    songActually: songActually
  }
  console.log(response)
  return response
}
export const volumeVideo = valVolumen => {
  let videoYT = document.getElementById('videoYT')
  videoYT.contentWindow.postMessage(
    `{"event":"command","func":"setVolume","args":[${valVolumen}]}`,
    '*'
  )
}

export const actionMusic = (stateVideo, stateBtn, totalSeconds) => {
  console.log(totalSeconds)
  if (stateVideo == 'change') {
    console.log(stateBtn)
    if (stateBtn) {
      document.getElementById('fill').classList.add('paused')
      document.getElementById('fill_mobile').classList.add('paused')
      clearInterval(myVar)
    } else {
      document.getElementById('fill').classList.remove('paused')
      document.getElementById('fill_mobile').classList.remove('paused')
      myVar = setInterval(myTimer(totalSeconds), 1000)
      console.log(myVar)
      return myVar
    }
  } else {
    restartDataFromTimer(totalSeconds)
    clearInterval(myVar)
    myVar = setInterval(myTimer(totalSeconds), 1000)
  }
}

export const myTimer = totalSecondss => {
  var ini = document.getElementById('ini')
  if (totalSeconds <= totalSecondss) {
    if (sec == 60) {
      min++
      sec = 0
    }
    ini.innerHTML = sec > 9 ? `${min}:${sec}` : `${min}:0${sec}`
    sec++
    totalSeconds++
  } else {
    // randomMusic()
    totalSeconds = 0
    sec = 0
    min = 0
  }
  return totalSeconds
  console.log(totalSeconds)
}
export const restartDataFromTimer = totalSecondss => {
  let fill = document.getElementById('fill')
  let fill_mobile = document.getElementById('fill_mobile')
  fill.style.animation = 'none'
  fill.offsetHeight
  fill.style.animation = null
  totalSeconds = 0
  sec = 0
  min = 0
  fill.style.animation = `bar-progress ${totalSecondss}s steps(${totalSecondss},end)`

  fill_mobile.style.animation = 'none'
  fill_mobile.offsetHeight
  fill_mobile.style.animation = null
  fill_mobile.style.animation = `bar-progress ${totalSecondss}s steps(${totalSecondss},end)`
}

export const convertTime = arr => {
  let secs = 0
  secs += arr.seconds + arr.minutes * 60
  return secs
}

export const changeStateVideo = (stateBtn, totalSeconds) => {
  let videoYT = document.getElementById('videoYT')

  videoYT.contentWindow.postMessage(
    `{"event":"command","func":${
      stateBtn ? '"pauseVideo"' : '"playVideo"'
    },"args":""}`,
    '*'
  )
  actionMusic('change', stateBtn, totalSeconds)
  changeBtnPlay(stateBtn)
  return !stateBtn
}

export const changeBtnPlay = state => {
  const btn = document.getElementById('btnPlay')
  btn.innerHTML = `<i class="fas fa-${state ? 'play' : 'pause'}"></i>`
  // if (state) {
  //   btn.innerHTML = `<i class="fas fa-play"></i>`
  // } else {
  //   btn.innerHTML = `<i class="fas fa-pause"></i>`
  // }
  state = !state
}
