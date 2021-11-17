import request from '../../../../utils/request'

//region scc add 11/11 请负一览页面数据获取 from
export function getList(data) {
  return request({
    url: 'ES/getList',
    method: 'post',
    data: data
  })
}
//endregion scc add 11/11 请负一览页面数据获取 to

//region scc add 11/11 更新处理状态 from
export function updList(data) {
  return request({
    url: 'ES/updList',
    method: 'post',
    data: data
  })
}
//endregion scc add 11/11 更新处理状态 to
