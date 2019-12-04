import request from '../../../../utils/request'

export function getHotelReservation() {
  return request({
    url: 'hotelreservation/get',
    method: 'get'
  })
}

export function getHotelReservationOne(data) {
  return request({
    url: 'hotelreservation/one',
    method: 'post',
    data: data
  })
}

export function updateHotelReservation(data) {
  return request({
    url: 'hotelreservation/update',
    method: 'post',
    data: data
  })
}

export function createHotelReservation(data) {
  return request({
    url: 'hotelreservation/create',
    method: 'post',
    data: data
  })
}






