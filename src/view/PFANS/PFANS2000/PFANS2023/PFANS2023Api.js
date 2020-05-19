import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestDownload'
import requestPdf from "../../../../utils/requestPdf";

//创建流程
export function createPfans2023(data) {
  return request({
    url: 'goalmanagement/createNewUser',
    method: 'post',
    data: data
  })
}
export function getDataOne(data) {
  return request({
    url: 'goalmanagement/one',
    method: 'post',
    data: data
  })
}

//更新流程
export function updatePfans2023(data) {
  return request({
    url: 'goalmanagement/updateInfo',
    method: 'post',
    data: data
  })
}

//获取流程列表
export function getFpans2023List(data) {
  return request({
    url: 'goalmanagement/list',
    method: 'post',
    data: data
  })
}

//获取流程列表
export function yearsCheck(data) {
  return request({
    url: 'goalmanagement/yearsCheck',
    method: 'post',
    data: data
  })
}

//获取流程列表
export function download(data) {
  return requestPdf({
    url: 'goalmanagement/downLoad1',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

