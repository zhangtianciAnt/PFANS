import request from '../../../../utils/request'

//获取列表数据
export function getAttendancelist(data) {
  return request({
    url: 'attendance/getAttendancelist',
    method: 'post',
    data: data
  })
}
