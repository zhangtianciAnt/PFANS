import request from '../../utils/request'
export function get() {
  return request({
    url: 'ToDoNotice/get',
    method: 'get'
  })
}
export function getStatus(data) {
  return request({
    url: 'ToDoNotice/getList',
    method: 'get',
    params: data,
  });
}
