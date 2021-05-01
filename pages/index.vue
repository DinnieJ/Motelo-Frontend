<template>
  <div class="pa-0 ma-0">
    <section>
      <v-carousel
        :show-arrows="false"
        delimiter-icon="mdi-minus"
        cycle
        height="100%"
      >
        <v-carousel-item
          v-for="(item, i) in banners"
          :key="i"
          :href="item.src"
          target="_blank"
          :src="item.img"
        >
        </v-carousel-item>
      </v-carousel>
    </section>
    <v-container>
      <section class="white pa-3 mt-3 rounded search-block">
        <v-row>
          <v-col
            cols="12"
            class="flex-column justify-content-center align-center pa-8"
          >
            <h1 class="primary--text text-center mb-3 home__title">
              Tìm kiếm chỗ ở
            </h1>
            <p class="text-center mb-3 text-h6 white--text">
              Chúng tôi luôn tự hào vì giúp đỡ các bạn sinh viên, nhất là các bạn
              sinh viên mới nhập học tìm kiếm chỗ ở bên ngoài khuôn viên của
              trường.
            </p>
            <v-row class="mb-3 mt-2">
              <v-col cols="12" sm="6" md="3" class="pa-1">
                <v-layout
                  class="d-flex justify-center column align-center pa-3 info-block"
                  elevation-4
                  fill-height
                >
                  <v-icon x-large color="primary" class="justify-center mt-5"
                    >mdi-emoticon-happy-outline</v-icon
                  >
                  <h3>2,734</h3>
                  <p>sinh viên K16</p>
                  <p class="text-center">
                    Được hỗ trợ tìm kiếm nơi ở xung quanh khu vực đại học FPT Hòa
                    Lạc
                  </p>
                </v-layout>
              </v-col>
              <v-col cols="12" sm="6" md="3" class="pa-1">
                <v-layout
                  class="d-flex justify-center column align-center pa-3 info-block"
                  elevation-4
                  fill-height
                >
                  <v-icon x-large color="primary" class="justify-center mt-5"
                    >mdi-home-outline</v-icon
                  >
                  <h3>60+</h3>
                  <p>Nhà trọ</p>
                  <p class="text-center">
                    Được kiểm chứng bởi những cộng tác viên hỗ trợ sinh viên của
                    trường
                  </p>
                </v-layout>
              </v-col>
              <v-col cols="12" sm="6" md="3" class="pa-1">
                <v-layout
                  class="d-flex justify-center column align-center pa-3 info-block"
                  fill-height
                  elevation-4
                >
                  <v-icon x-large color="primary" class="justify-center mt-5"
                    >mdi-shield-account-outline</v-icon
                  >
                  <h3>8+</h3>
                  <p>CTV review nhà trọ</p>
                  <p class="text-center">
                    Luôn sẵn sàng tìm kiếm và kiểm chứng hệ thống để thông tin
                    được xác thực chính xác nhất
                  </p>
                </v-layout>
              </v-col>
              <v-col cols="12" sm="6" md="3" class="pa-1">
                <v-layout
                  class="d-flex justify-center column align-center pa-3 info-block"
                  elevation-4
                  fill-height
                >
                  <v-icon x-large color="primary" class="justify-center mt-5"
                    >mdi-message-text-outline</v-icon
                  >
                  <h3>10+</h3>
                  <p>CTV tư vấn</p>
                  <p class="text-center">
                    Luôn có mặt để hỗ trợ sinh viên mới trong quá trình tìm nhà ở
                  </p>
                </v-layout>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="10" offset="1">
                <v-text-field
                  dense
                  solo
                  hide-details
                  height="50"
                  placeholder="Tìm kiếm"
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
          </v-col>
        </v-row>
      </section>

      <section class="white pa-3 mt-1 rounded">
        <v-layout justify-space-between class="d-flex mb-4">
          <h1 class="home__header ml-5"><v-icon color="secondary" left large>mdi-heart</v-icon>Phòng được ưa thích</h1>
          <v-btn width="100" rounded outlined color="primary" to="/rooms"
            >Thêm</v-btn
          >
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
          <h1 class="home__header ml-5"><v-icon color="blue" large left>mdi-shield</v-icon>Phòng được xác thực</h1>
          <v-btn width="100" rounded outlined color="primary" to="/rooms"
            >Thêm</v-btn
          >
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
          <h1 class="home__header ml-5"><v-icon left large color="success">mdi-new-box</v-icon>Phòng mới nhất</h1>
          <v-btn width="100" rounded outlined color="primary" to="/rooms"
            >Thêm</v-btn
          >
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
  </div>
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
import BannerRepository from '@/repositories/BannerRepository'
import { LOADING_IMG } from '@/constants/app.constant'
import { MutationState } from '~/constants/app.vuex'

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
  private loadingImg: string = LOADING_IMG
  private banners: any = []
  private carouselDefault: any = [
    {
      src: 'https://facebook.com',
      img:
        'https://i2.wp.com/hanoi.fpt.edu.vn/wp-content/uploads/2021/01/Quy-chế1900x900.png?fit=1900%2C900&ssl=1',
    },
    {
      src: 'https://google.com',
      img:
        'https://i0.wp.com/hanoi.fpt.edu.vn/wp-content/uploads/2021/01/Banner_web-01.jpg?fit=1900%2C900&ssl=1',
    },
  ]

  public async getHomeData() {
    await Promise.all([
      RoomRepository.getTopVerified(),
      RoomRepository.getLatestRoom(),
      RoomRepository.getTopFavorite(),
      BannerRepository.getHomepageBanner(),
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

      if (response[3].data.length <= 2) {
        this.banners = response[3].data.map((item: any) => ({
          src: item.url,
          img: item.image,
        }))
        this.banners = this.banners.concat(this.carouselDefault)
      }
    })
  }

  public async search() {
    this.$store.commit(MutationState.SET_KEYWORD, this.keyword)
    this.$router.push({
      path: '/rooms',
    })
  }
}
</script>
<style lang="scss">
.search-block {
  background-image: url("/imgs/anh_homepage.jpg");
  background-position: center center;
  background-size: cover;
  background-color: #FFFFFF;
}

.info-block {
  background-color: #FFFFFF;
}
</style>
