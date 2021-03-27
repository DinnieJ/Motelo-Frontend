import { AxiosResponse } from 'axios'
import { authenticatedService } from '@/repositories/BaseRepository'
import { Endpoint } from '~/constants/app.endpoint'



export default class InnRepository {
  public static getInnDetailByOwner(): Promise<any> {
    return authenticatedService.get(`${Endpoint.Owner}/inn/detail`)
  }

  public static createInn(data :any): Promise<AxiosResponse<any>> {
    return authenticatedService.post(`${Endpoint.Owner}/inn/create`, data)
  }

  public static updateInnImage( data: any ) : Promise<AxiosResponse<any>> {
    return authenticatedService.post(`${Endpoint.Owner}/inn/image/upload`, data , { 
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  public static checkExistInn() : Promise<AxiosResponse<any>> {
    return authenticatedService.get(`${Endpoint.Owner}/inn/check`)
  }

  public static updateInn( data: any ) : Promise<AxiosResponse<any>> {
    return authenticatedService.post(`${Endpoint.Owner}/inn/update`, data , { 
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
