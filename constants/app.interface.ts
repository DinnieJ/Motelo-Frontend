import {
  GENDER,
  ROOM_TYPES,
  AMEENITIES,
  SECURITY,
  UTILITY_TYPE,
} from './app.constant'
import { Contact } from '@/constants/app.constant'
import { getDateFromString } from '@/utils/dateparser'

/* eslint-disable camelcase */
export interface NavLink {
  icon: string
  code: string
  text: string
  to: string
  roles: string[]
}

export interface TextIcon {
  id: number
  text: string
  icon: string
  code?: string
}

export interface BreadcrumbLink {
  text: string
  disabled: boolean
  href: string
}

export class RoomCardDTO {
  id: string
  image: string
  title: string
  type: TextIcon | undefined
  available: boolean
  gender: TextIcon | undefined
  area: number
  address: string
  verify: boolean
  favorite: boolean
  price: number
  inn_name: string
  location: {
    lat: any
    lng: any
  }

  constructor(data: any, forOwner?: boolean) {
    this.id = data.id
    this.title = data.name
    this.type = ROOM_TYPES.find((type) => type.id === data.room_type)
    this.available = data.available
    this.gender = GENDER.find((type) => type.id === data.gender)
    this.area = data.acreage

    this.verify = data.verified
    this.favorite = Boolean(data.favorited)
    this.price = data.price
    // images
    this.image =
      data.image ||
      'https://tgrh.org/wp-content/uploads/2020/02/avt-demo-la-gi.png'

    if (forOwner) {
      this.inn_name = ''
      this.address = ''
      this.location = {
        lat: '',
        lng: '',
      }
    } else {
      this.inn_name = data.inn_name
      this.address = data.address
      this.location = data.location
    }
  }
}

export interface LoginDTO {
  email: string
  password: string
  role: string
}

export interface LoginRule {
  email: {
    required: boolean
    email: boolean
  }
  password: {
    required: boolean
    min?: number
    max?: number
  }
}

export interface TenantRegisterDTO {
  name: string
  email: string
  password: string
  repassword: string
  phone: string
  date_of_birth: string
}

export interface OwnerRegisterDTO {
  name: string
  email: string
  password: string
  repassword: string
  address: string
  date_of_birth: string
  contact: Array<Object>
}

export interface TenantRegisterRule {
  email: {
    required: boolean
    email: boolean
  }
  password: {
    required: boolean
    min?: number
    max?: number
  }
  repassword: {
    required: boolean
    confirmed: string
  }
  name: {
    required: boolean
    regex: any
  }
  phone: {
    required: boolean
  }
  date_of_birth: {
    required: boolean
  }
}

export interface OwnerRegisterRule {
  email: {
    required: boolean
    email: boolean
  }
  password: {
    required: boolean
    min?: number
    max?: number
  }
  repassword: {
    required: boolean
    confirmed: string
  }
  name: {
    required: boolean
    regex: any
  }
  date_of_birth: {
    required: boolean
  }

  address: {
    required: boolean
  }
}

export interface UserInfoDTO {
  name: string
  email: string
  date_of_birth: string
  phone_number: string
}

export class MarkerDTO {
  id: number
  name: string
  description: string
  type: TextIcon | undefined
  address: string
  position: {
    lat: number
    lng: number
  }
  img: string

  constructor(data?: any) {
    if (!data) {
      this.id = -1
      this.name = ''
      this.description = ''
      this.type = {
        id: -1,
        text: '',
        icon: '',
      }
      this.address = ''
      this.position = {
        lat: 0,
        lng: 0,
      }
      this.img = ''
      return
    }
    this.id = data.id
    this.type = UTILITY_TYPE.find((utility) => utility.id == data.type)
    this.name = data.title
    this.description = data.description
    this.address = data.address
    const location = data.location
      .split(' ')
      .map((coord: any) => parseFloat(coord))
    this.position = {
      lat: location[0],
      lng: location[1],
    }
    this.img = data.image_url
  }
}

const NULL_ICON: TextIcon = {
  id: -1,
  code: '',
  icon: '',
  text: '',
}

export class RoomDetailDTO {
  public id: number = -1
  public images: { id: number; image_url: string }[] = [
    {
      id: -1,
      image_url: '',
    },
  ]
  public title: string = ''
  public type: TextIcon | undefined = NULL_ICON
  public available: boolean = false
  public gender: TextIcon | undefined = NULL_ICON
  public area: number = 0
  public capacity: {
    min: number
    max: number
  } = {
    min: 0,
    max: 0,
  }
  public verify: boolean = false
  public favorite: boolean = false
  public price: number = 0
  public eservation_fee: number = 0
  public description: string = ''
  public accept_date: string = ''

  public comments: CommentDTO[] = []
  public inn: InnProfileDTO = new InnProfileDTO()

