import { AxiosResponse } from 'axios'
import { authenticatedService } from '@/repositories/BaseRepository'
import { Endpoint } from '~/constants/app.endpoint'



export default class InnRepository {
  public static getOwnerHomepage(): Promise<any> {
    const data = {
      inn: {
        id: 1,
        name: 'Nhà trọ Minh Tuấn',
        electric: 3500,
        water: 4000,
        wifi: 100000,
        amenities: [
          'wifi',
          'toilet',
          'air_conditioner',
          'parking',
          'independence',
          'washing_machine',
          'cabinet',
          'fridge',
          'kitchen',
          'heater',
          'pet',
        ],
        imgs: [
            '/imgs/anh_room.jpg',
            '/imgs/anh_room.jpg',
            '/imgs/anh_room.jpg',
            '/imgs/anh_room.jpg',
            '/imgs/anh_room.jpg',
          ],
        security: ['camera', 'fingerprint', 'guard'],
        open_time: [5, 23],
        owner: {
          name: 'Dao Tien Nam',
          phones: ['0912839213'],
          facebook: 'https://www.facebook.com/nguyenvana/',
          zalo: 'https://zalo.me/0912839213',
        },
        address: '26 Võng thị, Phường Bưởi, Quận Tây Hồ, Hà Nội',
      },
    }
    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, data), 1000)
    })
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
}
