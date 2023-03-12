import axios from 'axios'

const url = process.env.VUE_APP_SERVER

export const createPlaylist = async formData => {
  let endpoint = url + process.env.VUE_APP_CREATE_PLAYLIST
  const response = await axios.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data.msg === 'Playlist creada correctamente.'
}

export const getPlaylists = async idUsuario => {
  let endpoint = url + process.env.VUE_APP_GET_PLAYLISTS
  endpoint = endpoint.replace(':idUsuario', idUsuario)
  const res = await axios.get(endpoint)
  return res.data
}

export const getPlaylist = async idPlaylist => {
  let endpoint = url + process.env.VUE_APP_GET_PLAYLIST_BY_ID
  endpoint = endpoint.replace(':idPlaylist', idPlaylist)
  const res = await axios.get(endpoint)

  return res.data
}

export const getSongsOfPlaylist = async idPlaylist => {
  let endpoint = url + process.env.VUE_APP_GET_SONGS_PLAYLIST_BY_ID
  endpoint = endpoint.replace(':idPlaylist', idPlaylist)
  const res = await axios.get(endpoint)

  return res.data
}

export const totalDurationPlaylist = async songsPlaylist => {
  let totalSeconds = songsPlaylist.reduce((prev, curr) => {
    return prev + parseInt(curr.duracion_cancion)
  }, 0)
  let minutes = parseInt(totalSeconds / 60)
  let seconds = totalSeconds % 60
  return `${minutes} min ${seconds} s`
}
