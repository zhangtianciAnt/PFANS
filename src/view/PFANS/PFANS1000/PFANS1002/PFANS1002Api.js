import request from '../../../../utils/request'

export function getBusiness(data) {
  return request({
    url: 'business/get',
    method: 'get',
    params: data
  })
}

export function selectById(data) {
  return request({
    url: 'business/selectById',
    method: 'get',
    params: data
  })
}

export function updateBusiness(data) {
  return request({
    url: 'business/update',
    method: 'post',
    data: data
  })
}

export function createBusiness(data) {
  return request({
    url: 'business/create',
    method: 'post',
    data: data
  })
}
//add-ws-7/10-禅道247
export function list(data) {
  return request({
    url: 'business/list',
    method: 'post',
    data: data
  })
}
//add-ws-7/10-禅道247

//region scc add 境内外出差决裁删除 from
export function busdelete(data) {
  return request({
    url: 'business/busdelete',
    method: 'post',
    data: data,
  });
}
//endregion scc add 境内外出差决裁删除 to




