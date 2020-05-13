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

//更新数据
export function update(data) {
  return request({
    url: 'attendance/update',
    method: 'post',
    data: data
  })
}

//add_fjl_05/13   --添加审批正常结束后，自动变成承认状态
//更新状态
export function updStatus(data) {
  return request({
    url: 'attendance/updStatus',
    method: 'post',
    data: data
  })
}

//add_fjl_05/13   --添加审批正常结束后，自动变成承认状态
