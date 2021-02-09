<template>
  <v-container>
    <v-sheet min-height="60vh" rounded="lg" class="pa-3">
      <v-layout justify-space-between class="my-5">
        <h1>Bài đăng</h1>
        <v-btn rounded outlined color="primary" to="/rooms">Tạo mới</v-btn>
      </v-layout>
      <v-row>
        <v-col cols="12" sm="6" v-for="room in roomCardObjs" :key="room.id">
          <room-card owner :room="room" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RoomCardDTO } from '@/constants/app.interface'
import RoomCard from '@/components/room/RoomCard.vue'

// eslint-disable-next-line no-use-before-define
@Component<OwnerRequests>({
  name: 'OwnerRequests',
  // eslint-disable-next-line no-undef
  layout: 'inhouse',
  components: {
    RoomCard,
  },
})
export default class OwnerRequests extends Vue {
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
          verify: false,
          favorite: false,
          price: 6500000,
        })
      )
    }
  }
}
</script>
