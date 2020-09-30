import request from '../../../../utils/request'
import requestPdf from "../../../../utils/requestPdf";

export function getLoanapplication() {
  return request({
    url: 'loanapplication/get',
    method: 'get'
  })
}

export function getLoanapplicationOne(data) {
  return request({
    url: 'loanapplication/one',
    method: 'post',
    data: data
  })
}

export function getLoanapplicationOne2(data) {
  return request({
    url: 'loanapplication/one2',
    method: 'post',
    data: data
  })
}

export function updateLoanapplication(data) {
  return request({
    url: 'loanapplication/update',
    method: 'post',
    data: data
  })
}

export function createLoanapplication(data) {
  return request({
    url: 'loanapplication/create',
    method: 'post',
    data: data
  })
}

//ADD-WS-7/14-禅道144任务
export function getpolicycontract(data) {
  return request({
    url: 'policycontract/get',
    method: 'post',
    data: data
  })
}
export function getpolicycontract3() {
  return request({
    url: 'policycontract/get3',
    method: 'get'
  })
}
export function getpolicycontract2() {
  return request({
    url: 'policycontract/get2',
    method: 'get'
  })
}

export function getaward() {
  return request({
    url: 'award/get2',
    method: 'get'
  })
}

export function getpolicycontractOne(data) {
  return request({
    url: 'policycontract/one',
    method: 'post',
    data: data
  })
}
export function chackcycle(data) {
  return request({
    url: 'policycontract/chackcycle',
    method: 'post',
    data: data
  })
}
export function updatepolicycontract(data) {
  return request({
    url: 'policycontract/update',
    method: 'post',
    data: data
  })
}

export function createpolicycontract(data) {
  return request({
    url: 'policycontract/create',
    method: 'post',
    data: data
  })
}

export function check(data) {
  return request({
    url: 'policycontract/check',
    method: 'post',
    data: data
  })
}
//ADD-WS-7/14-禅道144任务
//add_fjl_0725  打印PDF   START
export function exportjs(data) {
  return requestPdf({
    url: 'loanapplication/exportjs',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}

//add_fjl_0725  打印PDF  end

//采购业务数据流程查看详情
export function getworkfolwPurchaseData(data) {
  return request({
    url: 'loanapplication/getworkfolwPurchaseData',
    method: 'post',
    data: data
  })
}
//采购业务数据流程查看详情
export function getpublice(data) {
  return request({
    url: 'loanapplication/getpublice',
    method: 'post',
    data: data
  })
}
