import { authenticatedService } from '@/repositories/BaseRepository'
import { Endpoint } from '~/constants/app.endpoint'
import { AxiosResponse } from 'axios'

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

  public static getAllUtilities(): Promise<any> {
    return authenticatedService.get(`${Endpoint.Collaborator}/utility/all`)
  }

  public static deleteUtility(id : any) : Promise<AxiosResponse<any>> {
    return authenticatedService.post(`${ Endpoint.Collaborator }/utility/delete/${id}`)
  }
}
