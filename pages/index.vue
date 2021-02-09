<template>
  <v-container>
    <v-sheet light min-height="100vh" rounded="lg" class="mt-6 pa-3">
      <v-row class="rounded-lg justify-center ma-3 home__welcome">
        <v-col cols="12" lg="8" class="py-2">
          <v-card class="pa-3">
            <v-layout justify-center align-end>
              <p class="text-h5 mr-3 primary--text"><b>Chào mừng bạn</b></p>
            </v-layout>
            <table>
              <tbody>
                <tr>
                  <td width="50">Bạn là</td>
                  <td>
                    <b class="text-h6"> Tân sinh viên </b>
                  </td>
                </tr>
                <tr>
                  <td width="50">đang tìm</td>
                  <td>
                    <b>
                      <v-icon>{{ `mdi-${roomType.icon}` }}</v-icon>
                      <span class="text-h6">
                        {{ roomType.text }}
                      </span>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td width="50">cho</td>
                  <td>
                    <b>
                      <v-icon>{{ `mdi-${gender.icon}` }}</v-icon>
                      <span class="text-h6">
                        {{ gender.text }}
                      </span>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td width="50">sức chứa</td>
                  <td>
                    <b class="text-h6">2 - 3 người</b>
                  </td>
                </tr>
                <tr>
                  <td width="50">rộng</td>
                  <td>
                    <b class="text-h6">Vừa (khoảng 18 - 20 m²)</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              với các tiện nghi
              <br />

              <b
                v-for="ameenitie in ameenities"
                :key="ameenitie.code"
                class="mr-2"
              >
                <v-icon>{{ `mdi-${ameenitie.icon}` }}</v-icon>
                <span> {{ ameenitie.text }} </span>,
              </b>
            </p>
          </v-card>

          <v-text-field
            dense
            solo
            hide-details
            placeholder="Search"
            rounded
            append-icon="mdi-magnify"
            class="my-3"
            clearable
            color="primary"
          ></v-text-field>
        </v-col>
      </v-row>
      <div>
        <v-layout justify-space-between class="my-5">
          <h1>Gợi ý cho bạn</h1>
          <v-btn rounded outlined color="primary" to="/rooms">Xem thêm</v-btn>
        </v-layout>
        <v-row>
          <v-col cols="12" sm="6" v-for="room in roomCardObjs" :key="room.id">
            <room-card :room="room" />
          </v-col>
        </v-row>
      </div>
      <div>
        <v-layout justify-space-between class="my-5">
          <h1>Khu vực <span class="warning--text">HOT</span></h1>
        </v-layout>
        <v-row>
          <v-col cols="6" sm="4" lg="2" v-for="i in 6" :key="i" class="pa-4">
            <v-layout
              column
              justify-end
              align-center
              class="rounded-xl shadow home__area"
              :style="{ 'background-image': `url('/imgs/anh_room.jpg')` }"
            >
              <h2 class="white--text">{{ `thôn ${i}` }}</h2>
            </v-layout>
          </v-col>
        </v-row>
      </div>
      <div>
        <v-layout justify-space-between class="my-5">
          <h1>Bài đăng mới nhất</h1>
          <v-btn rounded outlined color="primary" to="/rooms">Xem thêm</v-btn>
        </v-layout>
        <v-row>
          <v-col cols="12" sm="6" v-for="room in roomCardObjs" :key="room.id">
            <room-card :room="room" />
          </v-col>
        </v-row>
      </div>
    </v-sheet>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TextIcon, RoomCardDTO } from '@/constants/app.interface'
import { AMEENITIES, GENDER, ROOM_TYPES } from '@/constants/app.constant'
import RoomCard from '@/components/room/RoomCard.vue'

// eslint-disable-next-line no-use-before-define
@Component<TenantHome>({
  name: 'TenantHome',
  // eslint-disable-next-line no-undef
  components: {
    RoomCard,
  },
})
export default class TenantHome extends Vue {
  private suggestFormDialog: boolean = true
  private ameenities: TextIcon[] = AMEENITIES
  private gender: TextIcon = GENDER[0]
  private roomType: TextIcon = ROOM_TYPES[0]
  private roomCardObjs: RoomCardDTO[] = []

  private e6: any = null

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

<style lang="scss">
.home {
  &__welcome {
    background-image: url('/imgs/anh_homepage.jpg');
    background-repeat: no-repeat;
    background-position: bottom center;
    background-size: cover;
    min-height: 30vh;
  }

  &__title {
    max-width: 20%;
  }

  &__area {
    min-height: 200px;
    background-repeat: no-repeat;
    background-position: bottom center;
    background-size: cover;
  }
}
</style>