  public verfied_at: string = ''

  constructor(data?: any) {
    if (!data) {
      return
    }
    this.id = data.id
    // images
    const imgs: Array<object> = [
      {
        id: -1,
        image_url:
          'https://tgrh.org/wp-content/uploads/2020/02/avt-demo-la-gi.png',
      },
    ]
    this.images = data.images.length !== 0 && data.images || imgs
    this.title = data.name
    this.type = ROOM_TYPES.find((type) => type.id === data.room_type_id)
    this.available = Boolean(data.available)
    this.gender = GENDER.find((gender) => gender.id === data.gender_type_id)
    this.area = data.acreage
    this.capacity = {
      max: data.capacity_max || 0,
      min: data.capacity_min || 0,
    }
    this.verify = Boolean(data.verified)
    this.favorite = Boolean(data.favorited)
    this.price = data.price
    this.eservation_fee = data.eservation_fee || 0
    this.description = data.description
    this.accept_date = data.created_at
    // comment
    const comments: Array<CommentDTO> = []
    for (let comment of data.comments) {
      comments.push({
        id: comment.id,
        account_id: comment.tenant_id,
        name: comment.tenant_name,
        context: comment.comment,
        time_context: comment.time_context
      })
    }
    this.comments = comments
    // inn
    this.inn = new InnProfileDTO(data.inn_detail)
    this.verfied_at = data.verfied_at || ''
  }

  public get priceUnit(): string {
    return 'tr/tháng'
  }

  public get capacityString(): string {
    return `${this.capacity.min} - ${this.capacity.max} ng`
  }

  public get areaString(): string {
    return `${this.area} m²`
  }

  public get availableHtml(): string {
    if (this.available) {
      return `<span class="success--text">Còn phòng</span>`
    }
    return `<span class="warning--text">Hết phòng</span>`
  }

  public get requestType(): string {
    return 'Tạo mới'
  }
}

export interface CommentDTO {
  id: number
  account_id: number
  name: string
  context: string
  time_context?: string
}

export class InnProfileDTO {
  public id: number = -1
  public images: { id: number; image_url: string }[] = [
    {
      id: -1,
      image_url: '',
    },
  ]
  public name: string = ''
  public address: string = ''
  public electric: number = 0
  public water: number = 0
  public wifi: number = 0
  public amenities: TextIcon[] = []
  public security: TextIcon[] = []
  public open_time: {
    open: string
    close: string
  } = {
    open: '0',
    close: '0',
  }
  public position: {
    lat: number
    lng: number
  } = {
    lat: 0,
    lng: 0,
  }

  public owner: {
    account_id: number
    name: string
    emails: string[]
    phones: string[]
    facebooks: string[]
    zalos: string[]
  } = {
    account_id: 0,
    name: '',
    emails: [],
    phones: [],
    facebooks: [],
    zalos: [],
  }

  constructor(data?: any) {
    if (!data) {
      return
    }
    this.id = data.id
    // images
    const imgs: Array<object> = [
      {
        id: -1,
        image_url:
          'https://tgrh.org/wp-content/uploads/2020/02/avt-demo-la-gi.png',
      },
    ]
    this.images = data.images || imgs
    this.name = data.inn_name
    this.address = data.address
    this.electric = data.electric_price
    this.water = data.water_price
    this.wifi = data.wifi || 0
    // features
    let amenities: number[] = []
    let security: number[] = []
    for (let amenity of data.features) {
      if (amenity <= 13) amenities.push(amenity)
      else if (amenity <= 16) {
        security.push(amenity)
      }
    }
    this.amenities = AMEENITIES.filter((amenity) => {
      const found = amenities.find((item: number) => item === amenity.id)
      if (found) {
        return true
      }
      return false
    })
    this.security = SECURITY.filter((amenity) => {
      const found = security.find((item: number) => item === amenity.id)
      if (found) {
        return true
      }
      return false
    })
    this.open_time = {
      open: data.open_time,
      close: data.close_time,
    }
    this.position = data.location
    // onwer contact
    let phones: string[] = []
    let facebooks: string[] = []
    let zalos: string[] = []
    let emails: string[] = []
    for (let contact of data.owner_contact) {
      switch (contact.type) {
        case Contact.EMAIL:
          emails.push(contact.content)
          break
        case Contact.PHONE:
          phones.push(contact.content)
          break
        case Contact.ZALO:
          zalos.push(contact.content)
          break
        case Contact.FACEBOOK:
          facebooks.push(contact.content)
          break
      }
    }
    this.owner = {
      name: data.owner_name,
      account_id: data.owner_id,
      emails,
      phones,
      facebooks,
      zalos,
    }
  }
}

export interface ContactDTO {
  type: number
  name: string
  text: string
  icon: string
  link: boolean
}
