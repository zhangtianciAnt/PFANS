import request from '../../utils/request'

//获取角色列表
export function getRoleList(data) {
  return request({
    url: 'role/getRoleList',
    method: 'post',
    data: data
  })
}

//创建/更新角色信息
export function saveRole(data) {
  return request({
    url: 'role/saveRole',
    method: 'post',
    data: data
  })
}

//删除角色信息
export function delRoleInfo(data) {
  return request({
    url: 'role/delRoleInfo',
    method: 'post',
    data: data
  })
}

//获取所有菜单信息
export function selectAllApplications() {
  return request({
    url: 'role/selectAllApplications',
    method: 'get'
  })
}

//获取角色详细信息
export function getRoleInfo(data) {
  return request({
    url: 'role/getRoleInfo',
    method: 'get',
    params: {
      roleid: data
    }
  })
}

//获取角色成员信息
export function getMembers(data) {
  return request({
    url: 'role/getMembers',
    method: 'get',
    params: {
      roleid: data
    }
  })
}