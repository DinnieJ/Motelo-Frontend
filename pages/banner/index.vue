<template>
  <v-container>
    <v-layout d-flex column justify-center align-center class="mt-5">
      <h1 class="display-2 primary--text center-text">Banner quảng cáo</h1>
      <v-btn class="primary mt-5" to="/banner/create"><v-icon left>mdi-plus</v-icon>Tạo mới</v-btn>
      <v-select v-model="status" :items="bannerStatus" item-text="text" item-value="status" @change="getBanners"></v-select>
      <v-row class="mt-5" justify="center">
          <v-col cols="12" lg="5" v-for="banner in banners" :key="banner.id">
            <banner-card :banner="banner" ></banner-card>
          </v-col>
      </v-row>
      <v-pagination
        class="mt-5"
        v-model="page"
        :length="totalPage"
        total-visible="7"
        circle
        @input="getBanners"
      ></v-pagination>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BannerCard from '@/components/collaborator/BannerCard.vue'
import BannerRepository from '@/repositories/BannerRepository'

@Component<Banner>({
  name: 'Banner',
  components: {
      BannerCard
  },

  mounted() {
    this.getBanners()
  },

  middleware: ['checkAuthen', 'isCollaborator']
})
export default class Banner extends Vue {
  private status: number = 1
  private page: number = 1
  private totalPage: number = 1
  private banners: any = []
  private bannerStatus = [
      {
          status: 0,
          text: "Tất cả"
      },
      {
          status: 1,
          text: "Hiện tại",
      },
      {
          status: 2,
          text: "Hết hạn"
      }, 
      {
          status: 3,
          text: "Đang chờ"
      }
  ]

  public async getBanners() {
    await BannerRepository.getBannerList(this.status, this.page).then((response) => {
      this.banners = response.data.data
      this.totalPage = response.data.last_page
    })
  }
}
</script>