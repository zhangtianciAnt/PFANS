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

//ADD-WS-7/14-禅道144任务
export function checkby(data) {
  return request({
    url: 'award/checkby',
    method: 'post',
    data: data
  })
}
//ADD-WS-7/14-禅道144任务

//add ccm 0723  其他契约决裁书
export function getList(data) {
  return request({
    url: 'award/getList',
    method: 'post',
    data: data
  })
}
//add ccm 0723
//数据结转
export function dataCarryover(data) {
  return request({
    url: 'award/dataCarryover',
    method: 'post',
    data: data
  })
}
