import request from '../../../../utils/request';
import requestDownload from '../../../../utils/requestDownload';

export function get(data) {
  return request({
    url: 'napalm/get',
    method: 'get',
    params: data,
  });
}

//  add  ml  211130  分页  from
export function getPage(data) {
  return request({
    url: 'napalm/getPage',
    method: 'get',
    params: data,
  });
}

//  add  ml  211130  分页  to

export function one(data) {
  return request({
    url: 'napalm/one',
    method: 'post',
    data: data,
  });
}

export function update(data) {
  return request({
    url: 'napalm/update',
    method: 'post',
    data: data,
  });
}

export function downLoad(data) {
  return requestDownload({
    url: 'napalm/downLoad1',
    method: 'post',
    data: data,
    responseType: 'blob',
  });
}

