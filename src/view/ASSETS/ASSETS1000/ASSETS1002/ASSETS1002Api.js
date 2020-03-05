import request from '../../../../utils/request';

export function getInventoryplan() {
  return request({
    url: 'inventoryplan/get',
    method: 'get',
  });
}

export function selectAll(data) {
  return request({
    url: 'assets/list',
    method: 'post',
    data: data,
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

export function isDelInventory(data) {
  return request({
    url: 'inventoryplan/delete',
    method: 'post',
    data: data,
  });
}


export function selectById(data) {
  return request({
    url: 'inventoryplan/selectById',
    method: 'get',
    params: data,
  });
}

export function selectByResult(data) {
  return request({
    url: 'inventoryplan/selectByResult',
    method: 'get',
    params: data,
  });
}

export function check(data) {
  return request({
    url: 'inventoryplan/check',
    method: 'post',
    data: data,
  });
}
