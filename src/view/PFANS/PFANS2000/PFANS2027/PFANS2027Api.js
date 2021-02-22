import request from '../../../../utils/request'

//获取流程列表
export function getLunarbonus(data) {
  return request({
    url: 'Getlunarbonus/getList',
    method: 'get',
    params: data,
  });
}
//编辑
export function getLunardetails(data){
  return request({
    url: 'Getlunarbonus/getLunardetail',
    method: 'post',
    data: data,
  });
}

//考课对象List
export function getExaminationobject(data) {
  return request({
    url: 'Getlunarbonus/getExaminationobject',
    method: 'get',
    params: data,
  });
}
//更新update
export function update(data) {
  return request({
    url: 'Getlunarbonus/update',
    method: 'post',
    data: data
  })
}
// 发起待办
export function createTodonotice(data) {
  return request({
    url: 'Getlunarbonus/createTodonotice',
    method: 'POST',
    data: data
  })
}

export function overTodonotice(data) {
  return request({
    url: 'Getlunarbonus/Over',
    method: 'post',
    data: data
  })
}

export function getStatus(data){
  return request({
    url: 'Getlunarbonus/getStatus',
    method: 'get',
    params: data,
  });
}
//新建insert
export function insertLunarbonus(data) {
  return request({
    url: 'Getlunarbonus/create',
    method: 'post',
    data: data
  })
}
//获取详情列表初始数据
export function getOne(data) {
  return request({
    url: 'Getlunarbonus/getOne',
    method: 'get',
    params: data,
  });
}

