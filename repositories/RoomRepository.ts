import { RoomFilterDTO } from '@/constants/app.interface'
import { Endpoint } from '@/constants/app.endpoint'
import { authenticatedService } from './BaseRepository'

export default class RoomRepository {
  public static getAllRooms(): Promise<any> {
    const data: Object[] = []

    for (let i = 0; i < 7; i++) {
      data.push({
        id: `${i}`,
        img: '/imgs/anh_room.jpg',
        title: 'Phòng cho thuê Võng thị, Quận Tây Hồ',
        room_type: 1,
        available: true,
        gender: 1,
        acreage: 40,
        capacity_min: 2,
        capacity_max: 3,
        address: '26 Võng thị, Phường Bưởi, Quận Tây Hồ, Hà Nội',
        verify: true,
        favorite: false,
        price: 6500000,
      })
    }

    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, data), 1000)
    })
  }

  public static getRoomsByFilter(filter: RoomFilterDTO): Promise<any> {
    return authenticatedService.get(`${Endpoint.Room}/list`)
  }

  public static favorRoom(roomId: any): Promise<any> {
    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, true), 1000)
    })
  }

  public static unfavorRoom(roomId: any): Promise<any> {
    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, false), 1000)
    })
  }

  public static getRoomDetail(roomId: any): Promise<any> {
    return authenticatedService.get(`${Endpoint.DetailRoom}/${roomId}`)
  }

  public static addComment(value: string): Promise<any> {
    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, false), 1000)
    })
  }

  public static getGuestHomepage(): Promise<any> {
    const data: Object[] = []

    for (let i = 0; i < 4; i++) {
      data.push({
        id: `${i}`,
        img: '/imgs/anh_room.jpg',
        title: 'Phòng cho thuê Võng thị, Quận Tây Hồ',
        room_type: 1,
        available: true,
        gender: 1,
        acreage: 40,
        capacity_min: 2,
        capacity_max: 3,
        address: '26 Võng thị, Phường Bưởi, Quận Tây Hồ, Hà Nội',
        verify: true,
        favorite: false,
        price: 6500000,
      })
    }

    return new Promise(function (resolve) {
      setTimeout(
        resolve.bind(null, {
          suggest: data,
          newest: data,
        }),
        1000
      )
    })
  }
}
