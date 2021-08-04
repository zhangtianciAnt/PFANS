import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestDownload';

export function getList(data) {
  return request({
    url: 'themeplan/getList',
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

export function getdataList(data) {
  return request({
    url: 'themeplan/getdataList',
    method: 'get',
    params: data,
  })
}




