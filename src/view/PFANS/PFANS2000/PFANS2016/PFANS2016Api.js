import request from "../../../../utils/request"

export function createPfans2016(data) {
  return request({
    url: 'abNormal/insertInfo',
    method: 'post',
    data: data
  })
}

export function getOvertimelist(data) {
  return request({
    url: 'overtime/getOvertimelist',
    method: 'post',
    data: data
  })
}

export function updatePfans2016(data) {
  return request({
    url: 'abNormal/updateInfo',
    method: 'post',
    data: data
  })
}
export function updateNewUser(data) {
  return request({
    url: 'abNormal/update',
    method: 'post',
    data: data
  })
}
export function getFpans2016List(data) {
  return request({
    url: 'abNormal/list',
    method: 'get',
    params: data
  })
}
//add-ws-6/8-禅道035
export function getFpans2016List2(data) {
  return request({
    url: 'abNormal/list2',
    method: 'post',
    data: data
  })
}
//add-ws-6/8-禅道035
export function getPfans2016One(data) {
  return request({
    url: 'abNormal/oneInfo',
    method: 'post',
    data: data
  })
}

export function getReplacerest(data) {
  return request({
    url: 'replacerest/getReplacerest',
    method: 'post',
    data: data
  })
}

export function cklength(data) {
  return request({
    url: 'abNormal/cklength',
    method: 'post',
    data: data
  })
}


export function getSickleave(data) {
  return request({
    url: 'abNormal/getSickleave',
    method: 'get',
    params: data
  })
}

export function selectAbNormalParent(data) {
  return request({
    url: 'abNormal/selectAbNormalParent',
    method: 'get',
    params: data
  })
}

export function updateOvertime(data) {
  return request({
    url: 'abNormal/updateOvertime',
    method: 'post',
    data: data
  })
}

export function getLeaveNumber(data) {
  return request({
    url: 'abNormal/getLeaveNumber',
    method: 'post',
    data: data
  })
}

//add_fjl_05/26 --添加代休剩余
export function getRestday(data) {
  return request({
    url: 'abNormal/getRestday',
    method: 'get',
    params: data
  })
}

//add_fjl_05/26 --添加代休剩余
//add ccm 0806 查询申请人的剩余年休，
export function getremainingByuserid(data) {
  return request({
    url: 'abNormal/getremainingByuserid',
    method: 'get',
    params: data
  })
}
//add ccm 0806 查询申请人的剩余年休，
