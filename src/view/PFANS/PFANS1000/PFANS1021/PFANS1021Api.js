import request from '../../../../utils/request'

export function getSecurity() {
  return request({
    url: 'security/get',
    method: 'get'
  })
}

export function getCompanyProjectList(data) {
  return request({
    url: 'logmanagement/getCompanyProjectList',
    method: 'POST',
    data: data
  })
}

export function getSecurityOne(data) {
  return request({
    url: 'security/one',
    method: 'post',
    data: data
  })
}

export function updateSecurity(data) {
  return request({
    url: 'security/update',
    method: 'post',
    data: data
  })
}

export function createSecurity(data) {
  return request({
    url: 'security/create',
    method: 'post',
    data: data
  })
}

export function getForSelect (data) {
  return request({
    url: 'dictionary/getForSelect',
    method: 'get',
    params: data
  })
}
