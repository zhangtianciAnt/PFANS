import request from '../../../../utils/request'


//创建流程
export function createNewUser(data) {
  return request({
    url: 'workingday/createNewUser',
    method: 'post',
    data: data
  })
}
export function deleteUser(data) {
  return request({
    url: 'workingday/delete',
    method: 'post',
    data: data
  })
}
export function getList(data) {
  return request({
    url: 'workingday/getList',
    method: 'post',
    data: data
  })
}

