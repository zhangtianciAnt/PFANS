import request from '../../utils/request'
export function get() {
  return request({
    url: 'ToDoNotice/get',
    method: 'get'
  })
}
export function getStatus(data) {
  debugger
  return request({
    url: 'ToDoNotice/getList',
    method: 'get',
    params: data,
  });
}
