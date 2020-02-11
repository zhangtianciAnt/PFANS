import request from '../../../../utils/request'

export function getRecruit() {
  return request({
    url: 'recruit/get',
    method: 'get'
  })
}

export function getCompanyProjectList(data) {
  return request({
    url: 'logmanagement/getCompanyProjectList',
    method: 'POST',
    data: data
  })
}

export function getRecruitOne(data) {
  return request({
    url: 'recruit/one',
    method: 'post',
    data: data
  })
}

export function updateRecruit(data) {
  return request({
    url: 'recruit/update',
    method: 'post',
    data: data
  })
}

export function createRecruit(data) {
  return request({
    url: 'recruit/create',
    method: 'post',
    data: data
  })
}

