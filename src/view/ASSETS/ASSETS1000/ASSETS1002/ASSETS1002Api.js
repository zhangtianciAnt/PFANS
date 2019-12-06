import request from '../../../../utils/request';

export function getInventoryplan() {
  return request({
    url: 'inventoryplan/get',
    method: 'get'
  })
}

export function selectAll(data) {
  return request({
    url: 'inventoryplan/selectAll',
    method: 'get',
    params: data,
  });
}

export function update(data) {
  return request({
    url: 'inventoryplan/update',
    method: 'post',
    data: data,
  });
}

export function insert(data) {
  return request({
    url: 'inventoryplan/insert',
    method: 'post',
    data: data,
  });
}
