import request from '../../../../utils/request'
import requestPdf from '../../../../utils/requestPdf';
import requestDownload from '../../../../utils/requestDownload';

//获取流程列表
export function get() {
  return request({
    url: 'publicexpense/get',
    method: 'get'
  })
}
export function exportjs(data) {
  return requestPdf({
    url: 'publicexpense/exportjs',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}

export function gettotalcost(data) {
  return request({
    url: 'publicexpense/gettotalcost',
    method: 'post',
    data: data
  })
}

//更新
export function update(data) {
  return request({
    url: 'publicexpense/update',
    method: 'post',
    data: data
  })
}

//新建
export function insert(data) {
  return request({
    url: 'publicexpense/insert',
    method: 'post',
    data: data
  })
}
//查看详细
export function selectById(data) {
  return request({
    url: 'publicexpense/selectById',
    method: 'get',
    params: data
  })
}

export function selectByIdone2(data) {
  return request({
    url: 'publicexpense/one2',
    method: 'post',
    data: data
  })
}

export function getpublicelist(data) {
  return request({
    url: 'publicexpense/getpublicelist',
    method: 'get',
    params: data
  })
}

//裁决号
export function getJudgement(data) {
  return request({
    url: 'publicexpense/getJudgement',
    method: 'post',
    data: data
  })
}
//暂借款申请编号
export function getLoanApplication(data) {
  return request({
    url: 'publicexpense/getLoanApplication',
    method: 'post',
    data: data
  })
}

export function getLoanApplicationList(data) {
  return request({
    url: 'publicexpense/getLoanApplicationList',
    method: 'get',
    params: data
  })
}

export function selectJudgement(data) {
  return request({
    url: 'judgement/selectJudgement',
    method: 'post',
    data: data
  })
}

export function selectPurchaseApply(data) {
  return request({
    url: 'purchaseApply/selectPurchaseApply',
    method: 'post',
    data: data
  })
}

export function selectCommunication(data) {
  return request({
    url: 'communication/selectCommunication',
    method: 'post',
    data: data
  })
}

//采购业务数据流程查看详情
export function getworkfolwPurchaseData(data) {
  return request({
    url: 'publicexpense/getworkfolwPurchaseData',
    method: 'post',
    data: data
  })
}
//采购业务数据流程查看详情
