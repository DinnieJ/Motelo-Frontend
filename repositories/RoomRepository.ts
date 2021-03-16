import { RoomFilterDTO } from '@/constants/app.interface'
import { Endpoint } from '@/constants/app.endpoint'
import { authenticatedService } from './BaseRepository'
import { AxiosResponse } from 'axios'

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

  public static getRoomsByFilter(params: any): Promise<any> {
    return authenticatedService.get(`${Endpoint.Room}/list`, { params })
  }

  // Favorite api
  public static favorRoom(room_id: any): Promise<any> {
    return authenticatedService.post(`${Endpoint.TenantFavorite}/add`, {
      room_id
    })
  }

  public static unfavorRoom(room_id: any): Promise<any> {
    return authenticatedService.post(`${Endpoint.TenantFavorite}/remove`, {
      room_id
    })
  }

  public static getFavoriteList(): Promise<any> {
    return authenticatedService.get(`${Endpoint.TenantFavorite}/list`)
  }

  // Room Detail api
  public static getRoomDetail(roomId: any): Promise<any> {
    return authenticatedService.get(`${Endpoint.DetailRoom}/${roomId}`)
  }

  // Comment api
  public static addComment(room_id: number, comment: string): Promise<any> {
    return authenticatedService.post(`${Endpoint.TenantComment}/add`, {
      room_id,
      comment,
    })
  }

  public static editComment(id: number, comment: string): Promise<any> {
    return authenticatedService.post(`${Endpoint.TenantComment}/update`, {
      id,
      comment,
    })
  }

  public static deleteComment(comment_id: number): Promise<any> {
    return authenticatedService.delete(`${Endpoint.TenantComment}/delete`, {
      data: {
        id: comment_id,
      },
    })
  }

  public static getTopFavorite(): Promise<AxiosResponse<any>> {
    return authenticatedService.get(`${Endpoint.Room}/favorites`)
  }

  public static getTopVerified() : Promise<AxiosResponse<any>> {
    return authenticatedService.get(`${Endpoint.Room}/verified`)
  }

  public static getLatestRoom(): Promise<AxiosResponse<any>> {
    return authenticatedService.get(`${Endpoint.Room}/latest`)
  }
}
