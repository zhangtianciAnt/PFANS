import request from '../../../../utils/request'

export function getListType() {
  return request({
    url: 'bonussend/getListType',
    method: 'get'
  })
}

export function getList(data) {
  return request({
    url: 'bonussend/List',
    method: 'post',
    data: data,
  });
}

