import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/role/select',
    method: 'get'
  })
}

export function getPageRoles(data) {
  return request({
    url: '/role/list',
    method: 'post',
    data: { body: data }
  })
}

export function deleteRole(ids) {
  return request({
    url: '/role/delete?roleid=' + ids,
    method: 'delete'
  })
}

export function getRoleInfo(id) {
  return request({
    url: `/role/info?id=` + id,
    method: 'get'
  })
}

export function addOrUpdate(id, data) {
  return request({
    url: `/role/${!id ? 'save' : 'update'}`,
    method: 'post',
    data: data
  })
}

export function searchRole(rolename) {
  return request({
    url: '/role/search?rolename=' + rolename,
    method: 'get'
  })
}
