import request from '../../../../utils/request';

//创建申请insertBase
export function creategiving(data) {
  return request({
    url: 'giving/creategiving',
    method: 'get',
    params: data,
  });
}

export function getDataList() {
  return request({
    url: 'giving/getDataList',
    method: 'get',
  });
}
//更新update
export function save(data) {
  return request({
    url: 'giving/save',
    method: 'post',
    data: data
  })
}


export function getCasgiftApply() {
  return request({
    url: 'casgiftapply/get',
    method: 'get',
  });

}

export function deleteothertwo(data) {
  return request({
    url: 'giving/deleteothertwo',
    method: 'post',
    data: data,
  });
}

export function deleteadditional(data) {
  return request({
    url: 'giving/deleteadditional',
    method: 'post',
    data: data,
  });
}

export function deleteFive(data) {
  return request({
    url: 'giving/deleteFive',
    method: 'post',
    data: data,
  });
}

export function deleteteappreciation(data) {
  return request({
    url: 'giving/deleteteappreciation',
    method: 'post',
    data: data,
  });
}



export function givinglist(data) {
  return request({
    url: 'giving/givinglist',
    method: 'get',
    params: data,
  });
}



export function deleteotherfour(data) {
  return request({
    url: 'giving/deleteotherfour',
    method: 'post',
    data: data,
  });
}

// 本月加班数据变更时，重新计算加班费合计
export function thisMonthOvertimeChange(data) {
  return request({
    url: 'giving/thisMonthOvertimeChange',
    method: 'post',
    data: data,
  });
}

// 本月欠勤数据变更时，重新计算欠勤费合计
export function thisMonthLacktimeChange(data) {
  return request({
    url: 'giving/thisMonthLacktimeChange',
    method: 'post',
    data: data,
  });
}

//zqu start insert update wages
export function insertWages(data) {
  return request({
    url: 'wages/insertWages',
    method: 'post',
    data: data,
  })
}
//zqu end

//gbb start insert update wagesdepartment
export function getWagesdepartment(data) {
  return request({
    url: 'wages/getWagesdepartment',
    method: 'get',
    params: data
  });
}
//gbb end

//gbb start insert update wagescompany
export function getWagecompany() {
  return request({
    url: 'wages/getWagecompany',
    method: 'get',
  });
}
//gbb end

//gbb 0721 工资发放按钮 start
export function updatestate(data) {
  return request({
    url: 'giving/updatestate',
    method: 'get',
    params: data,
  });
}
//gbb 0721 工资发放按钮 end

//gbb 0720 离职工资对比 start
export function getWagesByResign(data) {
  return request({
    url: 'wages/getWagesByResign',
    method: 'get',
    params: data,
  });
}
//gbb 0720 离职工资对比 end
