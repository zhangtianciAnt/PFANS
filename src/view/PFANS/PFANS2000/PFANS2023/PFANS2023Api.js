import request from '../../../../utils/request'

//创建流程
export function createPfans2023(data) {
  return request({
    url: 'goalmanagement/createNewUser',
    method: 'post',
    data: data
  })
}
export function getDataOne(data) {
  return request({
    url: 'goalmanagement/one',
    method: 'post',
    data: data
  })
}

//更新流程
export function updatePfans2023(data) {
  return request({
    url: 'goalmanagement/updateInfo',
    method: 'post',
    data: data
  })
}

//获取流程列表
export function getFpans2023List(data) {
  return request({
    url: 'goalmanagement/list',
    method: 'post',
    data: data
  })
}
