import request from '../../../../utils/request'

//获取流程列表
export function getLunarbonus(data) {
  return request({
    url: 'Getlunarbonus/getList',
    method: 'get',
    params: data,
  });
}

export function getLunardetails(data){
  return request({
    url: 'Getlunarbonus/getLunardetail',
    method: 'post',
    params: data,
  });
}
//根据id获取
// export function selectById(data) {
//   return request({
//     url: 'appreciation/selectById',
//     method: 'get',
//     params: data
//   })
// }
// //更新update
// export function update(data) {
//   return request({
//     url: 'appreciation/update',
//     method: 'post',
//     data: data
//   })
// }
//新建insert
export function insertLunarbonus(data) {
  debugger
  return request({
    url: 'Getlunarbonus/create',
    method: 'post',
    data: data
  })
}
