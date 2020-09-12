import request from '../../utils/request'
import requestDownload from '../../utils/requestDownload';

// 保存/更新 用户
export function userSave(data) {
  return request({
    url: 'user/addAccountCustomer',
    method: 'post',
    data: data
  })
}

// 根据orgid获取用户列表
export function getUserTableList(params) {
  return request({
    url: 'user/getAccountCustomer',
    method: 'get',
    params: params
  })
}

export function getUserTableList2(params) {
  return request({
    url: 'user/getAccountCustomer2',
    method: 'get',
    params: params
  })
}

//add-ws-9/12-财务人员编码处理
export function getUserTableList3(params) {
  return request({
    url: 'user/getAccountCustomer3',
    method: 'get',
    params: params
  })
}
//add-ws-9/12-财务人员编码处理

// 根据userid获取该用户的详细信息
export function getById(params) {
  return request({
    url: 'user/getAccountCustomerById',
    method: 'get',
    params: params
  })
}

export function getme() {
  return request({
    url: 'user/getme',
    method: 'get'
  })
}

// 手机号重复验证
export function mobileCheck(params) {
  return request({
    url: 'user/mobileCheck',
    method: 'get',
    params: params
  })
}

// 用户禁用/启用
export function disableUser(params) {
  return request({
    url: 'user/updUserStatus',
    method: 'get',
    params: params
  })
}

// 获取角色列表
export function getRoleList(data) {
  return request({
    url: 'role/getRoleList',
    method: 'post',
    data: data
  })
}

// 给用户赋角色
export function setRoleToUser(data) {
  return request({
    url: 'user/setRoleToUser',
    method: 'post',
    data: data
  })
}

//下载模板
export function download(data) {
  return requestDownload({
    url: 'user/download',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}
export function getSigninlog() {
  return request({
    url: 'user/getSigninlog',
    method: 'get',
  });
}
