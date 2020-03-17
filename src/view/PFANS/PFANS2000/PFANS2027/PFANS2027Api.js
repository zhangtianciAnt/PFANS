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
export function getExaminationobject(data){
  return request({
    url: 'Getlunarbonus/getExaminationobject',
    method: 'post',
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


export function getStatus(data){
  return request({
    url: 'Getlunarbonus/getStatus',
    method: 'post',
    params: data,
  });
}
//新建insert
export function insertLunarbonus(data) {
  debugger
  return request({
    url: 'Getlunarbonus/create',
    method: 'post',
    data: data
  })
}
