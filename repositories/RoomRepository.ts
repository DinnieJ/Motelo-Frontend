import { RoomFilterDTO } from '@/constants/app.interface'
import { Endpoint } from '@/constants/app.endpoint'
import { authenticatedService } from './BaseRepository'
import { AxiosResponse } from 'axios'

export default class RoomRepository {
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

  public static getOwnerRoom(params: any): Promise<AxiosResponse<any>> {
    return authenticatedService.get(`${Endpoint.OwnerRoom}/list`, { params })
  }

  public static createRoom(data: any): Promise<any> {
    return authenticatedService.post(`${Endpoint.OwnerRoom}/create`, data , { 
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  // Verify api
  public static verifyRoom(room_id: any): Promise<any> {
    return authenticatedService.post(`${Endpoint.CollaboratorRoom}/verify`, {
      room_id
    })
  }
}
