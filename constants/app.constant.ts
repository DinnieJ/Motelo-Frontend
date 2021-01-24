import { NavLink, Amenitie, Gender, RoomType } from './app.interface'

export const TOKEN_KEY = 'token'

export const PRICE_FILTER = {
  MAX: 12,
  MIN: 0,
  STEP: 0.3,
}

export const NAV_LINKS: NavLink[] = [
  {
    code: 'home',
    text: 'Trang chủ',
    active: true,
    to: '/',
  },
  {
    code: 'list',
    text: 'Danh sách',
    active: false,
    to: '/posts',
  },
  {
    code: 'map',
    text: 'Bản đồ',
    active: false,
    to: '/map',
  },
]

export const AMEENITIES: Amenitie[] = [
  {
    text: 'Wifi',
    icon: 'wifi',
    code: 'wifi',
    fas: true,
  },
  {
    text: 'WC riêng',
    icon: 'toilet',
    code: 'wc',
    fas: true,
  },
  {
    text: 'Bình nóng lạnh',
    icon: 'shower',
    code: 'heater',
    fas: true,
  },
  {
    text: 'Điều hòa',
    icon: 'air-conditioner',
    code: 'air_conditioner',
    fas: false,
  },
  {
    text: 'Nhà bếp',
    icon: 'pot-steam',
    code: 'kitchen',
    fas: false,
  },
  {
    text: 'Tủ lạnh',
    icon: 'fridge',
    code: 'fridge',
    fas: false,
  },
  {
    text: 'Chỗ để xe',
    icon: 'motorcycle',
    code: 'parking',
    fas: true,
  },
  {
    text: 'Giờ giới nghiêm',
    icon: 'clock-alert',
    code: 'curfew',
    fas: false,
  },
  {
    text: 'Chủ riêng',
    icon: 'home-group',
    code: 'independence',
    fas: false,
  },
  {
    text: 'Máy giặt',
    icon: 'washing-machine',
    code: 'washing_machine',
    fas: false,
  },
  {
    text: 'Gác lửng',
    icon: 'home-floor-2',
    code: '2_floors',
    fas: false,
  },
  {
    text: 'Tủ đồ',
    icon: 'treasure-chest',
    code: 'cabinet',
    fas: false,
  },
]

export const ROOM_TYPES: RoomType[] = [
  {
    text: 'Phòng cho thuê',
    code: 'room',
  },
  {
    text: 'nhà nguyên căn',
    code: 'house',
  },
  {
    text: 'Chung cư',
    code: 'apartment',
  },
]

export const GENDER: Gender[] = [
  {
    text: 'Tất cả',
    icon: 'human-male-female',
    code: 'both',
  },
  {
    text: 'Nam',
    icon: 'google-street-view',
    code: 'man',
  },
  {
    text: 'Nữ',
    icon: 'human-female',
    code: 'woman',
  },
]
