import request from '../../../../utils/request';


export function getPltab(data) {
  return request({
    url: 'Pltab/getPltab',
    method: 'get',
    params: data,
  });
}

export function getCostList(data) {
  return request({
    url: 'Pltab/getCostList',
    method: 'get',
    params: data,
  });
}

export function getCostLast(data) {
  return request({
    url: 'Pltab/getCostLast',
    method: 'get',
    params: data,
  });
}

export function insert(data) {
  return request({
    url: 'Pltab/insert',
    method: 'post',
    data: data,
  });
}

export function list() {
  return request({
    url: 'Pltab/list',
    method: 'get',
  });
}
