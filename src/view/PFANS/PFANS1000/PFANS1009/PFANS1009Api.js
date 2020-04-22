import request from '../../../../utils/request'
import requestPdf from "../../../../utils/requestPdf";

export function getFixedassets() {
  return request({
    url: 'fixedassets/get',
    method: 'get'
  })
}

export function getFixedassetsOne(data) {
  return request({
    url: 'fixedassets/one',
    method: 'post',
    data: data
  })
}

export function updateFixedassets(data) {
  return request({
    url: 'fixedassets/update',
    method: 'post',
    data: data
  })
}

export function createFixedassets(data) {
  return request({
    url: 'fixedassets/create',
    method: 'post',
    data: data
  })
}

export function getAssetsnameList(data) {
  return request({
    url: 'fixedassets/getAssetsnameList',
    method: 'POST',
    data: data
  })
}

export function downLoad(data) {
  return requestPdf({
    url: 'fixedassets/downLoad1',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

