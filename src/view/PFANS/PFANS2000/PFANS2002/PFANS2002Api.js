import request from "../../../../utils/request"

export function get() {
  return request({
    url: 'recruitjudgement/get',
    method: 'get'
  })
}

export function insert(data) {
  return request({
    url: 'recruitjudgement/insert',
    method: 'post',
    data: data
  })
}

export function update(data) {
  return request({
    url: 'recruitjudgement/update',
    method: 'post',
    data: data
  })


}

export function getOne(data) {
  return request({
    url: 'recruitjudgement/getone',
    method: 'get',
    params: {
      id:data
    }
  })
}
export function getNameList(data) {
  return request({
    url: 'recruitjudgement/getNameList',
    method: 'POST',
    data:data
  })
}
