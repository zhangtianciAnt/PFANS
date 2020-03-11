import request from '../../../../utils/request'

export function getListType(data) {
  return request({
    url: 'bonussend/getListType',
    method: 'post',
    data: data,
  })
}

export function getList(data) {
  return request({
    url: 'bonussend/List',
    method: 'post',
    data: data,
  });
}

export function get() {
  return request({
    url: 'bonussend/get',
    method: 'get'
  })
}
