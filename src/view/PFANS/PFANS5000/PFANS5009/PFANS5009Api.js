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


