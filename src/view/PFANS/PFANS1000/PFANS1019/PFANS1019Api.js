import request from '../../../../utils/request'

export function getTrialsoft() {
  return request({
    url: 'Trialsoft/get',
    method: 'get'
  })
}

export function getTrialsoftOne(data) {
  return request({
    url: 'Trialsoft/one',
    method: 'post',
    data: data
  })
}

export function updateTrialsoft(data) {
  return request({
    url: 'Trialsoft/update',
    method: 'post',
    data: data
  })
}

export function createTrialsoft(data) {
  return request({
    url: 'Trialsoft/create',
    method: 'post',
    data: data
  })
}
