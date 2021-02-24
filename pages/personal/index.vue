<template>
  <v-container>
    <v-row class="mt-6">
      <v-col cols="12" lg="6" class="pr-3">
        <section v-if="loadingUserInfo"></section>
        <account-profile :userInfo="userInfo" />
      </v-col>
      <v-col cols="12" lg="6">
        <section v-if="loadingRoom"><h1>Loading</h1></section>
        <favourite-list :rooms="roomCardObjs" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RoomCardDTO, UserInfoDTO } from '@/constants/app.interface'
import FavouriteList from '@/components/account/FavouriteList.vue'
import AccountProfile from '@/components/account/AccountProfile.vue'
import PersonalRepository from '@/repositories/PersonalRepository'

@Component<Personal>({
  name: 'Personal',
  // eslint-disable-next-line no-undef
  components: {
    FavouriteList,
    AccountProfile,
  },
})
export default class Personal extends Vue {
  private roomCardObjs: RoomCardDTO[] = []
  private userInfo: UserInfoDTO = {
    name: '',
    email: '',
    zalo: '',
    facebook: '',
    phone: [],
  }
  private loadingRoom: boolean = false
  private loadingUserInfo: boolean = false
  async created() {
    await Promise.all([this.getUserInfo(), this.getFavoriteRoom()])
  }

  public async getFavoriteRoom(): Promise<any> {
    this.loadingRoom = true
    await PersonalRepository.getFavoriteRoom()
      .then((response) => {
        this.roomCardObjs = response.map((item: any) => new RoomCardDTO(item))
      })
      .catch((error) => {
        console.log('getFavoriteRoom', error)
      })
      .finally(() => {
        this.loadingRoom = false
      })
  }

  public async getUserInfo(): Promise<any> {
    this.loadingUserInfo = true
    await PersonalRepository.getUserInfo()
      .then((response) => {
        this.userInfo = response
      })
      .catch((error) => {
        console.log('get user info: ', error)
      })
      .finally(() => {
        this.loadingUserInfo = false
      })
  }
}
</script>
