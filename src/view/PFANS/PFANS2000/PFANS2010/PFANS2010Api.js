import request from '../../../../utils/request'

//获取列表数据
export function getlist(data) {
  return request({
    url: 'attendance/getlist',
    method: 'post',
    data: data
  })
}
//view添加分页 ztc 1130 fr
export function getlistFilter(data) {
  return request({
    url: 'attendance/getlistFilter',
    method: 'post',
    data: data
  })
}
//view添加分页 ztc 1130 to

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

//获取离职考勤对比
export function getAttendancelistCompared(data) {
  return request({
    url: 'attendance/getAttendancelistCompared',
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
//add ccm 0716 离职一键驳回
export function disclickUpdateStates(data) {
  return request({
    url: 'attendance/disclickUpdateStates',
    method: 'post',
    data: data
  })
}
//add ccm 0716 离职一键驳回

//add ccm 2020729 考勤异常加班审批中的日期，考勤不允许承认
export function selectAbnomalandOvertime(data) {
  return request({
    url: 'attendance/selectAbnomalandOvertime',
    method: 'post',
    data: data
  })
}
//add ccm 2020729 考勤异常加班审批中的日期，考勤不允许承认

//add ccm 0804 查询欠勤是否已经全部申请
export function selectAbnomaling(data) {
  return request({
    url: 'attendance/selectAbnomaling',
    method: 'post',
    data: data
  })
}
//add ccm 0804 查询欠勤是否已经全部申请

//add ccm 0812 考情管理查看当天的异常申请数据
export function getabnormalByuseridandDate(data) {
  return request({
    url: 'attendance/getabnormalByuseridandDate',
    method: 'post',
    data: data
  })
}
//add ccm 0812 考情管理查看当天的异常申请数据
