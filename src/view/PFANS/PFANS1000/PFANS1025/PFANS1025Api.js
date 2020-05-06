import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestDownload';
import requestPdf from "../../../../utils/requestPdf";

export function get(data) {
  return request({
    url: 'award/get',
    method: 'get',
    params: data,
  })
}
export function update(data) {
  return request({
    url: 'award/update',
    method: 'post',
    data: data
  })
}
export function selectById(data) {
  return request({
    url: 'award/selectById',
    method: 'get',
    params: data
  })
}
export function generateJxls(data) {
  return requestPdf({
    url: 'award/generateJxls',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
