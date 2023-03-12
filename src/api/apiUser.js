import axios from 'axios'

export const login = async (url, data, sign, message) => {
  const result = await axios.post(url, data)
  let respError = 'Error: Contraseña incorrecta. Intente con otra nuevamente.'
  let resp = result.data.msg
  message.classList.add('show-modal')
  sign.innerHTML = `<i class="fas fa-${
    resp === respError ? 'times' : 'check'
  }"></i>`
  sign.classList.add('response')
  if (resp === respError) {
    sign.style.backgroundColor = 'red'
    return false
  }
  localStorage.setItem('dataUser', JSON.stringify(result.data.usuario))
  return true
}

export const signin = async (url, data, sign, message) => {
  const result = await axios.post(url, data)
  let respError = 'Cuenta registrada correctamente.'
  let resp = result.data.msg
  message.classList.add('show-modal')
  sign.innerHTML = `<i class="fas fa-${
    resp !== respError ? 'times' : 'check'
  }"></i>`
  sign.classList.add('response')
  if (resp !== respError) {
    sign.style.backgroundColor = 'red'
    return false
  }
  return true
}
