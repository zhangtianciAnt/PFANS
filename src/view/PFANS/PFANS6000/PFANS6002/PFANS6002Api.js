import request from '../../../../utils/request'
import requestDownload from "../../../../utils/requestDownload";

export function getcustomerinfor(data) {
  return request({
    url: 'customerinfor/get',
    method: 'get',
    params: data
  })
}

export function getcustomerinforApplyOne(data) {
  return request({
    url: 'customerinfor/one',
    method: 'post',
    data: data
  })
}

export function updatecustomerinforApply(data) {
  return request({
    url: 'customerinfor/update',
    method: 'post',
    data: data
  })
}

export function createcustomerinforApply(data) {
  return request({
    url: 'customerinfor/create',
    method: 'post',
    data: data
  })
}

export function download(data) {
  return requestDownload({
    url: 'customerinfor/download',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
