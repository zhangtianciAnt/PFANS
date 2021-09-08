import request from '../../../../utils/request'
import requestPdf from '../../../../utils/requestPdf';

export function get(data) {
  return request({
    url: 'contractapplication/get',
    method: 'post',
    data: data
  })
}

export function getList(data) {
  return request({
    url: 'contractapplication/getList',
    method: 'post',
    data: data
  })
}

export function get2(data) {
  return request({
    url: 'contractapplication/get2',
    method: 'post',
    data: data
  })
}
//项目dialog 体制 合同优化添加分页 ztc fr
export function getforContDiaLog(data) {
  return request({
    url: 'contractapplication/getforContDiaLog',
    method: 'get',
    params: data
  })
}
//项目dialog 体制 合同优化添加分页 ztc to

export function update(data) {
  return request({
    url: 'contractapplication/update',
    method: 'post',
    data: data
  })
}

export function insert(data) {
  return request({
    url: 'contractapplication/insert',
    method: 'post',
    data: data
  })
}

export function getPe(data) {
  return request({
    url: 'contractapplication/getPe',
    method: 'get',
    params: data
  })
}

export function insertBook(data) {
  return request({
    url: 'contractapplication/insertBook',
    method: 'get',
    params: data
  })
}

export function existCheck(data) {
  return request({
    url: 'contractapplication/existCheck',
    method: 'get',
    params: data
  })
}

export function existN(data) {
  return request({
    url: 'contractapplication/existN',
    method: 'post',
    data: data
  })
}

export function existQ(data) {
  return request({
    url: 'contractapplication/existQ',
    method: 'post',
    data: data
  })
}

//add-ws-7/22-禅道341任务
export function getindividual() {
  return request({
    url: 'contractapplication/getindividual',
    method: 'post'
  })
}
export function generatesta(data) {
  return requestPdf({
    url: 'contractapplication/generatesta',
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}
//add-ws-7/22-禅道341任务

//add ccm 0725  采购合同chongfucheck
export function purchaseExistCheck(data) {
  return request({
    url: 'contractapplication/purchaseExistCheck',
    method: 'get',
    params: data
  })
}
//add ccm 0725  采购合同chongfucheck

//采购业务数据流程查看详情
export function getworkfolwPurchaseData(data) {
  return request({
    url: 'contractapplication/getworkfolwPurchaseData',
    method: 'post',
    data: data
  })
}
//采购业务数据流程查看详情

export function getNapinQinqiu(data) {
  return request({
    url: 'contractapplication/getNapinQinqiu',
    method: 'post',
    data: data
  })
}

//add ccm
export function getNaPpinAftercount(data) {
  return request({
    url: 'contractapplication/getNaPpinAftercount',
    method: 'get',
    params: data
  })
}
//add ccm

//add  ml  20210706   契约番号废弃check   from
export function getProject(data) {
  return request({
    url: 'contractapplication/getProject',
    method: 'get',
    params: data
  })
}
//add  ml  20210706   契约番号废弃check   to

export function dataCarryover(data) {
  return request({
    url: 'contractapplication/dataCarryover',
    method: 'post',
    data: data
  })
}

//获取合同时间，用于合同check scc
export function getContranumber(data) {
  return request({
    url: 'companyprojects/getcontra',
    method: 'get',
    params: data
  })
}
//获取合同时间，用于合同check scc
