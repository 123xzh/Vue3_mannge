import axios from './axios'

// export const getMenu = () => {
//   return axios.request({
//     url: 'menu',
//     method: 'get'
//   })
// }

export const getHome = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}

export const getUserData = (params) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    // mock:false,
    data:params
  })
}
export const createUser = (params) => {
  return axios.request({
    url: '/user/createUser',
    method: 'post',
    mock:false,
    data:params
  })
}
export const deleteUser = (params) => {
  return axios.request({
    url: '/user/deleteUser',
    method: 'post',
    mock:false,
    data:params
  })
}

