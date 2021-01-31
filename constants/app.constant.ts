import { NavLink, TextIcon } from './app.interface'

export const TOKEN_KEY = 'token'

export const PRICE_FILTER = {
  MAX: 6,
  MIN: 0,
  STEP: 0.2,
}

export const ROLE = {
  GUEST: 'Guest',
  TENANT: 'Tenant',
  OWNER: 'Owner',
  COLLAORATOR: 'Collaborator'
}

export const NAV_LINKS: NavLink[] = [
  {
    code: 'home',
    text: 'Trang chủ',
    active: true,
    to: '/',
    role: [ROLE.GUEST, ROLE.TENANT],
  },
  {
    code: 'list',
    text: 'Danh sách',
    active: false,
    to: '/posts',
    role: [ROLE.GUEST, ROLE.TENANT],
  },
  {
    code: 'map',
    text: 'Bản đồ',
    active: false,
    to: '/map',
    role: [ROLE.GUEST, ROLE.TENANT, ROLE.COLLAORATOR],
  },
  {
    code: 'login',
    text: 'Đăng nhập',
    active: false,
    to: '/login',
    role: [ROLE.GUEST],
  },
  {
    code: 'register',
    text: 'Đăng kí',
    active: false,
    to: '/register',
    role: [ROLE.GUEST],
  },
]

export const AMEENITIES: TextIcon[] = [
  {
    text: 'Wifi',
    icon: 'wifi',
    code: 'wifi',
  },
  {
    text: 'WC riêng',
    icon: 'toilet',
    code: 'toilet',
  },
  {
    text: 'Bình nóng lạnh',
    icon: 'water-boiler',
    code: 'heater',
  },
  {
    text: 'Điều hòa',
    icon: 'air-conditioner',
    code: 'air_conditioner',
  },
  {
    text: 'Nhà bếp',
    icon: 'pot-steam',
    code: 'kitchen',
  },
  {
    text: 'Tủ lạnh',
    icon: 'fridge',
    code: 'fridge',
  },
  {
    text: 'Chỗ để xe',
    icon: 'motorbike',
    code: 'parking',
  },
  {
    text: 'Giờ giới nghiêm',
    icon: 'clock-alert',
    code: 'curfew',
  },
  {
    text: 'Chủ riêng',
    icon: 'account-key',
    code: 'independence',
  },
  {
    text: 'Máy giặt',
    icon: 'washing-machine',
    code: 'washing_machine',
  },
  {
    text: 'Thú nuôi',
    icon: 'paw',
    code: 'pet',
  },
  {
    text: 'Gác lửng',
    icon: 'home-floor-2',
    code: '2_floors',
  },
  {
    text: 'Tủ đồ',
    icon: 'treasure-chest',
    code: 'cabinet',
  },
]

export const ROOM_TYPES: TextIcon[] = [
  {
    text: 'Phòng cho thuê',
    code: 'room',
    icon: 'home-group'
  },
  {
    text: 'nhà nguyên căn',
    code: 'house',
    icon: 'home-modern'
  },
  {
    text: 'Chung cư',
    code: 'apartment',
    icon: 'office-building'
  },
]

export const GENDER: TextIcon[] = [
  {
    text: 'Nam & Nữ',
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
