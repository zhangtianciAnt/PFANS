import request from '../../../../utils/request'
import requestDownload from "../../../../utils/requestDownload";

//创建流程
export function createPfans2024(data) {
  return request({
    url: 'talentplan/createNewUser',
    method: 'post',
    data: data
  })
}
export function getDataOne(data) {
  return request({
    url: 'talentplan/one',
    method: 'post',
    data: data
  })
}

//更新流程
export function updatePfans2024(data) {
  return request({
    url: 'talentplan/updateInfo',
    method: 'post',
    data: data
  })
}

//获取流程列表
export function getFpans2024List(data) {
  return request({
    url: 'talentplan/list',
    method: 'post',
    data: data
  })
}
//add-ws-6/4-禅道031-人才育成修改
export function getDataList(data) {
  return request({
    url: 'talentplan/getDataList',
    method: 'post',
    data: data
  })
}
//add-ws-6/4-禅道031-人才育成修改
export function create(data) {
  return request({
    url: 'talentplan/create',
    method: 'post',
    data: data
  })
}

export function download(data) {
  return requestDownload({
    url: 'talentplan/download',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}
