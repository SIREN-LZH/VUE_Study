import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function getInfoById(id) {
  return request({
    url: `/user/info/getInfoById?id=` + id,
    method: 'get'
  })
}

export function addOrUpdate(id, data) {
  return request({
    url: `/user/${!id ? 'save' : 'update'}`,
    method: 'post',
    data: data
  })
}

export function getPublicKey() {
  return request({
    url: '/getPubKey',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'delete'
  })
}

export function resetToken() {
  return request({
    url: '/refresh',
    method: 'post'
  })
}

export function getUserList(data) {
  return request({
    url: '/user/list',
    method: 'get',
    data: { body: data }
  })
}

export function deleteUser(userid) {
  return request({
    url: '/user/delete?userid=' + userid,
    method: 'delete'
  })
}

export function updatePassword(data) {
  return request({
    url: '/user/password',
    method: 'post',
    data: { body: data }
  })
}
export function searchUser(userName) {
  return request({
    url: '/user/search?username=' + userName,
    method: 'get'

  })
}
