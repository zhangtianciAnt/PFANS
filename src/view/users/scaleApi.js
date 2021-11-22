import request from "../../utils/request";


export function getList(data) {
  return request({
    url: 'personScale/getList',
    method: 'post',
    data: data
  })
}

export function getPeopleInfo(data) {
  return request({
    url: 'personScale/getPeopleInfo',
    method: 'get',
    params: data
  })
}
