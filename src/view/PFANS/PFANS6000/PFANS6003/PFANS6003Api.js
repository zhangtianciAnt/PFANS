import request from '../../../../utils/request'

export function getsupplierinfor(data) {
  return request({
    url: 'supplierinfor/get',
    method: 'get',
    params: data
  })
}

export function getsupplierinforApplyOne(data) {
  return request({
    url: 'supplierinfor/one',
    method: 'post',
    data: data
  })
}

export function updatesupplierinforApply(data) {
  return request({
    url: 'supplierinfor/update',
    method: 'post',
    data: data
  })
}

export function createsupplierinforApply(data) {
  return request({
    url: 'supplierinfor/create',
    method: 'post',
    data: data
  })
}
