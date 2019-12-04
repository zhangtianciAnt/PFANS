import request from '../../../../utils/request';

//创建申请insertBase
export function creategiving(data) {
  return request({
    url: 'giving/creategiving',
    method: 'get',
    params: data,
  });
}

export function getDataList() {
  return request({
    url: 'giving/getDataList',
    method: 'get',
  });
}
//更新update
export function save(data) {
  return request({
    url: 'giving/save',
    method: 'post',
    data: data
  })
}


export function getCasgiftApply() {
  return request({
    url: 'casgiftapply/get',
    method: 'get',
  });

}

export function deleteothertwo(data) {
  return request({
    url: 'giving/deleteothertwo',
    method: 'post',
    data: data,
  });
}

export function deleteadditional(data) {
  return request({
    url: 'giving/deleteadditional',
    method: 'post',
    data: data,
  });
}

export function deleteFive(data) {
  return request({
    url: 'giving/deleteFive',
    method: 'post',
    data: data,
  });
}

export function deleteteappreciation(data) {
  return request({
    url: 'giving/deleteteappreciation',
    method: 'post',
    data: data,
  });
}



export function givinglist(data) {
  return request({
    url: 'giving/givinglist',
    method: 'get',
    params: data,
  });
}



export function deleteotherfour(data) {
  return request({
    url: 'giving/deleteotherfour',
    method: 'post',
    data: data,
  });
}
