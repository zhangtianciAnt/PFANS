import request from '../../../../utils/request'
import requestDownload from "../../../../utils/requestDownload";

export function getexpatriatesinfor(data) {
  return request({
    url: 'expatriatesinfor/get',
    method: 'get',
    params: data
  })
}

export function getexpatriatesinforthisyear(data) {
  return request({
    url: 'expatriatesinfor/getexpatriatesinforthisyear',
    method: 'get',
    params: data
  })
}

export function getexpatriatesinforApplyOne(data) {
  return request({
    url: 'expatriatesinfor/one',
    method: 'post',
    data: data
  })
}

export function getusinginformation(data) {
  return request({
    url: 'expatriatesinfor/getusinginformation',
    method: 'post',
    data: data
  })
}

export function updateexpatriatesinforApply(data) {
  return request({
    url: 'expatriatesinfor/update',
    method: 'post',
    data: data
  })
}
export function updateexpatriatesinfor(data) {
  return request({
    url: 'expatriatesinfor/updateexpatriatesinfor',
    method: 'post',
    data: data
  })
}

export function createexpatriatesinforApply(data) {
  return request({
    url: 'expatriatesinfor/create',
    method: 'post',
    data: data
  })
}
// export function setexpatriatesinforApply(data) {
//   return request({
//     url: 'expatriatesinfor/setexpatriatesinforApply',
//     method: 'post',
//     data: data
//   })
// }

export function getSupplierNameList(data) {
  return request({
    url: 'expatriatesinfor/getSupplierNameList',
    method: 'POST',
    data: data
  })
}

export function download(data) {
  return requestDownload({
    url: 'expatriatesinfor/download',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

export function getCompanyProject(data) {
  debugger;
  return request({
    url: 'companyprojects/getCompanyProject',
    method: 'get',
    params: data,
  })
}

