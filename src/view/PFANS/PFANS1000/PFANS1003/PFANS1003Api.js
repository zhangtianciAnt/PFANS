import request from '../../../../utils/request'

export function getJudgement(data) {
  return request({
    url: 'judgement/get',
    method: 'get',
    data: data
  })
}

export function getJudgementOne(data) {
  return request({
    url: 'judgement/one',
    method: 'post',
    data: data
  })
}

export function updateJudgement(data) {
  return request({
    url: 'judgement/update',
    method: 'post',
    data: data
  })
}

export function createJudgement(data) {
  return request({
    url: 'judgement/create',
    method: 'post',
    data: data
  })
}
