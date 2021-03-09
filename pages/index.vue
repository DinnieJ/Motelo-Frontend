<template>
  <v-container>
    <section class="white pa-3 rounded">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          class="flex-column justify-content-center align-center pa-8"
        >
          <h1 class="primary--text text-left mb-3 home__title">
            Tìm kiếm chỗ ở
          </h1>
          <p class="text-left mb-3 home__subtitle">
            Chúng tôi luôn tự hào vì giúp đỡ các bạn sinh viên, nhất là các bạn
            sinh viên mới nhập học tìm kiếm chỗ ở bên ngoài khuôn viên của
            trường.
          </p>
          <v-row class="mb-3">
            <v-col cols="6" md="3" class="pa-1">
              <p class="text-center">
                <b>2,734</b>
                <br />
                <i class="home__subtitle">sinh viên K16</i>
              </p>
            </v-col>
            <v-col cols="6" sm="3" class="pa-1">
              <p class="text-center">
                <b>60+</b>
                <br />
                <i class="home__subtitle">nhà trọ</i>
              </p>
            </v-col>
            <v-col cols="6" md="3" class="pa-1">
              <p class="text-center">
                <b>8+</b>
                <br />
                <i class="home__subtitle">CTV review nhà trọ</i>
              </p>
            </v-col>
            <v-col cols="6" sm="3" class="pa-1">
              <p class="text-center">
                <b>10+</b>
                <br />
                <i class="home__subtitle">CTV tư vấn</i>
              </p>
            </v-col>
          </v-row>
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
            v-model="keyword"
            @keyup.enter="search"
          >
            <template v-slot:append>
              <v-btn
                depressed
                icon
                color="primary"
                class="ma-0"
                @click="search"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-img lazy-src="/imgs/6268.jpg" />
        </v-col>
      </v-row>
    </section>

    <section class="white pa-3 mt-1 rounded">
      <v-layout justify-space-between class="mb-4">
        <h1 class="home__header">Bài đăng nhiều ưa thích</h1>
        <v-btn small rounded outlined color="primary" to="/rooms">Thêm</v-btn>
      </v-layout>
      <v-row>
        <v-col
          cols="12"
          sm="4"
          md="3"
          v-for="room in topFavoriteRooms"
          :key="room.id"
        >
          <room-card :room="room" />
        </v-col>
      </v-row>
    </section>
    <section class="white pa-3 mt-1 rounded">
      <v-layout justify-space-between class="mb-4">
        <h1 class="home__header">Bài đăng được xác thực</h1>
        <v-btn small rounded outlined color="primary" to="/rooms">Thêm</v-btn>
      </v-layout>
      <v-row>
        <v-col
          cols="12"
          sm="4"
          md="3"
          v-for="room in verifiedRooms"
          :key="room.id"
        >
          <room-card :room="room" />
        </v-col>
      </v-row>
    </section>
    <section class="white pa-3 mt-1 rounded">
      <v-layout justify-space-between class="mb-4">
        <h1 class="home__header">Bài đăng mới nhất</h1>
        <v-btn small rounded outlined color="primary" to="/rooms">Thêm</v-btn>
      </v-layout>
      <v-row>
        <v-col
          cols="12"
          sm="4"
          md="3"
          v-for="room in newsestRooms"
          :key="room.id"
        >
          <room-card :room="room" />
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RoomCardDTO } from '@/constants/app.interface'

import SuggestResult from '@/components/guest/SuggestResult.vue'
import SuggestList from '@/components/guest/SuggestList.vue'
import HotArea from '@/components/guest/HotArea.vue'
import NewestList from '@/components/guest/NewestList.vue'
import RoomCard from '@/components/room/RoomCard.vue'

import SearchAddress from '@/components/map/SearchAddress.vue'

import RoomRepository from '@/repositories/RoomRepository'

// eslint-disable-next-line no-use-before-define
@Component<TenantHome>({
  name: 'TenantHome',
  // eslint-disable-next-line no-undef
  components: {
    SuggestResult,
    SearchAddress,
    SuggestList,
    HotArea,
    NewestList,
    RoomCard,
  },
  async created() {
    await this.getHomeData()
  },
})
export default class TenantHome extends Vue {
  private suggestRooms: RoomCardDTO[] = []
  private newsestRooms: RoomCardDTO[] = []
  private verifiedRooms: RoomCardDTO[] = []
  private topFavoriteRooms: RoomCardDTO[] = []
  private keyword: string = ''

  public async getHomeData() {
    await Promise.all([
      RoomRepository.getTopVerified(),
      RoomRepository.getLatestRoom(),
      RoomRepository.getTopFavorite(),
    ]).then((response) => {
      this.verifiedRooms = response[0].data.map(
        (item: any) => new RoomCardDTO(item)
      )
      this.newsestRooms = response[1].data.map(
        (item: any) => new RoomCardDTO(item)
      )
      this.topFavoriteRooms = response[2].data.map(
        (item: any) => new RoomCardDTO(item)
      )
    })
  }

  public async search() {
    this.$router.push({
      path: '/rooms',
      query: {
        keyword: this.keyword,
      },
    })
  }
}
</script>
