import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestExcel';

export function get() {
  return request({
    url: 'quotation/get',
    method: 'get'
  })
}
export function selectById(data) {
  return request({
    url: 'quotation/selectById',
    method: 'get',
    params: data
  })
}
export function update(data) {
  return request({
    url: 'quotation/update',
    method: 'post',
    data: data
  })
}

export function downLoad(data) {
  return requestDownload({
    url: 'quotation/downLoad',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

export function one(data) {
  return request({
    url: 'quotation/one',
    method: 'post',
    data: data
  })
}
