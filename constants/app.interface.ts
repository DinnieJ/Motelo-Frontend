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
  id: string
  imgLink: string
  title: string
  type: TextIcon | undefined
  available: boolean
  gender: TextIcon | undefined
  area: number
  capacity: {
    max: number
    min: number
  }

  address: string
  verify: boolean
  favorite: boolean
  price: number
  inn_name: string

  constructor(data: any) {
    this.id = data.id
    this.title = data.name
    this.type = ROOM_TYPES.find((type) => type.id === data.room_type)
    this.available = data.available
    this.gender = GENDER.find((type) => type.id === data.gender)
    this.area = data.acreage
    this.capacity = {
      max: data.capacity_max || 3,
      min: data.capacity_min || 2,
    }
    this.address = data.address
    this.verify = data.verified
    this.favorite = data.favorite || false
    this.price = data.price
    this.imgLink = data.img || '/imgs/anh_room.jpg'
    this.inn_name = data.inn_name
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
  name: string,
  email: string,
  password: string,
  repassword: string,
  phone: string,
  date_of_birth: string
}

export interface OwnerRegisterDTO {
  name: string,
  email: string,
  password: string,
  repassword: string,
  address: string,
  date_of_birth: string,
  contact: Array<Object>
}

export interface TenantRegisterRule {
  email: {
    required: boolean
    email: boolean
  },
  password: {
    required: boolean
    min?: number
    max?: number
  },
  repassword: {
    required: boolean,
    confirmed: string,
  }
  name: {
    required: boolean,
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
  },
  password: {
    required: boolean
    min?: number
    max?: number
  },
  repassword: {
    required: boolean,
    confirmed: string,
  }
  name: {
    required: boolean,
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
  name: string,
  email: string,
  zalo: string,
  facebook: string,
  phone: Array<string>
}

export class RoomFilterDTO {
  public page: number
  public keyword: string
  public price: number[]
  public min_price: number
  public max_price: number
  public amenities: string[]
  public gender: number
  public room_type: number[]

  constructor() {
    this.page = 1
    this.keyword = ''
    this.min_price = 0
    this.max_price = 6
    this.price = [this.min_price, this.max_price]
    this.amenities = []
    this.gender = 1
    this.room_type = []
  }

  set update(value: any) {
    if (value.page) {
      try {
        this.page = parseInt(value.page)
      } catch (e) {}
    }
    if (value.min_price) {
      try {
        this.min_price = parseInt(value.min_price)
      } catch (e) {}
    }
    if (value.max_price) {
      try {
        this.page = parseInt(value.max_price)
      } catch (e) {}
    }
    if(value.price && value.price.length == 2) {
      try {
        this.min_price = parseInt(value.price[0])
        this.max_price = parseInt(value.price[1])
      } catch(e) {}
    }
    if (value.gender) {
      try {
        this.page = parseInt(value.gender)
      } catch (e) {}
    }
    if (value.amenities) this.amenities = value.amenities
    if (value.roomTypes) this.room_type = value.room_type
  }

  get toOject(): any {
    return {
      page: this.page,
      keyword: this.keyword,
      min_price: this.min_price,
      max_price: this.max_price,
      features: this.amenities.join(','),
      gender: this.gender,
      room_type: this.room_type.join(','),
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
    this.imgLinks = data.imgs || []
    this.title = data.name
    this.type = ROOM_TYPES.find((item) => item.id == data.room_type)
    this.available = Boolean(data.available)
    this.gender = GENDER.find((type) => type.id == data.gender)
    this.area = data.acreage
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
    open: number
    close: number
  } = {
    open: 0,
    close: 0
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
    zalo: ''
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
      const found = data.features.find((item: any) => item.title === amenitie.code)
      if (found) {
        return true
      }
      return false
    })
    this.security = SECURITY.filter((amenitie) => {
      const found = data.features.find((item: any) => item.title === amenitie.code)
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