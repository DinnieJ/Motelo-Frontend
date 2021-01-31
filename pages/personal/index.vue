<template>
  <v-container>
    <v-row class="mt-6">
      <v-col cols="12" lg="6" class="pr-3">
        <account-profile />
      </v-col>
      <v-col cols="12" lg="6">
        <favourite-list :rooms="roomCardObjs" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RoomCardDTO } from '@/constants/app.interface'
import FavouriteList from '@/components/account/FavouriteList.vue'
import AccountProfile from '@/components/account/AccountProfile.vue'

@Component<Personal>({
  name: 'Personal',
  // eslint-disable-next-line no-undef
  components: {
    FavouriteList,
    AccountProfile,
  },
})
export default class Personal extends Vue {
  private roomCardObjs: RoomCardDTO[] = []

  created() {
    for (let i = 0; i < 4; i++) {
      this.roomCardObjs.push(
        new RoomCardDTO({
          id: `${i}`,
          img: '/imgs/anh_room.jpg',
          title: 'Phòng cho thuê Võng thị, Quận Tây Hồ',
          type: 'room',
          available: true,
          gender: 'both',
          area: 40,
          capacity_min: 2,
          capacity_max: 3,
          address: '26 Võng thị, Phường Bưởi, Quận Tây Hồ, Hà Nội',
          verify: true,
          favorite: false,
          price: 6500000,
        })
      )
    }
  }
}
</script>
