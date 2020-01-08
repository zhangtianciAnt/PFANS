import request from "../../../../utils/request"
import requestDownload from '../../../../utils/requestDownload'

export function getInsertInfo(data) {
  return request({
    url: 'assets/insertInfo',
    method: 'post',
    data: data
  })
}

export function insertlots(data) {
  return request({
    url: 'assets/insertlots',
    method: 'post',
    data: data
  })
}

export function getUpdateInfo(data) {
  return request({
    url: 'assets/updateInfo',
    method: 'post',
    data: data
  })
}

export function getList() {
  return request({
    url: 'assets/list',
    method: 'post'
  })
}

export function getOneInfo(data) {
  return request({
    url: 'assets/oneInfo',
    method: 'post',
    data: data
  })
}

export function download(data) {
  return requestDownload({
    url: 'assets/download',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
