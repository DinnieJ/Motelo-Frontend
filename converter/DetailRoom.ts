import { CommentDTO } from '@/constants/app.interface'
import { Contact } from '@/constants/app.constant'
export const convertDetailRoomDTO = (data: any): any => {
  // onwer info
  let phones: string[] = []
  let facebook: string = ''
  let zalo: string = ''
  let email: string = ''
  for (let contact of data.inn_detail.owner_contact) {
    switch (contact.type) {
      case Contact.EMAIL:
        email = contact.content
        break
      case Contact.PHONE:
        phones.push(contact.content)
        break
      case Contact.ZALO:
        zalo = contact.content
        break
      case Contact.FACEBOOK:
        facebook = contact.content
        break
    }
  }
  const owner: any = {
    name: data.inn_detail.owner_name,
    phones: phones, // fe đang k display email
    facebook: facebook,
    zalo: zalo,
  }

  // comment
  const comments: Array<CommentDTO> = []
  for (let comment of data.comments) {
    comments.push({
      id: comment.id,
      account_id: comment.tenant_id,
      name: comment.tenant_name,
      context: comment.comment,
    })
  }

  // imgLinks
  const imgs: Array<string> = [
    '/imgs/anh_room.jpg',
    '/imgs/anh_room.jpg',
    '/imgs/anh_room.jpg',
    '/imgs/anh_room.jpg',
    '/imgs/anh_room.jpg',
  ]

  // features
  const amenities: number[] = []
  const security: number[] = []
  for (let amenity of data.inn_detail.features) {
    if (amenity <= 13) amenities.push(amenity)
    else if (amenity <= 16) {
      security.push(amenity)
    }
  }
  const room: any = {
    id: data.id,
    imgs: imgs, // ...
    title: data.name,
    type: data.room_type_id,
    available: !!data.available,
    gender: data.gender_type_id,
    area: data.acreage,
    capacity_min: 2, // tạm bỏ qua
    capacity_max: 3, // tạm bỏ qua
    address: data.inn_detail.address,
    verify: data.verified,
    favorite: false, // chưa có favorite
    price: data.price,
    comments: comments,
    inn_detail: {
      id: data.inn_detail.id,
      name: data.inn_detail.inn_name,
      electric: data.inn_detail.electric_price,
      water: data.inn_detail.water_price,
      wifi: 100000,
      amenities: amenities,
      security: security,
      open_time: [data.inn_detail.open_time, data.inn_detail.close_time],
      owner_contact: owner,
      address: data.inn_detail.address,
    },
    accept_date: data.created_at,
    description: data.description,
    eservation_fee: 6000000, // tạm bỏ qua
  }
  return room
}
