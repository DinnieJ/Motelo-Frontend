<template>
  <v-container>
    <v-dialog
      v-model="suggestFormDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card light>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Gợi ý</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="suggestFormDialog = false"> bỏ qua </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-stepper v-model="e6" vertical class="home__step">
          <v-stepper-step editable :complete="e6 > 1" step="1">
            Select an app
            <small>Summarize if needed</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 2"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step editable :complete="e6 > 2" step="2">
            Configure analytics for this app
          </v-stepper-step>

          <v-stepper-content step="2">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 3"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step editable :complete="e6 > 3" step="3">
            Select an ad format and name ad unit
          </v-stepper-step>

          <v-stepper-content step="3">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 4"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step editable step="4">
            View setup instructions
          </v-stepper-step>
          <v-stepper-content step="4">
            <v-card
              color="grey lighten-1"
              class="mb-12"
              height="200px"
            ></v-card>
            <v-btn color="primary" @click="e6 = 1"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-card>
    </v-dialog>
    <v-sheet light min-height="100vh" rounded="lg" class="mt-6 pa-3">
      <v-row class="rounded-lg ma-3 home__welcome">
        <v-col sm="1" lg="3" class="d-none d-sm-block"></v-col>
        <v-col cols="12" sm="8" lg="5" class="py-2">
          <p class="white--text">
            <v-layout align-content-center>
              <b class="text-h5 mr-2">Chào mừng tới</b>
              <v-img src="/imgs/logo.png" max-width="137" aspect-ratio="1.77" />
            </v-layout>

            <br />
            Bạn là
            <b class="text-h6 text-decoration-underline">Tân sinh viên</b>,
            <br />
            đang tìm
            <b>
              <v-icon color="white">{{ `mdi-${roomType.icon}` }}</v-icon>
              <span class="text-h6 text-decoration-underline">
                {{ roomType.text }}
              </span> </b
            >,
            <br />
            cho
            <b>
              <v-icon color="white">{{ `mdi-${gender.icon}` }}</v-icon>
              <span class="text-h6 text-decoration-underline">
                {{ gender.text }}
              </span> </b
            >,
            <br />
            sức chứa
            <b class="text-h6 text-decoration-underline">2 - 3 người</b>,
            <br />
            rộng
            <b class="text-h6 text-decoration-underline"
              >Vừa (khoảng 18 - 20 m²)</b
            >,
            <br />
            với các tiện nghi
            <br />

            <b
              v-for="ameenitie in ameenities"
              :key="ameenitie.code"
              class="mr-2"
            >
              <v-icon color="white">{{ `mdi-${ameenitie.icon}` }}</v-icon>
              <span> {{ ameenitie.text }} </span>,
            </b>
          </p>
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
          <v-btn rounded outlined color="primary" to="/posts">Xem thêm</v-btn>
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
          <v-btn rounded outlined color="primary" to="/posts">Xem thêm</v-btn>
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
@Component<Home>({
  name: 'Home',
  // eslint-disable-next-line no-undef
  components: {
    RoomCard,
  },
})
export default class Home extends Vue {
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
    opacity: 0.7;
    & * {
      opacity: 1;
    }
    min-height: 30vh;
  }

  &__step {
    min-height: 95vh;
  }

  &__area {
    min-height: 200px;
    background-repeat: no-repeat;
    background-position: bottom center;
    background-size: cover;
  }
}
</style>
