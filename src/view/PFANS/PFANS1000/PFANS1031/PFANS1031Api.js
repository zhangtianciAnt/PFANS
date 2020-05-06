import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestDownload';
import requestPdf from "../../../../utils/requestPdf";

export function get(data) {
  return request({
    url: 'napalm/get',
    method: 'get',
    params: data
  })
}

export function one(data) {
  return request({
    url: 'napalm/one',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: 'napalm/update',
    method: 'post',
    data: data
  })
}

export function downLoad(data) {
  return requestPdf({
    url: 'napalm/downLoad1',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

