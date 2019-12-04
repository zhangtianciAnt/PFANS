import request from '../../../../utils/request'

//获取流程列表
export function getJapanCondominium() {
  return request({
    url: 'japancondominium/get',
    method: 'get'
  })
}

//根据id获取
export function selectById(data) {
  return request({
    url: 'japancondominium/selectById',
    method: 'get',
    params: data
  })
}

//更新流程
export function updateJapanCondominium(data) {
  return request({
    url: 'japancondominium/update',
    method: 'post',
    data: data
  })
}

//创建流程
export function createJapanCondominium(data) {
  return request({
    url: 'japancondominium/create',
    method: 'post',
    data: data
  })
}






