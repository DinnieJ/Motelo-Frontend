import {
  mdiSilverware,
  mdiSchool,
  mdiHomeCircle,
  mdiInformationVariant,
  mdiParking,
} from '@mdi/js'
const FPTUniverse = [21.013430248238773, 105.5270750314157]
const TuanCuongInn = [21.003044391796315, 105.52083187975794]
const FSchool = [21.01350036318848, 105.5233843033627]
const NgocLanBunBoHue = [21.015398364137933, 105.51908881897234]
// icon for marker
const iconBase =
  'https://developers.google.com/maps/documentation/javascript/examples/full/images/'

export const icons = {
  parking: {
    icon: { path: mdiParking },
  },
  library: {
    icon: iconBase + 'library_maps.png',
  },
  info: {
    icon: { path: mdiInformationVariant },
  },
  restaurant: {
    icon: { path: mdiSilverware },
  },
  school: {
    icon: { path: mdiSchool },
  },
  inn: {
    icon: { path: mdiHomeCircle },
  },
}

export function getIcon(iconName) {
  return icons[iconName].icon
}

// location
export const locations = [
  {
    id: 0,
    position: {
      lat: FPTUniverse[0],
      lng: FPTUniverse[1],
    },
    title: 'FPT Universe',
    icon: icons.school.icon,
    content: '<h1>F P T</h1><p>Trường FPT là trường 3 chữ F P T</p>',
    type: 'Trường học',
  },
  {
    id: 1,
    position: {
      lat: TuanCuongInn[0],
      lng: TuanCuongInn[1],
    },
    title: 'Tuan Cuong inn',
    icon: icons.inn.icon,
    content: 'Đây là nhà trọ Tuấn Cường',
    type: 'Nhà trọ',
  },
  {
    id: 2,
    position: {
      lat: FSchool[0],
      lng: FSchool[1],
    },
    title: 'Fschool',
    icon: icons.school.icon,
    content: 'Đây là FSchool',
    type: 'Trường học, THPT',
  },
  {
    id: 3,
    position: {
      lat: NgocLanBunBoHue[0],
      lng: NgocLanBunBoHue[1],
    },
    title: 'Bún bò Huế Ngọc Lan',
    icon: icons.restaurant.icon,
    content: 'Đây là quán bún pò Huế Ngọc Lan',
    type: 'Quán ăn, Bún Bò',
  },
]
