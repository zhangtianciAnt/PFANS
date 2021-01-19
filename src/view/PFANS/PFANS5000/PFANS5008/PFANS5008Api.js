import request from '../../../../utils/request'
import requestDownload from "../../../../utils/requestDownload";


//创建流程
export function createNewUser(data) {
  return request({
    url: 'logmanagement/createNewUser',
    method: 'post',
    data: data
  })
}
//add-ws-外协人员表查询
export function getAttendancepdlist(data) {
  return request({
    url: 'punchcardrecordbp/getAttendancelist',
    method: 'post',
    data: data
  })
}
//add-ws-外协人员表查询
export function getListcheck(data) {
  return request({
    url: 'logmanagement/getListcheck',
    method: 'post',
    data: data
  })
}

export function downloadList(data) {
  return requestDownload({
    url: 'logmanagement/download',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}

  export function getDataList(data) {
    return request({
      url: 'logmanagement/getDataList',
      method: 'post',
      data: data
    })
  }
export function getLogDataList(data) {
  return request({
    url: 'logmanagement/getLogDataList',
    method: 'get',
    params: data,
  })
}

export function getDataList1(data) {
  return request({
    url: 'logmanagement/getDataList1',
    method: 'post',
    data: data
  })
}
// add-ws-5/26-No.68
export function getDataList2(data) {
  return request({
    url: 'logmanagement/getDataList2',
    method: 'post',
    data: data
  })
}
// add-ws-5/26-No.68

export function getCheckList(data) {
  return request({
    url: 'logmanagement/getCheckList',
    method: 'post',
    data: data
  })
}
export function CheckList(data) {
  return request({
    url: 'logmanagement/CheckList',
    method: 'post',
    data: data
  })
}
  export function gettlist(data) {
    return request({
      url: 'logmanagement/gettlist',
      method: 'post',
      data: data
    })
  }
export function getCompanyProjectList(data) {
  return request({
    url: 'logmanagement/getCompanyProjectList',
    method: 'POST',
    data: data
  })
}
export function getProjectList(data) {
  return request({
    url: 'logmanagement/getProjectList',
    method: 'POST',
    data: data
  })
}
export function getDataOne(data) {
  return request({
    url: 'logmanagement/one',
    method: 'post',
    data: data
  })
}
export function updateNewUser(data) {
  return request({
    url: 'logmanagement/update',
    method: 'post',
    data: data
  })
}
export function createProject(data) {
  return request({
    url: 'logmanagement/createProject',
    method: 'post',
    data: data
  })
}

export function deletePersonal(data) {
  return request({
    url: 'logmanagement/delete',
    method: 'post',
    data: data,
  });
}

export function deleteLog(data) {
  return request({
    url: 'logmanagement/deleteLog',
    method: 'post',
    data: data,
  });
}
