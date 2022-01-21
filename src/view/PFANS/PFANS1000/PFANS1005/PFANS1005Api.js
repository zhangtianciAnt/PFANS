import request from '../../../../utils/request';

export function getpurchaseApply() {
  return request({
    url: 'purchaseApply/get',
    method: 'get'
  })
}

export function selectById(data) {
  return request({
    url: 'purchaseApply/selectById',
    method: 'get',
    params: data,
  });
}

export function update(data) {
  return request({
    url: 'purchaseApply/update',
    method: 'post',
    data: data,
  });
}

export function insert(data) {
  return request({
    url: 'purchaseApply/insert',
    method: 'post',
    data: data,
  });
}

//region scc add 千元以下费用决裁删除 from
export function purdelete(data) {
  return request({
    url: 'purchaseApply/purdelete',
    method: 'post',
    data: data,
  });
}
//endregion scc add 千元以下费用决裁删除 to

//region   add  ml  220112  检索  from
export function getpurchaseApplySearch(data) {
  return request({
    url: 'purchaseApply/getpurchaseApplySearch',
    method: 'post',
    data: data
  });
}
//endregion   add  ml  220112  检索  to
