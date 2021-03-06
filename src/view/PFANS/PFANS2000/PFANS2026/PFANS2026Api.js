import request from '../../../../utils/request'

//获取流程列表
export function get() {
  return request({
    url: 'staffexitprocedure/get',
    method: 'get'
  })
}
//根据id获取
export function selectById(data) {
  return request({
    url: 'staffexitprocedure/selectById',
    method: 'get',
    params: data
  })
}
//更新update
export function update(data) {
  return request({
    url: 'staffexitprocedure/update',
    method: 'post',
    data: data
  })
}
//新建insert
export function insert(data) {
  return request({
    url: 'staffexitprocedure/insert',
    method: 'post',
    data: data
  })
}
