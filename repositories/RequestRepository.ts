export default class RequestRepository {
  public static getAllOwnRequests(): Promise<any> {
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
        verify: false,
        favorite: false,
        price: 6500000,
      })
    }

    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, data), 1000)
    })
  }

  public static deleteRoom(id: string): Promise<any> {
    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, true), 1000)
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
      name: 'Phòng cho thuê Võng thị, Quận Tây Hồ',
      room_type_id: 'room',
      available: 1,
      gender: 'both',
      acreage: 40,
      capacity_min: 2,
      capacity_max: 3,
      address: '26 Võng thị, Phường Bưởi, Quận Tây Hồ, Hà Nội',
      verified: 1,
      favorite: false,
      verfied_at: '18-02-2021',
      price: 6500000,
      reservation_fee: 6000000,
      status: 1,
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
      inn_detail: {
        id: 1,
        name: 'Nhà trọ Minh Tuấn',
        electric_price: 3500,
        water_price: 4000,
        wifi: 100000,
        features: [
          { id: 0, title: 'wifi' },
          { id: 1, title: 'toilet' },
          { id: 2, title: 'air_conditioner' },
          { id: 3, title: 'parking' },
          { id: 4, title: 'independence' },
          { id: 5, title: 'washing_machine' },
          { id: 6, title: 'cabinet' },
          { id: 7, title: 'fridge' },
          { id: 8, title: 'kitchen' },
          { id: 9, title: 'heater' },
          { id: 10, title: 'pet' },
          { id: 11, title: 'camera' },
          { id: 12, title: 'fingerprint' },
          { id: 13, title: 'guard' },
        ],
        open_time: '6:30',
        close_time: '24:00',
        owner_name: 'Dao Tien Nam',
        owner_id: 3,
        owner_contact: {
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
      created_at: '18-02-2021',
      updated_at: '18-02-2031',
    }

    return new Promise(function (resolve) {
      setTimeout(resolve.bind(null, data), 1000)
    })
  }

}
