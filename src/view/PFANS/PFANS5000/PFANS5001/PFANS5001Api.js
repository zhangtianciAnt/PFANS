import request from '../../../../utils/request'

//创建流程
export function insert(data) {
  return request({
    url: 'companyprojects/insert',
    method: 'post',
    data: data
  })
}
export function selectById(data) {
  return request({
    url: 'companyprojects/selectById',
    method: 'get',
    params: data
  })
}

//更新流程
export function update(data) {
  return request({
    url: 'companyprojects/update',
    method: 'post',
    data: data
  })
}

//获取流程列表
export function getFpans5001List(data) {
  return request({
    url: 'companyprojects/list',
    method: 'post',
    data: data
  })
}


