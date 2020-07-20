import request from '../../../../utils/request'

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
export function getpolicycontract() {
  return request({
    url: 'policycontract/get',
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
