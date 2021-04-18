import request from '../../../../utils/request'
import requestDownload from '../../../../utils/requestDownload';
import requestPdf from '../../../../utils/requestPdf';

//获取流程列表
export function get(data) {
  return request({
    url: 'staffexitprocedure/get',
    method: 'get',
    params: data
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
//离职申请数据转结
export function change(data) {
  return request({
    url: 'staffexitprocedure/change',
    method: 'post',
    data: data
  })
}
//退职者调书&离职手续数据转结
export function change2(data) {
  return request({
    url: 'staffexitprocedure/change2',
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

export function update2(data) {
  return request({
    url: 'staffexitprocedure/update2',
    method: 'post',
    data: data
  })
}
export function insert2(data) {
  return request({
    url: 'staffexitprocedure/insert2',
    method: 'post',
    data: data
  })
}

//add-ws-6/16-禅道106
export function deletesta(data) {
  return request({
    url: 'staffexitprocedure/deletesta',
    method: 'post',
    data: data,
  });
}
//add-ws-6/16-禅道106

export function generatesta(data) {
  return requestPdf({
    url: 'staffexitprocedure/generatesta',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

export function selectById2(data) {
  return request({
    url: 'staffexitprocedure/selectById2',
    method: 'get',
    params: data
  })
}

export function get3(data) {
  return request({
    url: 'staffexitprocedure/get3',
    method: 'get',
    params: data
  })
}

export function get2(data) {
  return request({
    url: 'staffexitprocedure/get2',
    method: 'get',
    params: data
  })
}

export function getList(data) {
  return request({
    url: 'staffexitprocedure/getList',
    method: 'post',
    data: data
  })
}

export function getList2(data) {
  return request({
    url: 'staffexitprocedure/getList2',
    method: 'post',
    data: data
  })
}
