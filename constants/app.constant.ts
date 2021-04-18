import { ContactDTO, NavLink, TextIcon } from './app.interface'
import {
  mdiBank,
  mdiBed,
  mdiBilliards,
  mdiBusStop,
  mdiCart,
  mdiCash,
  mdiCellphone,
  mdiCoffee,
  mdiControllerClassic,
  mdiGasStation,
  mdiGlassMugVariant,
  mdiLaptop,
  mdiMicrophoneSettings,
  mdiMotorbike,
  mdiMovieOpen,
  mdiPill,
  mdiPoliceBadge,
  mdiSilverwareVariant,
  mdiSim,
  mdiSoccer,
  mdiStore,
  mdiStorefrontOutline,
  mdiWashingMachine,
  mdiWeightLifter,
  mdiHomeGroup,
  mdiHomeModern,
  mdiOfficeBuilding,
} from '@mdi/js'
export const COOKIES = {
  ROLE: 'role',
  USER: 'user',
  TOKEN: 'token',
}

export const LOADING_IMG =
  '/imgs/loading.gif'

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
  COLLABORATOR: 'Collaborator',
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
    roles: [ROLE.GUEST, ROLE.TENANT, ROLE.COLLABORATOR],
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
  // {
  //   code: 'roommate',
  //   text: 'Ở ghép',
  //   to: '/roommate',
  //   icon: 'account-plus',
  //   roles: [ROLE.TENANT],
  // },
  // Owner links
  {
    code: 'owner_room',
    text: 'Phòng của bạn',
    to: '/owner/requests',
    icon: 'home',
    roles: [ROLE.OWNER],
  },
  // Collaborator links
  {
    code: 'map',
    text: 'Bản đồ',
    to: '/map',
    icon: 'home',
    roles: [ROLE.COLLABORATOR],
  },
  {
    code: 'banner',
    text: 'Quản lí banner',
    to: '/banner',
    icon: 'view-carousel',
    roles: [ ROLE.COLLABORATOR ]
  }
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
    code: mdiHomeGroup,
    icon: 'home-group',
  },
  {
    id: 2,
    text: 'Nhà nguyên căn',
    code: mdiHomeModern,
    icon: 'home-modern',
  },
  {
    id: 3,
    text: 'Chung cư',
    code: mdiOfficeBuilding,
    icon: 'office-building',
  },
]

export const UTILITY_TYPE: TextIcon[] = [
  { id: 1, code: mdiMotorbike, text: 'Sửa xe máy', icon: 'motorbike' },
  {
    id: 2,
    code: mdiSilverwareVariant,
    text: 'Quán ăn',
    icon: 'silverware-variant',
  },
  { id: 3, code: mdiBilliards, text: 'Bi-a', icon: 'billiards' },
  {
    id: 4,
    code: mdiStorefrontOutline,
    text: 'Chợ',
    icon: 'storefront-outline',
  },
  { id: 5, code: mdiCart, text: 'Siêu thị', icon: 'cart' },
  { id: 6, code: mdiWashingMachine, text: 'Giặt là', icon: 'washing-machine' },
  { id: 7, code: mdiPill, text: 'Hàng thuốc', icon: 'pill' },
  {
    id: 8,
    code: mdiGlassMugVariant,
    text: 'Quán nhậu',
    icon: 'glass-mug-variant',
  },
  { id: 9, code: mdiStore, text: 'Tạp hóa', icon: 'store' },
  { id: 10, code: mdiGasStation, text: 'Cây xăng', icon: 'gas-station' },
  {
    id: 11,
    code: mdiMicrophoneSettings,
    text: 'Karaoke',
    icon: 'microphone-settings',
  },
  { id: 12, code: mdiMovieOpen, text: 'Rạp phim', icon: 'movie-open' },
  { id: 13, code: mdiPoliceBadge, text: 'Chốt', icon: 'police-badge' },
  { id: 14, code: mdiBusStop, text: 'Điểm đón xe bus', icon: 'bus-stop' },
  { id: 15, code: mdiCash, text: 'ATM', icon: 'cash' },
  { id: 16, code: mdiBank, text: 'Ngân hàng', icon: 'bank' },
  { id: 17, code: mdiSoccer, text: 'Sân bóng', icon: 'soccer' },
  {
    id: 18,
    code: mdiControllerClassic,
    text: 'Quán net',
    icon: 'controller-classic',
  },
  { id: 19, code: mdiLaptop, text: 'Sửa máy tính', icon: 'laptop' },
  { id: 20, code: mdiSim, text: 'Bể bơi', icon: 'swim' },
  { id: 21, code: mdiWeightLifter, text: 'Gym', icon: 'weight-lifter' },
  { id: 22, code: mdiCoffee, text: 'Quán nước', icon: 'coffee' },
  { id: 23, code: mdiBed, text: 'Nhà nghỉ', icon: 'bed' },
  { id: 24, code: mdiCellphone, text: 'Hàng điện thoại', icon: 'cellphone' },
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
    icon: 'email',
    link: true,
  },
  {
    type: Contact.PHONE,
    name: 'phones',
    text: 'Số điện thoại',
    icon: 'phone-classic',
    link: false,
  },
  {
    type: Contact.ZALO,
    name: 'zalos',
    text: 'Zalo',
    icon: 'phone',
    link: true,
  },
  {
    type: Contact.FACEBOOK,
    name: 'facebooks',
    text: 'Facebook',
    icon: 'facebook',
    link: true,
  },
]

export const FPTLocation = [21.013430248238773, 105.5270750314157]
export const DefaultMapZoom = 18
export enum MARKER_ANIMATION {
  NONE = 0,
  BOUNCE = 1,
  DROP = 2,
}
