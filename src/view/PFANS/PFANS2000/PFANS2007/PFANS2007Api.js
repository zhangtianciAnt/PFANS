import request from '../../../../utils/request'

export function inserttodo(data) {
  return request({
    url: 'bonussend/inserttodo',
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

export function update(data) {
  return request({
    url: 'bonussend/update',
    method: 'post',
    data: data
  })
}
