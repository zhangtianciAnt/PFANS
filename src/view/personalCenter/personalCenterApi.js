import request from '../../utils/request'
//修改密码
export function Password(data) {
  return request({
    url: 'PersonalCenter/changePassword',
    method: 'post',
    data: data
  })
}
//修改个人信息
export function savePersonal(data) {
   return request({
     url: 'PersonalCenter/save',
     method: 'post',
     data: data
   })
}
//获取个人信息
export function getPersonalCenter() {
  return request({
    url: 'PersonalCenter/get',
    method: 'get'
  })
}

//获取个人信息
export function getPersonalCenterinfo() {
  return request({
    url: 'PersonalCenter/getuserinfo',
    method: 'get',
    params: data
  })
}
