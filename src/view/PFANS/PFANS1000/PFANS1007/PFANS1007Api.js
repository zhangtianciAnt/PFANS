import request from '../../../../utils/request'
import requestPdf from "../../../../utils/requestPdf";

export function getAssetinformation() {
  return request({
    url: 'assetinformation/get',
    method: 'get',
  })
}

export function selectById(data) {
  return request({
    url: 'assetinformation/selectById',
    method: 'get',
    params: data
  })
}

export function updateAssetinformation(data) {
  return request({
    url: 'assetinformation/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'assetinformation/insert',
    method: 'post',
    data: data
  })
}

export function downLoad(data) {
  return requestPdf({
    url: 'assetinformation/downLoad1',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}
