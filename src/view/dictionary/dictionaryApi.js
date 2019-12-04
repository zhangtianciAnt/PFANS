import request from '../../utils/request'

export function getForSelect (data) {
  return request({
    url: 'dictionary/getForSelect',
    method: 'get',
    params: data
  })
}

export function getForvalue2 (data) {
  return request({
    url: 'dictionary/getForvalue2',
    method: 'get',
    params: data
  })
}

export function getAll () {
  return request({
    url: 'dictionary/all',
    method: 'get',
  })
}

export function updateDictionary(data) {
  return request({
    url: 'dictionary/update',
    method: 'post',
    data: data
  })
}

export function getFileToken () {
  return request({
    url: 'file/getToken',
    method: 'get',
  })
}
