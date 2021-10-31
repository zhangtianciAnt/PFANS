import request from '../../../../utils/request'
import requestPdf from "../../../../utils/requestPdf";

export function downLoad(data) {
  return requestPdf({
    url: 'purchase/downLoad1',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
export function getPurchase() {
  return request({
    url: 'purchase/get',
    method: 'get'
  })
}

export function change(data) {
  return request({
    url: 'purchase/change',
    method: 'post',
    data: data
  })
}

export function getPurchaseList() {
  return request({
    url: 'purchase/getlist',
    method: 'get'
  })
}

export function getPurchaseOne(data) {
  return request({
    url: 'purchase/one',
    method: 'post',
    data: data
  })
}

export function updatePurchase(data) {
  return request({
    url: 'purchase/update',
    method: 'post',
    data: data
  })
}

export function createPurchase(data) {
  return request({
    url: 'purchase/create',
    method: 'post',
    data: data
  })
}

//采购业务数据流程查看详情
export function getworkfolwPurchaseData(data) {
  return request({
    url: 'purchase/getworkfolwPurchaseData',
    method: 'post',
    data: data
  })
}
//采购业务数据流程查看详情

//region scc add 购买决裁删除 from
export function purchdelete(data) {
  return request({
    url: 'purchase/purchdelete',
    method: 'post',
    data: data,
  });
}
//endregion scc add 购买决裁删除 to
