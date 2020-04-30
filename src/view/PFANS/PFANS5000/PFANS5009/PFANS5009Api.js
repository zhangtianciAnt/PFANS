import request from '../../../../utils/request'

export function selectById(data) {
  return request({
    url: 'companyprojects/selectById',
    method: 'get',
    params: data
  })
}
export function update(data) {
  return request({
    url: 'companyprojects/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'companyprojects/insert',
    method: 'post',
    data: data
  })
}

export function getSiteList(data) {
  return request({
    url: 'companyprojects/getSiteList',
    method: 'get',
    params: data
  })
}

export function getSiteList3(data) {
  return request({
    url: 'companyprojects/getSiteList3',
    method: 'get',
    params: data
  })
}

export function getSiteList4(data) {
  return request({
    url: 'companyprojects/getSiteList4',
    method: 'get',
    params: data
  })
}

export function getSiteList2(data) {
  return request({
    url: 'companyprojects/getSiteList2',
    method: 'get',
    params: data
  })
}

export function getSiteList5(data) {
  return request({
    url: 'companyprojects/getSiteList5',
    method: 'get',
    params: data
  })
}

