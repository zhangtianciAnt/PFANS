import request from '../../../../utils/request';

export function getCommunication() {
  return request({
    url: 'communication/get',
    method: 'get',
  });
}

export function getCommunicationOne(data) {
  return request({
    url: 'communication/one',
    method: 'post',
    data: data,
  });
}

export function updateCommunication(data) {
  return request({
    url: 'communication/update',
    method: 'post',
    data: data,
  });
}

export function createCommunication(data) {
  return request({
    url: 'communication/create',
    method: 'post',
    data: data,
  });
}

//region scc add 交际费事前决裁删除 from
export function comdelete(data) {
  return request({
    url: 'communication/comdelete',
    method: 'post',
    data: data,
  });
}

//endregion scc add 交际费事前决裁删除 to
