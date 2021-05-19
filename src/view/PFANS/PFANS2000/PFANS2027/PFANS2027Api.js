import request from '../../../../utils/request'

//获取流程列表
export function getLunarbonus(data) {
  return request({
    url: 'lunarbonus/getList',
    method: 'get',
    params: data,
  });
}
//编辑
export function getLunardetails(data){
  return request({
    url: 'lunarbonus/getLunardetail',
    method: 'post',
    data: data,
  });
}
//更新update
export function update(data) {
  return request({
    url: 'lunarbonus/update',
    method: 'post',
    data: data
  })
}
// 发起待办
export function createTodonotice(data) {
  return request({
    url: 'lunarbonus/createTodonotice',
    method: 'POST',
    data: data
  })
}

export function overTodonotice(data) {
  return request({
    url: 'lunarbonus/overTodonotice',
    method: 'post',
    data: data
  })
}
//新建insert
export function insertLunarbonus(data) {
  return request({
    url: 'lunarbonus/create',
    method: 'post',
    data: data
  })
}
//获取详情列表初始数据
export function getOne(data) {
  return request({
    url: 'lunarbonus/getOne',
    method: 'get',
    params: data,
  });
}

