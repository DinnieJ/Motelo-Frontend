import { LoginDTO, RegisterDTO } from '@/constants/app.interface'
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

  public static register(registerInfo: RegisterDTO): Promise<any> {
    return new Promise((resolve) => {
      console.log("register info = ", registerInfo);
      resolve(true);
    })
  }
}
