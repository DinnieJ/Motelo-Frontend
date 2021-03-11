<template>
  <v-container>
    <v-sheet light min-height="100vh" rounded="lg" class="mt-6 pa-3">
      <section>
        <v-row class="rounded-lg justify-center ma-3 home__welcome">
          <v-col cols="12" lg="8" class="py-2">
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
        </v-row>
      </section>

      <section>
        <v-layout justify-space-between class="my-5">
          <h1>Bài đăng được ưa thích</h1>
          <v-btn rounded outlined color="primary" to="/rooms">Xem thêm</v-btn>
        </v-layout>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            v-for="room in topFavoriteRooms"
            :key="room.id"
          >
            <room-card :room="room" />
          </v-col>
        </v-row>
      </section>
      <section>
        <v-layout justify-space-between class="my-5">
          <h1>Bài đăng được xác thực</h1>
          <v-btn rounded outlined color="primary" to="/rooms">Xem thêm</v-btn>
        </v-layout>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            v-for="room in verifiedRooms"
            :key="room.id"
          >
            <room-card :room="room" />
          </v-col>
        </v-row>
      </section>
      <newest-list :rooms="newsestRooms" />
    </v-sheet>
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
    RoomCard
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
