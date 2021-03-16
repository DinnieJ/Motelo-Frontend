import { ContactDTO, NavLink, TextIcon } from './app.interface'

export const COOKIES = {
  ROLE: 'role',
  USER: 'user',
  TOKEN: 'token',
}

export const LOADING_IMG = "https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"

export const PRICE_FILTER = {
  MAX: 9,
  MIN: 0,
  STEP: 0.1,
}

export const CAPACITY = {
  MAX: 10,
  MIN: 1,
  STEP: 1,
}

export const ROLE = {
  GUEST: 'Guest',
  TENANT: 'Tenant',
  OWNER: 'Owner',
  COLLAORATOR: 'Collaborator',
}

export const NAV_LINKS: NavLink[] = [
  // Guest link
  {
    code: 'tenant_home',
    text: 'Trang chủ',
    to: '/',
    icon: 'home',
    roles: [ROLE.GUEST, ROLE.TENANT],
  },
  {
    code: 'list',
    text: 'Danh sách',
    to: '/rooms',
    icon: 'clipboard-list',
    roles: [ROLE.GUEST, ROLE.TENANT],
  },
  {
    code: 'login',
    text: 'Đăng nhập',
    to: '/login',
    icon: 'login',
    roles: [ROLE.GUEST],
  },
  {
    code: 'register',
    text: 'Đăng kí',
    to: '/register',
    icon: 'account-plus',
    roles: [ROLE.GUEST],
  },
  // Tenant link
  {
    code: 'roommate',
    text: 'Ở ghép',
    to: '/roommate',
    icon: 'account-plus',
    roles: [ROLE.TENANT],
  },
  // Owner links
  {
    code: 'owner_room',
    text: 'Yêu cầu',
    to: '/owner/requests',
    icon: 'home',
    roles: [ROLE.OWNER],
  },
]

export const AMEENITIES: TextIcon[] = [
  {
    id: 1,
    text: 'Wifi',
    icon: 'wifi',
    code: 'wifi',
  },
  {
    id: 2,
    text: 'WC riêng',
    icon: 'toilet',
    code: 'toilet',
  },
  {
    id: 3,
    text: 'Bình nóng lạnh',
    icon: 'water-boiler',
    code: 'heater',
  },
  {
    id: 4,
    text: 'Điều hòa',
    icon: 'air-conditioner',
    code: 'air_conditioner',
  },
  {
    id: 5,
    text: 'Nhà bếp',
    icon: 'pot-steam',
    code: 'kitchen',
  },
  {
    id: 6,
    text: 'Tủ lạnh',
    icon: 'fridge',
    code: 'fridge',
  },
  {
    id: 7,
    text: 'Chỗ để xe',
    icon: 'motorbike',
    code: 'parking',
  },
  {
    id: 8,
    text: 'Giờ giới nghiêm',
    icon: 'clock-alert',
    code: 'curfew',
  },
  {
    id: 9,
    text: 'Chủ riêng',
    icon: 'account-key',
    code: 'independence',
  },
  {
    id: 10,
    text: 'Máy giặt',
    icon: 'washing-machine',
    code: 'washing_machine',
  },
  {
    id: 11,
    text: 'Thú nuôi',
    icon: 'paw',
    code: 'pet',
  },
  {
    id: 12,
    text: 'Gác lửng',
    icon: 'home-floor-2',
    code: '2_floors',
  },
  {
    id: 13,
    text: 'Tủ đồ',
    icon: 'treasure-chest',
    code: 'cabinet',
  },
]

export const SECURITY: TextIcon[] = [
  {
    id: 14,
    text: 'Camera',
    code: 'camera',
    icon: 'cctv',
  },
  {
    id: 15,
    text: 'Khóa vân tay',
    code: 'fingerprint',
    icon: 'fingerprint',
  },
  {
    id: 16,
    text: 'Người bảo vệ',
    code: 'guard',
    icon: 'shield-account',
  },
]

export const ROOM_TYPES: TextIcon[] = [
  {
    id: 1,
    text: 'Phòng cho thuê',
    code: 'room',
    icon: 'home-group',
  },
  {
    id: 2,
    text: 'Nhà nguyên căn',
    code: 'house',
    icon: 'home-modern',
  },
  {
    id: 3,
    text: 'Chung cư',
    code: 'apartment',
    icon: 'office-building',
  },
]

export const GENDER: TextIcon[] = [
  {
    id: 1,
    text: 'Nam & Nữ',
    icon: 'human-male-female',
    code: 'both',
  },
  {
    id: 2,
    text: 'Nam',
    icon: 'google-street-view',
    code: 'man',
  },
  {
    id: 3,
    text: 'Nữ',
    icon: 'human-female',
    code: 'woman',
  },
]

export enum Contact {
  EMAIL = 1,
  PHONE = 2,
  ZALO = 3,
  FACEBOOK = 4,
}

export const Contacts: ContactDTO[] = [
  {
    type: Contact.EMAIL,
    name: 'emails',
    text: 'Email',
    icon: '/imgs/logo-mail.png',
    link: true,
  },
  {
    type: Contact.PHONE,
    name: 'phones',
    text: 'Số điện thoại',
    icon: '/imgs/logo-phone.png',
    link: false,
  },
  {
    type: Contact.ZALO,
    name: 'zalos',
    text: 'Zalo',
    icon: '/imgs/logo-zalo.jpg',
    link: true,
  },
  {
    type: Contact.FACEBOOK,
    name: 'facebooks',
    text: 'Facebook',
    icon: '/imgs/logo-facebook.png',
    link: true,
  },
]

export const FPTLocation = [21.013430248238773, 105.5270750314157]
<<<<<<< HEAD
export const DefaultMapZoom = 14
=======
export const DefaultMapZoom = 15
>>>>>>> add map in detail room page
