import request from '../../../../utils/request'

export function getTrialsoft() {
  return request({
    url: 'trialsoft/get',
    method: 'get'
  })
}

export function selectById(data) {
  return request({
    url: 'trialsoft/selectById',
    method: 'get',
    params: data
  })
}


export function update(data) {
  return request({
    url: 'trialsoft/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'trialsoft/insert',
    method: 'post',
    data: data
  })
}
