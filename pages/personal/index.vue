<template>
  <v-container>
    <section class="white pa-1 pb-5 mb-6 mt-5 rounded">
      <v-layout class="mb-3" justify-space-between>
        <h1 class="primary--text text-left home__header ml-5 mt-3">Cá nhân</h1>

        <v-btn small rounded outlined color="primary" class="mr-3 mt-3" to="/personal/edit">
          Sửa
        </v-btn>
        <v-btn small rounded outlined color="secondary" class="mr-3 mt-3" to="/change-password">Đổi mật khẩu</v-btn>
      </v-layout>

      <v-row>
        <v-col cols="12" sm="6">
          <v-img
            lazy-src="/imgs/undraw_Mention_re_k5xc.svg"
            contain
            max-height="200px"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          class="flex-column justify-content-center align-center pa-8"
        >
          <div>
            <v-layout align-center class="mb-3">
              <v-icon size="24" class="mr-4">mdi-at</v-icon>
              <span>{{ user.email }}</span>
            </v-layout>
            <v-layout align-center class="mb-3">
              <v-icon size="24" class="mr-4">mdi-account</v-icon>
              <span>{{ user.name }}</span>
            </v-layout>
            <v-layout align-center class="mb-3">
              <v-icon size="24" class="mr-4">mdi-cake</v-icon>
              <span>{{ user.date_of_birth }}</span>
            </v-layout>
            <v-layout align-center class="mb-3">
              <v-icon size="24" class="mr-4">mdi-cellphone-information</v-icon>
              <span>{{ user.phone_number }}</span>
            </v-layout>
          </div>
        </v-col>
      </v-row>
    </section>

    <section class="white pa-1 mt-1 rounded">
      <v-layout justify-space-between class="mb-4">
        <h1 class="secondary--text home__header ml-5 mt-3">Yêu thích</h1>
      </v-layout>
      <v-row class="ma-5">
        <v-col
          v-for="room in roomCardObjs"
          :key="room.id"
          cols="12"
          sm="4"
          md="3"
        >
          <room-card           
            tenant-favorite
            :room="room" 
            @deleteFromList="removeRoomCard" 
          />
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RoomCardDTO } from '@/constants/app.interface'
import RoomRepository from '@/repositories/RoomRepository'
import RoomCard from '@/components/room/RoomCard.vue'
import { mapGetters } from 'vuex'
import { Getter } from '@/constants/app.vuex'

@Component<Personal>({
  name: 'Personal',
  // eslint-disable-next-line no-undef
  components: {
    RoomCard,
  },
  computed: {
    ...mapGetters({
      user: Getter.USER,
    }),
  },
  middleware: ['authenticated', 'isTenant'],
  async fetch() {
    await this.getFavoriteRoom()
  },
})
export default class Personal extends Vue {
  private roomCardObjs: RoomCardDTO[] = []
  private loading: boolean = false

  public async getFavoriteRoom(): Promise<any> {
    this.loading = true
    await RoomRepository.getFavoriteList()
      .then((response) => {
        const rooms: any = response.data.data
        this.roomCardObjs = rooms.map(function (item: any) {
          return new RoomCardDTO(item)
        })
      })
      .catch((error) => {
        console.log('getFavoriteList', error)
      })
      .finally(() => {
        this.loading = false
      })
  }

  public removeRoomCard(id) {
    const index = this.roomCardObjs.map((obj) => obj.id).indexOf(id);
    this.roomCardObjs.splice(index,1);
  } 
}
</script>
