import { RoomCardDTO, UserInfoDTO } from '@/constants/app.interface'
var profile: UserInfoDTO = {
  name: 'Dao Tien Nam',
  email: 'daotiennamhl120699@gmail.com',
  zalo: '',
  facebook: 'https://www.facebook.com/theonlyoneroses/',
  phone: ['0912839213', '0999111999'],
}
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

  public static getUserInfo(): Promise<any> {
    return new Promise((resolve) => {
      return setTimeout(function () {
        resolve(profile)
      }, 500)
    })
  }

  public static setUserInfo(userInfo: UserInfoDTO): Promise<any> {
    profile = userInfo
    return new Promise((resolve) => {
      return setTimeout(function () {
        resolve(userInfo)
      }, 500)
    })
  }
}
