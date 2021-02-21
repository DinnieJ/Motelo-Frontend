import { LoginDTO, RegisterDTO } from '@/constants/app.interface'
import { ROLE } from '@/constants/app.constant'

export default class AuthRepository {
  /**
   * getUser
   */
  public static getUser(loginInfo: LoginDTO): Promise<any> {
    const userTenant = {
      id: '1',
      email: 'namdthe130237@fpt.edu.vn',
      password: 'daotienam',
    }
    const UserOwner = {
      id: '2',
      email: 'namdthe130238@fpt.edu.vn',
      password: 'daotienam',
    }
    return new Promise((resolve, reject) => {
      if (
        loginInfo.role === ROLE.TENANT &&
        loginInfo.email === userTenant.email &&
        loginInfo.password === userTenant.password
      ) {
        // console.log("login success for tenant");
        return setTimeout(() => resolve(ROLE.TENANT), 500)
      }
      if (
        loginInfo.role === ROLE.OWNER &&
        loginInfo.email === UserOwner.email &&
        loginInfo.password === UserOwner.password
      ) {
        // console.log("login success for owner");
        return setTimeout(() => resolve(ROLE.OWNER), 500)
      }
      // console.log("login fail");
      return setTimeout(() => reject(new Error('User not found!')), 500)
    })
  }

  public static register(registerInfo: RegisterDTO): Promise<any> {
    return new Promise((resolve) => {
      console.log("register info = ", registerInfo);
      resolve(true);
    })
  }
}
