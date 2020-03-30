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
