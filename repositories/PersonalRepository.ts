import { RoomCardDTO, UserInfoDTO } from '@/constants/app.interface'
import { AxiosResponse } from 'axios'
import { Endpoint } from '~/constants/app.endpoint'
import { authenticatedService } from './BaseRepository'

export default class PersonalRepository {
  public static getFavoriteRoom(): Promise<any> {
    const data: Object[] = []
    for (let i = 0; i < 4; i++) {
      data.push({
        id: `${i}`,
        img: '/imgs/anh_room.jpg',
        title: 'Phòng cho thuê Võng thị, Quận Tây Hồ',
        room_type: 1,
        available: true,
        gender: 1,
        area: 40,
        capacity_min: 2,
        capacity_max: 3,
        address: '26 Võng thị, Phường Bưởi, Quận Tây Hồ, Hà Nội',
        verify: true,
        favorite: false,
        price: 6500000,
      })
    }
    return new Promise(function (resolve) {
      return setTimeout(function () {
        resolve(data)
      }, 1000)
    })
  }

  public static getUserInfo(): Promise<AxiosResponse<any>> {
    return authenticatedService.get(`${Endpoint.AuthTenant}/user`);
  }

  public static updateUserInfo(userInfo: UserInfoDTO): Promise<any> {
    return authenticatedService.post(`${Endpoint.AuthTenant}/edit`, {
      name: userInfo.name,
      date_of_birth: userInfo.date_of_birth,
      phone_number: userInfo.phone_number
    })
  }
}
