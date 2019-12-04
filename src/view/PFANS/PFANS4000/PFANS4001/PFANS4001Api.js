import request from "../../../../utils/request"


export function createPfans4001(data) {
  return request({
    url: 'seal/insertInfo',
    method: 'post',
    data: data
  })
}




export function updatePfans4001(data) {
  return request({
    url: 'seal/updateInfo',
    method: 'post',
    data: data
  })
}


export function getFpans4001List() {
  return request({
    url: 'seal/list',
    method: 'post'
  })
}


export function getPfans4001One(data) {
  return request({
    url: 'seal/oneInfo',
    method: 'post',
    data: data
  })
}
