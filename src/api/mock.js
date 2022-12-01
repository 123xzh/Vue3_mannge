import Mock from 'mockjs'

// import homeApi from './mockServerData/home'
import userApi from './mockServerData/user'



// Mock.mock(/api\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'get', userApi.updateUser)
Mock.mock(/user\/del/, 'get', userApi.deleteUser)
