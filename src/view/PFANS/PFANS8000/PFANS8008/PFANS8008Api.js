import request from '../../../../utils/request';

export function getInformation() {
  return request({
    url: 'informationdelivery/get',
    method: 'get',
  });
}

export function getListType() {
  return request({
    url: 'informationdelivery/getListType',
    method: 'get',
  });
}


export function insertInformation(data) {
  return request({
    url: 'informationdelivery/insert',
    method: 'post',
    data: data,
  });
}

export function updateInformation(data) {
  return request({
    url: 'informationdelivery/update',
    method: 'post',
    data: data,
  });


}

export function getOneInformation(data) {
  return request({
    url: 'informationdelivery/getone',
    method: 'get',
    params: {
      information: data,
    },
  });


}
