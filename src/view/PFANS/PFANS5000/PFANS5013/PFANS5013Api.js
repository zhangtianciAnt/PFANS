import request from '../../../../utils/request'

//创建流程
export function insert(data) {
  return request({
    url: 'comprojects/insert',
    method: 'post',
    data: data
  })
}
export function selectById(data) {
  return request({
    url: 'comprojects/selectById',
    method: 'get',
    params: data
  })
}
export function select(data) {
  return request({
    url: 'comprojects/select',
    method: 'get',
    params: data
  })
}

//更新流程
export function update(data) {
  return request({
    url: 'comprojects/update',
    method: 'post',
    data: data
  })
}

//获取流程列表
export function getFpans5013List(data) {
  return request({
    url: 'comprojects/list',
    method: 'post',
    data: data
  })
}

export function getcustomer(data) {
  return request({
    url: 'comprojects/getcustomer',
    method: 'post',
    data: data
  })
}

export function getexpat(data) {
  return request({
    url: 'comprojects/getexpat',
    method: 'post',
    data: data
  })
}

export function getPjList(data) {
  return request({
    url: 'comprojects/getPjList',
    method: 'get',
    params: data
  })
}
export function getList2(data) {
  return request({
    url: 'comprojects/getList2',
    method: 'get',
    params: data
  })
}
export function getProjectList(data) {
  return request({
    url: 'comprojects/getProjectList',
    method: 'get',
    params: data
  })
}

export function getTimestart(data) {
  return request({
    url: 'comprojects/getTimestart',
    method: 'get',
    params: data
  })
}

export function getGroupTimestart(data) {
  return request({
    url: 'comprojects/getGroupTimestart',
    method: 'post',
    data: data
  })
}

export function updateTimestart(data) {
  return request({
    url: 'comprojects/updateTimestart',
    method: 'post',
    data: data
  })
}
//add-ws-阚总日志问题修正
export function getMyConProject2(data) {
  return request({
    url: 'comprojects/getMyConProject2',
    method: 'get',
    params: data
  })
}
//add-ws-阚总日志问题修正
export function getMyConProject(data) {
  return request({
    url: 'comprojects/getMyConProject',
    method: 'get',
    params: data
  })
}

