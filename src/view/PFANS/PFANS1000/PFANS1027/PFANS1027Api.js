import request from '../../../../utils/request';
import requestDownload from '../../../../utils/requestDownload';

export function get() {
  return request({
    url: 'quotation/get',
    method: 'get',
  });
}

//  add  ml  211130  报价单分页  from
export function getQuotation() {
  return request({
    url: 'quotation/getQuotation',
    method: 'get',
  });
}

//  add  ml  211130  报价单分页  to
export function selectById(data) {
  return request({
    url: 'quotation/selectById',
    method: 'get',
    params: data,
  });
}

export function update(data) {
  return request({
    url: 'quotation/update',
    method: 'post',
    data: data,
  });
}

export function downLoad(data) {
  return requestDownload({
    url: 'quotation/downLoad',
    method: 'post',
    data: data,
    responseType: 'blob',
  });
}

