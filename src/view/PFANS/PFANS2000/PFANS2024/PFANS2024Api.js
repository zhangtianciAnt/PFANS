import request from '../../../../utils/request'

//创建流程
export function createPfans2024(data) {
  return request({
    url: 'talentplan/createNewUser',
    method: 'post',
    data: data
  })
}
export function getDataOne(data) {
  return request({
    url: 'talentplan/one',
    method: 'post',
    data: data
  })
}

//更新流程
export function updatePfans2024(data) {
  return request({
    url: 'talentplan/updateInfo',
    method: 'post',
    data: data
  })
}

//获取流程列表
export function getFpans2024List(data) {
  return request({
    url: 'talentplan/list',
    method: 'post',
    data: data
  })
}

export function create(data) {
  return request({
    url: 'talentplan/create',
    method: 'post',
    data: data
  })
}
