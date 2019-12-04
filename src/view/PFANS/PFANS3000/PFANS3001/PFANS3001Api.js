import request from '../../../../utils/request';

export function createPfans3001(data) {
  return request({
    url: 'tickets/insertInfo',
    method: 'post',
    data: data,
  });
}

export function updatePfans3001(data) {
  return request({
    url: 'tickets/updateInfo',
    method: 'post',
    data: data,
  });
}

export function getFpans3001List() {
  return request({
    url: 'tickets/list',
    method: 'post',
  });
}

export function getPfans3001One(data) {
  return request({
    url: 'tickets/oneInfo',
    method: 'post',
    data: data,
  });
}
