import request from '../../../../utils/request';

export function update(data) {
  return request({
    url: 'monthlyrate/update',
    method: 'post',
    data: data,
  });
}

export function create(data) {
  return request({
    url: 'monthlyrate/create',
    method: 'post',
    data: data,
  });
}

export function slectlist(data) {
  return request({
    url: 'monthlyrate/slectlist',
    method: 'post',
    data: data,
  });
}

export function slectlist2() {
  return request({
    url: 'monthlyrate/slectlist2',
    method: 'get',
  });
}

export function list() {
  return request({
    url: 'monthlyrate/list',
    method: 'get',
  });
}

