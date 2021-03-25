import { authenticatedService } from '@/repositories/BaseRepository'
import { Endpoint } from '~/constants/app.endpoint'

export default class UtilityRepository {
  public static createUtility(data: any): Promise<any> {
    return authenticatedService.post(
      `${Endpoint.Collaborator}/utility/create`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  }

  // mock
  public static updateUtility(data: any): Promise<any> {
    return authenticatedService.post(
      `${Endpoint.Collaborator}/utility/update`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
  }

  public static getAllUtilities(): Promise<any> {
    return authenticatedService.get(`${Endpoint.Collaborator}/utility/all`)
  }

  // mock
  public static getUtilityById(id: number): Promise<any> {
    const data = {
      id: 1,
      type: 2,
      title: 'title',
      description: 'this is description',
      address: 'this is address',
      location: '21.013430248238773 105.5270750314157',
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
    }

    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, data), 1000)
    })
  }

  public static deleteRoom(utility_id: number): Promise<any> {
    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, true), 1000)
    })
  }
}
