import request from "../../../../utils/request"


export function createPfans1043(data) {
  return request({
    url: 'themeinfor/insertInfo',
    method: 'post',
    data: data
  })
}


export function getthemename(data) {
  return request({
    url: 'themeplan/getthemename',
    method: 'get',
    params: data,
  })
}


export function updatePfans1043(data) {
  return request({
    url: 'themeinfor/updateInfo',
    method: 'post',
    data: data
  })
}


export function getFpans1043List() {
  return request({
    url: 'themeinfor/list',
    method: 'post'
  })
}

export function getlisttheme(data) {
  return request({
    url: 'themeinfor/getlisttheme',
    method: 'get',
    params: data,
  })
}

export function getPfans1043One(data) {
  return request({
    url: 'themeinfor/oneInfo',
    method: 'post',
    data: data
  })
}
