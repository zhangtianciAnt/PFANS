import request from '../../../../utils/request'
import requestnew from '../../../../utils/requestnew'
import requestDownload from "../../../../utils/requestDownload";


//创建流程
export function createNewUser(data) {
  return requestnew({
    url: 'logmanagement/createNewUser',
    method: 'post',
    data: data
  })
}
//add-ws-外协人员表查询
export function getAttendancepdlist(data) {
  return requestnew({
    url: 'punchcardrecordbp/getAttendancelist',
    method: 'post',
    data: data
  })
}
//add-ws-外协人员表查询
export function getListcheck(data) {
  return requestnew({
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
    return requestnew({
      url: 'logmanagement/getDataList',
      method: 'post',
      data: data
    })
  }
export function getLogDataList(data) {
  return requestnew({
    url: 'logmanagement/getLogDataList',
    method: 'get',
    params: data,
  })
}

export function getDataList1(data) {
  return requestnew({
    url: 'logmanagement/getDataList1',
    method: 'post',
    data: data
  })
}
// add-ws-5/26-No.68
export function getDataList2(data) {
  return requestnew({
    url: 'logmanagement/getDataList2',
    method: 'post',
    data: data
  })
}
// add-ws-5/26-No.68

export function getCheckList(data) {
  return requestnew({
    url: 'logmanagement/getCheckList',
    method: 'post',
    data: data
  })
}
export function CheckList(data) {
  return requestnew({
    url: 'logmanagement/CheckList',
    method: 'post',
    data: data
  })
}
  export function gettlist(data) {
    return requestnew({
      url: 'logmanagement/gettlist',
      method: 'post',
      data: data
    })
  }
export function getCompanyProjectList(data) {
  return requestnew({
    url: 'logmanagement/getCompanyProjectList',
    method: 'POST',
    data: data
  })
}
export function getProjectList(data) {
  return requestnew({
    url: 'logmanagement/getProjectList',
    method: 'POST',
    data: data
  })
}
export function getDataOne(data) {
  return requestnew({
    url: 'logmanagement/one',
    method: 'post',
    data: data
  })
}
export function updateNewUser(data) {
  return requestnew({
    url: 'logmanagement/update',
    method: 'post',
    data: data
  })
}
export function createProject(data) {
  return requestnew({
    url: 'logmanagement/createProject',
    method: 'post',
    data: data
  })
}

export function deletePersonal(data) {
  return requestnew({
    url: 'logmanagement/delete',
    method: 'post',
    data: data,
  });
}

export function deleteLog(data) {
  return requestnew({
    url: 'logmanagement/deleteLog',
    method: 'post',
    data: data,
  });
}
//add-ws-01/05-优化接口
export function sumlogdate(data) {
  return requestnew({
    url: 'logmanagement/sumlogdate',
    method: 'post',
    data: data
  })
}
//add-ws-01/05-优化接口
