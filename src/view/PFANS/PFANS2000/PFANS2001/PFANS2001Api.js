import request from '../../../../utils/request';

export function getRecruit() {
  return request({
    url: 'recruit/get',
    method: 'get',
  });
}

export function getRecruitOne(data) {
  return request({
    url: 'recruit/one',
    method: 'post',
    data: data,
  });
}

export function updateRecruit(data) {
  return request({
    url: 'recruit/update',
    method: 'post',
    data: data,
  });
}

export function createRecruit(data) {
  return request({
    url: 'recruit/create',
    method: 'post',
    data: data,
  });
}

//add-ws-8/4-禅道任务296
export function getRecruit2() {
  return request({
    url: 'recruit/get2',
    method: 'get',
  });
}

//add-ws-8/4-禅道任务296
