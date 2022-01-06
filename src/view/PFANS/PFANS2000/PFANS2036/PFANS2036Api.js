import request from '../../../../utils/request';

export function getGroupId(data) {
  return request({
    url: 'personalcost/getGroupId',
    method: 'get',
    params: data,
  });
}

export function getChangeRanks(data) {
  return request({
    url: 'personalcost/getChangeRanks',
    method: 'get',
    params: data,
  });
}

export function getPersonalCost(data) {
  return request({
    url: 'personalcost/getPersonalCost',
    method: 'get',
    params: data,
  });
}

export function gettableBm(data) {
  return request({
    url: 'personalcost/gettableBm',
    method: 'get',
    params: data,
  });
}

export function gettableGs(data) {
  return request({
    url: 'personalcost/gettableGs',
    method: 'get',
    params: data,
  });
}

export function gettableRb(data) {
  return request({
    url: 'personalcost/gettableRb',
    method: 'get',
    params: data,
  });
}


export function getYears(data) {
  return request({
    url: 'personalcost/getYears',
    method: 'get',
    data: data,
  });
}

export function insertPenalcost(data) {
  return request({
    url: 'personalcost/insertPenalcost',
    method: 'get',
    data: data,
  });
}


export function upPersonalCost(data) {
  return request({
    url: 'personalcost/upPersonalCost',
    method: 'post',
    data: data,
  });
}

export function getFuzzyQuery(data) {
  return request({
    url: 'personalcost/getFuzzyQuery',
    method: 'get',
    params: data,
  });
}

export function exportinfo(data) {
  return request({
    url: 'personalcost/exportinfo',
    method: 'get',
    params: data,
  });
}

