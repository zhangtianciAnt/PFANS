import request from '../../../../utils/request'

export function getJudgement(data) {
  return request({
    url: 'judgement/get',
    method: 'get',
    params: data
  })
}

export function getJudgementOne(data) {
  return request({
    url: 'judgement/one',
    method: 'post',
    data: data
  })
}

export function updateJudgement(data) {
  return request({
    url: 'judgement/update',
    method: 'post',
    data: data
  })
}

export function updateJudgementDetail(data) {
  return request({
    url: 'judgement/updateJudgementDetail',
    method: 'post',
    data: data
  })
}

export function createJudgement(data) {
  return request({
    url: 'judgement/create',
    method: 'post',
    data: data
  })
}

export function createJudgementDetail(data) {
  return request({
    url: 'judgement/createJudgementDetail',
    method: 'post',
    data: data
  })
}

//region scc add 其他业务决裁逻辑删除 from
export function juddelete(data) {
  return request({
    url: 'judgement/juddelete',
    method: 'post',
    data: data,
  });
}
//endregion scc add 其他业务决裁逻辑删除 to

//region   add  ml  220112  检索  from
export function getJudgementSearch(data) {
  return request({
    url: 'judgement/getJudgementSearch',
    method: 'post',
    data: data
  })
}
//endregion   add  ml  220112  检索  to
