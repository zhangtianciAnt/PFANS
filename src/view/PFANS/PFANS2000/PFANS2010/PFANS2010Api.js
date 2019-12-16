import request from '../../../../utils/request'

//获取列表数据
export function getlist(data) {
  return request({
    url: 'attendance/getlist',
    method: 'post',
    data: data
  })
}

//获取详细数据
export function getAttendancelist(data) {
  return request({
    url: 'attendance/getAttendancelist',
    method: 'post',
    data: data
  })
}
