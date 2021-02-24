<template>
  <v-container>
    <v-sheet light min-height="100vh" rounded="lg" class="mt-6 pa-3">
      <section>
        <v-row class="rounded-lg justify-center ma-3 home__welcome">
          <v-col cols="12" lg="8" class="py-2">
            <v-card class="pa-3">
              <v-layout justify-center align-end>
                <p class="text-h5 mr-3 primary--text"><b>Chào mừng bạn</b></p>
              </v-layout>
              <suggest-result />
            </v-card>

            <search-address />
          </v-col>
        </v-row>
      </section>

      <suggest-list :rooms="suggestRooms" />
      <hot-area />
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
  },
  async created() {
    await this.getHomeData()
  },
})
export default class TenantHome extends Vue {
  private suggestRooms: RoomCardDTO[] = []
  private newsestRooms: RoomCardDTO[] = []

  public async getHomeData() {
     await RoomRepository.getGuestHomepage()
      .then(repos => {
        this.suggestRooms = repos.suggest.map((item: any) => new RoomCardDTO(item))
        this.newsestRooms = repos.newest.map((item: any) => new RoomCardDTO(item))
      })
  }
}
</script>
