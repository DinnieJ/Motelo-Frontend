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

  public address: string;
  public verify: boolean;
  public favorite: boolean;
  public price: number;

  constructor(data: {
    id: string,
    img: string
    title: string,
    type: string,
    available: boolean,
    gender: string,
    area: number,
    capacity_max: number,
    capacity_min: number,
    address: string,
    verify: boolean,
    favorite: boolean,
    price: number,
  }) {
      this.id = data.id
      this.title = data.title
      this.type = ROOM_TYPES.find(type => type.code === data.type)
      this.available = data.available
      this.gender = GENDER.find(type => type.code === data.gender)
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
    return (this.price / 1000000).toFixed(1);
  }

  public get priceUnit(): string {
    return 'tr/tháng';
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
