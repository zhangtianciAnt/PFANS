import request from "../../../../utils/request"


export function createPfans1043(data) {
  return request({
    url: 'themeinfor/insertInfo',
    method: 'post',
    data: data
  })
}
//add-ws-01/06-禅道任务710
export function themenametype(data) {
  return request({
    url: 'themeplan/themenametype',
    method: 'get',
    params: data,
  })
}
//add-ws-01/06-禅道任务710
//  add  ml  211203  dialog分页  from
export function getDiaLogPage(data) {
  return request({
    url: 'themeplan/getDiaLogPage',
    method: 'get',
    params: data,
  })
}
//  add  ml  211203  dialog分页  to
//  add  ml  211203  受托theme dialog分页  from
export function getlistthemePage(data) {
  return request({
    url: 'themeinfor/getlistthemePage',
    method: 'get',
    params: data,
  })
}
//  add  ml  211203  受托theme dialog分页  to
export function getthemename(data) {
  return request({
    url: 'themeplan/getthemename',
    method: 'get',
    params: data,
  })
}


export function updatePfans1043(data) {
  return request({
    url: 'themeinfor/updateInfo',
    method: 'post',
    data: data
  })
}


export function getFpans1043List(data) {
  return request({
    url: 'themeinfor/list',
    method: 'get',
    params: data,
  })
}

export function getlisttheme(data) {
  return request({
    url: 'themeinfor/getlisttheme',
    method: 'get',
    params: data,
  })
}

export function getPfans1043One(data) {
  return request({
    url: 'themeinfor/oneInfo',
    method: 'post',
    data: data
  })
}
