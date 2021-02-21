import { GENDER, ROOM_TYPES } from './app.constant'

/* eslint-disable camelcase */
export interface NavLink {
  code: string
  text: string
  to: string
  roles: string[]
}

export interface TextIcon {
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
}

export interface LoginDTO {
  email: string,
  password: string,
  role: string
}

export interface LoginRule {
  email: {
    required: boolean
    email: boolean
  },
  password: {
    required: boolean
    min?: number
    max?: number
  }
}

export interface RegisterDTO {
  name: string,
  email: string,
  password: string,
  repassword: string,
  role: string,
  zalo: string,
  facebook: string,
  phone: string,
}

export interface RegisterRule {
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
    required: boolean
  }
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
      } catch(e) {}
    }
    if (value.price && value.price.length == 2) {
      
      try {
        this.price[0] = parseInt(value.price[0])
        this.price[1] = parseInt(value.price[1])
      } catch(e) {}
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
