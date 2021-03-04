<template>
  <v-card elevation="0" class="mb-4 room__card">
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="room.imgLink" class="rounded pointer" max-width="100%" @click="clickLink" />
      </v-col>
      <v-col cols="8" md="6" class="pa-1 pointer" @click="clickLink">
        <h4 class="mb-2">{{ room.title }}</h4>
        <v-row>
          <v-col sm="6" cols="12">
            <v-icon>{{ `mdi-${room.type.icon}` }}</v-icon>
            <span>{{ room.type.text }}</span>
          </v-col>
          <v-col sm="6" cols="12">
            <v-icon>mdi-check-circle-outline</v-icon>
            <span v-html="room.availableHtml"></span>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="4" cols="12">
            <v-icon>{{ `mdi-${room.gender.icon}` }}</v-icon>
            <span>{{ room.gender.text }}</span>
          </v-col>
          <v-col sm="4" cols="12">
            <v-icon>mdi-ruler</v-icon>
            <span>{{ room.areaString }}</span>
          </v-col>
          <v-col sm="4" cols="12">
            <v-icon>mdi-account-multiple-check-outline</v-icon>
            <span>{{ room.capacityString }}</span>
          </v-col>
          <v-col sm="6" cols="12" v-if="owner">
            <v-icon>mdi-lead-pencil</v-icon>
            <span>{{ room.requestType }}</span>
          </v-col>
          <v-col sm="6" cols="12" v-if="owner">
            <v-icon>mdi-marker-check</v-icon>
            <span>Chờ được duyệt</span>
          </v-col>
          <v-col cols="12" v-else>
            <v-icon>mdi-map-marker</v-icon>
            <span>{{ room.address }}</span>
          </v-col>
          <v-col cols="12" v-if="!owner">
            <v-icon>mdi-home</v-icon>
            <span>{{ room.inn_name }}</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="2" cols="4" class="secondary--text text--center">
        <v-layout justify-end>
          <room-verify-icon v-if="room.verify" />
          <v-btn v-if="owner" class="ml-5" outlined rounded color="info" :to="`/owner/requests/${room.id}/edit`"
            >Sửa</v-btn
          >
          <v-btn v-if="owner" class="ml-5" outlined rounded color="warning" @click="clickDelete(index)"
            >Xóa</v-btn
          >
          <room-favor-btn
            class="ml-5"
            :favorite.sync="favorite"
            :loading.sync="loadingFavorite"
            :clickFavor="clickFavor"
            v-if="!owner && loggedIn"
          />
        </v-layout>
        <v-layout column align-end justify-center class="mt-5">
          <span class="text-h3 font-weight-bold">{{ room.millionPrice }}</span>
          <span class="caption">{{ room.priceUnit }}</span>
        </v-layout>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { RoomCardDTO } from '@/constants/app.interface'
import RoomFavorBtn from './RoomFavorBtn.vue'
import RoomVerifyIcon from './RoomVerifyIcon.vue'
import RoomRepository from '@/repositories/RoomRepository'

// eslint-disable-next-line no-use-before-define
@Component<RoomCard>({
  name: 'RoomCard',
  components: {
    RoomVerifyIcon,
    RoomFavorBtn,
  },
  created() {
    this.favorite = this.room.favorite
  },
})
export default class RoomCard extends Vue {
  @Prop({ type: Boolean, default: false }) readonly owner!: boolean
  @Prop({ type: Object, required: true }) readonly room!: RoomCardDTO
  @Prop({ type: Function }) readonly clickDelete!: Function
  @Prop({ type: Number }) readonly index!: Number

  private favorite: boolean = false
  private loadingFavorite = false
  $notify: any

  get loggedIn(): boolean {
    return !!this.$store.state.auth.user
  }

  public clickLink() {
    if (this.owner) {
      this.$router.push(`/owner/requests/${this.room.id}`)
    } else {
      this.$router.push(`/rooms/${this.room.id}`)
    }
  }

  public async clickFavor(event: Event) {
    event.preventDefault()
    if (this.favorite) {
      await this.unfavorRoom()
    } else {
      await this.favorRoom()
    }
  }

  public async favorRoom() {
    this.loadingFavorite = true
    await RoomRepository.favorRoom(this.room.id).then((repos) => {
      this.favorite = true
      this.$notify.showMessage({
        message: `Bạn đã thêm "${this.room.title}" vào danh sách yêu thích`,
        color: 'success',
      })
    }).finally(() => {
      this.loadingFavorite = false
    })
  }

  public async unfavorRoom() {
    this.loadingFavorite = true
    await RoomRepository.unfavorRoom(this.room.id).then((repos) => {
      this.favorite = false
      this.$notify.showMessage({
        message: `Bạn đã bỏ "${this.room.title}" vào danh sách yêu thích`,
        color: 'warning',
      })
    }).finally(() => {
      this.loadingFavorite = false
    })
  }
}
</script>