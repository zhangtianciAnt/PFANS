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
// 禅道任务152
export function getDataOne(data) {
  return request({
    url: 'award/selectById2',
    method: 'post',
    data: data
  })
}
export function getDataOne2(data) {
  return request({
    url: 'award/selectList',
    method: 'post',
    data: data
  })
}
// 禅道任务152
export function generateJxls(data) {
  return requestDownload({
    url: 'award/generateJxls',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
