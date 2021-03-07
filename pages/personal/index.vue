<template>
  <v-container>
    <v-row class="mt-6">
      <v-col cols="12" lg="6" class="pr-3">
        <section v-if="loading"></section>
        <account-profile :userInfo="user" />
      </v-col>
      <v-col cols="12" lg="6">
        <section v-if="loading"><h1>Loading</h1></section>
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
import RoomRepository from '@/repositories/RoomRepository'
import { mapGetters } from 'vuex'
import { Getter } from '@/constants/app.vuex'

@Component<Personal>({
  name: 'Personal',
  // eslint-disable-next-line no-undef
  components: {
    FavouriteList,
    AccountProfile,
  },
  computed: {
    ...mapGetters({
      user: Getter.USER,
    }),
  },
  middleware: ['authenticated', 'isTenant'],
  async fetch() {
    await this.getFavoriteRoom()
  }
})
export default class Personal extends Vue {
  private roomCardObjs: RoomCardDTO[] = []
  private loading: boolean = false

  public async getFavoriteRoom(): Promise<any> {
    this.loading = true
    await RoomRepository.getFavoriteList()
      .then((response) => {
        let rooms: any = response.data.favorite_rooms
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
}
</script>
