import request from '../../utils/request'

//获取当前登陆人有权限查看的应用
export function getAppData() {
  return request({
    url: '/role/getAppData',
    method: 'get'
  })
}
//获取某个应用下的菜单
export function getAppMenu(data) {
  return request({
    url: '/role/getAppMenu',
    method: 'post',
    data: data
  })
}
//获取消息列表
export function getmessage (data) {
  return request({
    url: '/ToDoNotice/getmessage',
    method: 'post',
    data: data
  })
}

//更新已阅
export function updatenoticesstatus (data) {
  return request({
    url: '/ToDoNotice/updatenoticesstatus',
    method: 'post',
    data: data
  })
}

//    ADD_FJL_05/25  -- 删除无用代办
export function delToDoNotice(data) {
  return request({
    url: '/ToDoNotice/delToDoNotice',
    method: 'get',
    params: data
  })
}

//    ADD_FJL_05/25  -- 删除无用代办


