import { RoomFilterDTO } from '@/constants/app.interface'

export default class RoomRepository {
  public static getAllRooms(): Promise<any> {
    const data: Object[] = []

    for (let i = 0; i < 7; i++) {
      data.push({
        id: `${i}`,
        img: '/imgs/anh_room.jpg',
        title: 'Phòng cho thuê Võng thị, Quận Tây Hồ',
        type: 'room',
        available: true,
        gender: 'both',
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
      setTimeout(resolve.bind(null, data), 1000)
    })
  }

  public static getRoomsByFilter(filter: RoomFilterDTO): Promise<any> {
    const data: Object[] = []

    for (let i = 0; i < 7; i++) {
      data.push({
        id: `${i}`,
        img: '/imgs/anh_room.jpg',
        title: 'Phòng cho thuê Võng thị, Quận Tây Hồ',
        type: 'room',
        available: true,
        gender: 'both',
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
      setTimeout(resolve.bind(null, data), 1000)
    })
  }

  public static favorRoom(roomId: any): Promise<any> {
    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, true), 1000)
    })
  }

  public static unfavorRoom(roomId: any): Promise<any> {
    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, false), 1000)
    })
  }

  public static getRoomDetail(roomId: any): Promise<any> {
    const data = {
      id: `1`,
      imgs: [
        '/imgs/anh_room.jpg',
        '/imgs/anh_room.jpg',
        '/imgs/anh_room.jpg',
        '/imgs/anh_room.jpg',
        '/imgs/anh_room.jpg',
      ],
      title: 'Phòng cho thuê Võng thị, Quận Tây Hồ',
      type: 'room',
      available: true,
      gender: 'both',
      area: 40,
      capacity_min: 2,
      capacity_max: 3,
      address: '26 Võng thị, Phường Bưởi, Quận Tây Hồ, Hà Nội',
      verify: true,
      favorite: false,
      price: 6500000,
      reservation_fee: 6000000,
      comments: [
        {
          id: 1,
          account_id: 1,
          name: 'John Doe',
          context:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the',
        },
        {
          id: 2,
          account_id: 1,
          name: 'John Doe',
          context:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the',
        },
        {
          id: 3,
          account_id: 2,
          name: 'John Doe',
          context:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the',
        },
        {
          id: 4,
          account_id: 2,
          name: 'John Doe',
          context:
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the',
        },
      ],
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
      accept_date: '23/12/2020',

      description: `Cho Thuê Phòng CĂN HỘ CCMN Full Đồ

      26 Võng Thị cách Hồ Tây 200m
      
      🌻Diện tích:40m
      
      🌻 CHÍNH CHỦ KHÔNG MÔI GIƠI, XEM PHÒNG MIỄN PHÍ.
      
      🌻 Full Nội thất tiện nghi: sàn gỗ,máy giặt, nóng lạnh , gường, tủ, bàn trang điểm,điều hoà, may giặt, kệ bếp tủ bếp, 
      bếp từ, hút mùi, chăn ga gối đêm, bàn ăn, tivi truyền hình cáp....sang trọng, lịch sự. Chỉ cần xách vali đến ở.
      
      🌻 Cầu thang máy , khoá từ từng phòng
      
      🌻 để xe tầng hầm, ban công phơi đồ riêng
      
      🌻 Điện nước giá rẻ
      
      🌻 Không chung chủ,đóng 1 cọc 1
      
      🌻 Không gian thoáng đãng, yên tĩnh, trong lành
      
      🌻 Nhận nhà ngay.bảo vệ trông đêm giờ giấc thoải mái ảnh thật của phòng liên hệ cc 0333.90.1990`,

      eservation_fee: 6000000,
    }

    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, data), 1000)
    })
  }

  public static addComment(value: string): Promise<any> {
    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, false), 1000)
    })
  }

  public static getGuestHomepage(): Promise<any> {
    const data: Object[] = []

    for (let i = 0; i < 4; i++) {
      data.push({
        id: `${i}`,
        img: '/imgs/anh_room.jpg',
        title: 'Phòng cho thuê Võng thị, Quận Tây Hồ',
        type: 'room',
        available: true,
        gender: 'both',
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
      setTimeout(
        resolve.bind(null, {
          suggest: data,
          newest: data,
        }),
        1000
      )
    })
  }
}
