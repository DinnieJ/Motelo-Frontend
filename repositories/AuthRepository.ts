import { LoginDTO, OwnerRegisterDTO, TenantRegisterDTO } from '@/constants/app.interface'
import { Endpoint } from '@/constants/app.endpoint'
import { AxiosResponse } from 'axios'
import { authenticatedService } from './BaseRepository'

export default class AuthRepository {
  /**
   * getUser
   */

  public static login(loginInfo: LoginDTO): Promise<AxiosResponse<any>> {
    let endpoint: any = {
      Tenant: Endpoint.AuthTenant,
      Owner: Endpoint.AuthOwner,
      Collaborator: Endpoint.AuthCollaborator
    }
    return authenticatedService.post(`${endpoint[loginInfo.role]}/login`, { 
      email: loginInfo.email,
      password: loginInfo.password
    });
  }

  public static registerTenant(data: TenantRegisterDTO): Promise<AxiosResponse<any>> {
    return authenticatedService.post(`${Endpoint.AuthTenant}/register`, {
      email: data.email,
      password: data.password,
      name: data.name,
      date_of_birth: data.date_of_birth,
      phone: data.phone
    })
  }

  public static registerOwner(data: OwnerRegisterDTO): Promise<AxiosResponse<any>> {
    return authenticatedService.post(`${Endpoint.AuthOwner}/register`, {
      name: data.name,
      email: data.email,
      password: data.password,
      date_of_birth: data.date_of_birth,
      address: data.address,
      contacts: data.contact
    })
  }

}
