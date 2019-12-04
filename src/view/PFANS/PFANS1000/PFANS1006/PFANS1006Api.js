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
