import request from '../../../../utils/request';
import requestDownload from '../../../../utils/requestDownload';

export function get(data) {
  return request({
    url: 'award/get',
    method: 'get',
    params: data,
  });
}

//  add  ml  211130  分页  from
export function getPage(data) {
  return request({
    url: 'award/getPage',
    method: 'get',
    params: data,
  });
}

//  add  ml  211130  分页  to
export function update(data) {
  return request({
    url: 'award/update',
    method: 'post',
    data: data,
  });
}

export function selectById(data) {
  return request({
    url: 'award/selectById',
    method: 'get',
    params: data,
  });
}

// 禅道任务152
export function getDataOne(data) {
  return request({
    url: 'award/selectById2',
    method: 'post',
    data: data,
  });
}

export function getDataOne2(data) {
  return request({
    url: 'award/selectList',
    method: 'post',
    data: data,
  });
}

// 禅道任务152
export function generateJxls(data) {
  return requestDownload({
    url: 'award/generateJxls',
    method: 'post',
    data: data,
    responseType: 'blob',
  });
}

//ADD-WS-7/14-禅道144任务
export function checkby(data) {
  return request({
    url: 'award/checkby',
    method: 'post',
    data: data,
  });
}

//ADD-WS-7/14-禅道144任务

//add ccm 0723  其他契约决裁书
export function getList(data) {
  return request({
    url: 'award/getList',
    method: 'post',
    data: data,
  });
}

//add ccm 0723

//  add  ml   211201  决裁书分页  from
export function getVerdict(data) {
  return request({
    url: 'award/getVerdict',
    method: 'post',
    data: data,
  });
}

//  add  ml   211201  决裁书分页  to

//数据结转
export function dataCarryover(data) {
  return request({
    url: 'award/dataCarryover',
    method: 'post',
    data: data,
  });
}

//region scc add 21/8/20 受托合同，详情，部门下拉框数据源 from
export function getcompanyen() {
  return request({
    url: 'award/getcompanyen',
    method: 'get',
  });
}

//region scc add 21/8/20 受托合同，详情，部门下拉框数据源 to

//region scc add 21/8/23 受托合同，详情，RANK下拉框数据源 from
export function getRanks() {
  return request({
    url: 'award/getRanks',
    method: 'get',
  });
}

//region scc add 21/8/23 受托合同，详情，RANK下拉框数据源 to
//region scc add 21/8/23 获取成本 from
export function getPersonalBm(data) {
  return request({
    url: 'award/getPersonalBm',
    method: 'get',
    params: data,
  });
}

//endregion scc add 21/8/23 获取成本 to

//PSDCD_PFANS_20210723_XQ_086 委托决裁报销明细自动带出 ztc fr
export function getAwardEntr(data) {
  return request({
    url: 'award/getAwardEntr',
    method: 'post',
    data: data,
  });
}

//PSDCD_PFANS_20210723_XQ_086 委托决裁报销明细自动带出 ztc to

