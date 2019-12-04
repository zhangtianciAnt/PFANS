import request from '../../../../utils/request';

export function getpurchaseApply() {
  return request({
    url: 'purchaseApply/get',
    method: 'get'
  })
}

export function selectById(data) {
  return request({
    url: 'purchaseApply/selectById',
    method: 'get',
    params: data,
  });
}

export function update(data) {
  return request({
    url: 'purchaseApply/update',
    method: 'post',
    data: data,
  });
}

export function insert(data) {
  return request({
    url: 'purchaseApply/insert',
    method: 'post',
    data: data,
  });
}
