import request from '../../utils/request'

//获取角色列表
export function exportExcel(data) {
  return request({
    url: 'SignIn/export',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
