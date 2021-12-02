import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestDownload'
import requestPdf from "../../../../utils/requestPdf";

export function get() {
  return request({
    url: 'petition/get',
    method: 'get'
  })
}
//  add  ml  211201  分页  from
export function getPage() {
  return request({
    url: 'petition/getPage',
    method: 'get'
  })
}
//  add  ml  211201  分页  to
export function one(data) {
  return request({
    url: 'petition/one',
    method: 'post',
    data: data
  })
}
export function update(data) {
  return request({
    url: 'petition/update',
    method: 'post',
    data: data
  })
}

export function downLoad(data) {
  return requestDownload({
    url: 'petition/downLoad1',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
