import request from '../../../../utils/request'

export function getList(data) {
  return request({
    url: 'themeplan/getList',
    method: 'post',
    data: data
  })
}

export function get(data) {
  return request({
    url: 'themeplan/get',
    method: 'post',
    data: data
  })
}

export function getdetilList(data) {
  return request({
    url: 'themeplan/getdetilList',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'themeplan/insert',
    method: 'post',
    data: data
  })
}


export function update(data) {
  return request({
    url: 'themeplan/update',
    method: 'post',
    data: data
  })
}
export function inserttheme(data) {
  return request({
    url: 'themeplan/inserttheme',
    method: 'post',
    data: data
  })
}






