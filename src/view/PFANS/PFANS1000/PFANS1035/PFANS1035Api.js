import request from '../../../../utils/request';

export function getBusiness(data) {
  return request({
    url: 'business/get',
    method: 'get',
    data: data,
  });
}

export function selectById(data) {
  return request({
    url: 'business/selectById',
    method: 'get',
    params: data,
  });
}

export function updateBusiness(data) {
  return request({
    url: 'business/update',
    method: 'post',
    data: data,
  });
}

export function createBusiness(data) {
  return request({
    url: 'business/create',
    method: 'post',
    data: data,
  });
}

//add-ws-7/7-禅道153
export function selectById2(data) {
  return request({
    url: 'business/selectById2',
    method: 'get',
    params: data,
  });
}

export function selectById3(data) {
  return request({
    url: 'business/selectById3',
    method: 'get',
    params: data,
  });
}

export function selectById4(data) {
  return request({
    url: 'business/selectById4',
    method: 'get',
    params: data,
  });
}

//add-ws-7/7-禅道153



