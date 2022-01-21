import request from "../../../../utils/request"

export function getInformation() {
  return request({
    url: 'informationdelivery/get',
    method: 'get'
  })
}

export function getListType() {
  return request({
    url: 'informationdelivery/getListType',
    method: 'get'
  })
}


export function insertInformation(data) {
  return request({
    url: 'informationdelivery/insert',
    method: 'post',
    data: data
  })
}

export function updateInformation(data) {
  return request({
    url: 'informationdelivery/update',
    method: 'post',
    data: data
  })


}

export function getOneInformation(data) {
  return request({
    url: 'informationdelivery/getone',
    method: 'get',
    params: {
      information:data
    }
  })
}
//region scc add 主页获取博客有效数据 from
export function getListByManager() {
  return request({
    url: 'informationdelivery/getListByManager',
    method: 'get'
  })
}
//endregion scc add 主页获取博客有效数据 to

//region scc add 获取博客一览 from
export function getByManager() {
  return request({
    url: 'informationdelivery/getByManager',
    method: 'get'
  })
}
//endregion scc add 获取博客一览 to

