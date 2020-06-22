import request from '../../../../utils/request'

//获取列表数据
export function getlist(data) {
  return request({
    url: 'attendance/getlist',
    method: 'post',
    data: data
  })
}

//获取详细数据 -- 日志使用
export function getAttendancelist(data) {
  return request({
    url: 'attendance/getAttendancelist',
    method: 'post',
    data: data
  })
}

//获取详细数据 -- 考勤使用
export function getAttendancelist1(data) {
  return request({
    url: 'attendance/getAttendancelist1',
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

// add 0622 ccm --审批被驳回后，当月考勤数据全部变为未承认状态
//更新承认状态为未承认
export function updStatus1(data) {
  return request({
    url: 'attendance/updStatus1',
    method: 'post',
    data: data
  })
}
// add 0622 ccm --审批被驳回后，当月考勤数据全部变为未承认状态
