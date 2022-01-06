import request from '../../../../utils/request';
import requestDownload from '../../../../utils/requestDownload';

export function getexpatriatesinfor(data) {
  return request({
    url: 'expatriatesinfor/get',
    method: 'get',
    params: data,
  });
}

//页面增加分页 ztc 1129 fr
export function getexpatrFliter(data) {
  return request({
    url: 'expatriatesinfor/getexpatrFliter',
    method: 'get',
    params: data,
  });
}

//页面增加分页 ztc 1129 to

export function getWithoutAuth(data) {
  return request({
    url: 'expatriatesinfor/getWithoutAuth',
    method: 'get',
    params: data,
  });
}

// 项目dialog 体制 合同优化添加分页 ztc fr
export function getforSysDiaLog(data) {
  return request({
    url: 'expatriatesinfor/getforSysDiaLog',
    method: 'get',
    params: data,
  });
}

// 项目dialog 体制 合同优化添加分页 ztc to

export function getexpatriatesinforthisyear(data) {
  return request({
    url: 'expatriatesinfor/getexpatriatesinforthisyear',
    method: 'get',
    params: data,
  });
}

export function getexpatriatesinforApplyOne(data) {
  return request({
    url: 'expatriatesinfor/one',
    method: 'post',
    data: data,
  });
}

export function getGroupexpDetail(data) {
  return request({
    url: 'expatriatesinfor/getGroupexpDetail',
    method: 'post',
    data: data,
  });
}

export function getusinginformation(data) {
  return request({
    url: 'expatriatesinfor/getusinginformation',
    method: 'post',
    data: data,
  });
}

export function updateexpatriatesinforApply(data) {
  return request({
    url: 'expatriatesinfor/updateinfor',
    method: 'post',
    data: data,
  });
}

export function updateexpatriatesinfor(data) {
  return request({
    url: 'expatriatesinfor/update',
    method: 'post',
    data: data,
  });
}

export function createexpatriatesinforApply(data) {
  return request({
    url: 'expatriatesinfor/create',
    method: 'post',
    data: data,
  });
}

// export function setexpatriatesinforApply(data) {
//   return request({
//     url: 'expatriatesinfor/setexpatriatesinforApply',
//     method: 'post',
//     data: data
//   })
// }

export function download(data) {
  return requestDownload({
    url: 'expatriatesinfor/download',
    method: 'post',
    data: data,
    responseType: 'blob',
  });
}

export function getCompanyProject(data) {
  return request({
    url: 'companyprojects/getCompanyProject',
    method: 'get',
    params: data,
  });
}

export function crAccount(data) {
  return request({
    url: 'expatriatesinfor/crAccount',
    method: 'post',
    data: data,
  });
}

export function crAccount2(data) {
  return request({
    url: 'expatriatesinfor/crAccount2',
    method: 'post',
    data: data,
  });
}

