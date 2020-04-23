import request from '../../../../utils/request'
import requestPdf from "../../../../utils/requestPdf";

export function getSoftwaretransfer() {
  return request({
    url: 'softwaretransfer/get',
    method: 'get',
    // params: data
  })

}

export function selectById(data) {
  return request({
    url: 'softwaretransfer/selectById',
    method: 'get',
    params: data
  })
}

export function updateSoftwaretransfer(data) {
  return request({
    url: 'softwaretransfer/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'softwaretransfer/insert',
    method: 'post',
    data: data
  })
}

export function downLoad(data) {
  return requestPdf({
    url: 'softwaretransfer/downLoad1',
    method: 'get',
    data: data,
    responseType: 'blob'
  })
}
