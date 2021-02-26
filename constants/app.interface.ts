import { GENDER, ROOM_TYPES, AMEENITIES, SECURITY } from './app.constant'

/* eslint-disable camelcase */
export interface NavLink {
  code: string
  text: string
  to: string
  roles: string[]
}

export interface TextIcon {
  id: number
  text: string
  icon: string
  code: string
}

export interface BreadcrumbLink {
  text: string
  disabled: boolean
  href: string
}

export class RoomCardDTO {
  public id: string
  public imgLink: string
  public title: string
  public type: TextIcon | undefined
  public available: boolean
  public gender: TextIcon | undefined
  public area: number
  public capacity: {
    max: number
    min: number
  }

  public address: string
  public verify: boolean
  public favorite: boolean
  public price: number

  constructor(data: any) {
    this.id = data.id
    this.title = data.title
    this.type = ROOM_TYPES.find((type) => type.code === data.type)
    this.available = data.available
    this.gender = GENDER.find((type) => type.code === data.gender)
    this.area = data.area
    this.capacity = {
      max: data.capacity_max,
      min: data.capacity_min,
    }
    this.address = data.address
    this.verify = data.verify
    this.favorite = data.favorite
    this.price = data.price
    this.imgLink = data.img
  }

  public get millionPrice(): string {
    return (this.price / 1000000).toFixed(1)
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
  zalo: string
  facebook: string
  phone: Array<string>
}

export class RoomFilterDTO {
  public page: number
  public price: number[]
  public amenities: string[]
  public genders: string[]
  public roomTypes: string[]

  constructor() {
    this.page = 1
    this.price = []
    this.amenities = []
    this.genders = []
    this.roomTypes = []
  }

  set update(value: any) {
    if (value.page) {
      try {
        this.page = parseInt(value.page)
      } catch (e) {}
    }
    if (value.price && value.price.length == 2) {
      try {
        this.price[0] = parseInt(value.price[0])
        this.price[1] = parseInt(value.price[1])
      } catch (e) {}
    }
    if (value.amenities) this.amenities = value.amenities
    if (value.genders) this.genders = value.genders
    if (value.roomTypes) this.roomTypes = value.roomTypes
  }

  get toOject(): any {
    return {
      page: this.page,
      price: this.price,
      amenities: this.amenities,
      genders: this.genders,
      roomTypes: this.roomTypes,
    }
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
  public imgLinks: string[] = []
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
    this.imgLinks = data.imgs
    this.title = data.title
    this.type = ROOM_TYPES.find((type) => type.id === data.type)
    this.available = data.available
    this.gender = GENDER.find((gender) => gender.id === data.gender)
    this.area = data.area
    this.capacity = {
      max: data.capacity_max || 0,
      min: data.capacity_min || 0,
    }
    this.verify = Boolean(data.verify)
    this.favorite = Boolean(data.favorite)
    this.price = data.price
    this.eservation_fee = data.eservation_fee || 0
    this.description = data.description
    this.accept_date = data.accept_date || ''

    this.comments = data.comments
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
}

export class InnProfileDTO {
  public id: number = -1
  public imgLinks: string[] = []
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

  public owner: {
    account_id: number
    name: string
    phones: string[]
    facebook: string
    zalo: string
  } = {
    account_id: 0,
    name: '',
    phones: [],
    facebook: '',
    zalo: '',
  }

  constructor(data?: any) {
    if (!data) {
      return
    }
    this.id = data.id
    this.imgLinks = data.imgs || []
    this.name = data.name
    this.address = data.address
    this.electric = data.electric_price
    this.water = data.water_price
    this.wifi = data.wifi || 0
    this.amenities = AMEENITIES.filter((amenitie) => {
      const found = data.amenities.find((item: any) => item === amenitie.id)
      if (found) {
        return true
      }
      return false
    })
    this.security = SECURITY.filter((amenitie) => {
      const found = data.security.find((item: any) => item === amenitie.id)
      if (found) {
        return true
      }
      return false
    })
    this.open_time = {
      open: data.open_time,
      close: data.close_time,
    }
    this.owner = {
      name: data.owner_name,
      account_id: data.owner_id,
      phones: data.owner_contact.phones,
      facebook: data.owner_contact.facebook,
      zalo: data.owner_contact.zalo,
    }
  }
}
