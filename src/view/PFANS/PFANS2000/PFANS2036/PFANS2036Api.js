import request from '../../../../utils/request'

export function getYears(data) {
  return request({
    url: 'personalcost/getYears',
    method: 'get',
    data: data
  })
}

export function insertPenalcost(data) {
  return request({
    url: 'personalcost/insertPenalcost',
    method: 'get',
    data: data
  })
}

export function getPersonalCost(data) {
  return request({
    url: 'personalcost/getPersonalCost',
    method: 'get',
    params: data
  })
}

export function upPersonalCost(data) {
  return request({
    url: 'personalcost/upPersonalCost',
    method: 'post',
    data: data
  })
}
