import request from '../../../../utils/request'

export function getvariousfunds(data) {
  return request({
    url: 'variousfunds/get',
    method: 'get',
    params: data
  })
}

export function getPjnameList(data) {
  return request({
    url: 'companyprojects/getPjnameList',
    method: 'post',
    params: data
  })
}

export function getvariousfundsApplyOne(data) {
  return request({
    url: 'variousfunds/one',
    method: 'post',
    data: data
  })
}

export function updatevariousfundsApply(data) {
  return request({
    url: 'variousfunds/update',
    method: 'post',
    data: data
  })
}

export function createvariousfundsApply(data) {
  return request({
    url: 'variousfunds/create',
    method: 'post',
    data: data
  })
}
//
// export function getexpatriatesinfor(data) {
//   return request({
//     url: 'expatriatesinfor/get',
//     method: 'get',
//     params: data
//   })
// }
