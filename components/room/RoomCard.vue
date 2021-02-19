<template>
  <v-card
    elevation="0"
    class="mb-4 room__card"
    :to="`/rooms/${room.id}`"
  >
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="room.imgLink" class="rounded" max-width="100%" />
      </v-col>
      <v-col cols="8" md="6" class="pa-1">
        <h4 class="mb-2">{{ room.title }}</h4>
        <v-row>
          <v-col sm="6" cols="12">
            <v-icon>{{`mdi-${room.type.icon}`}}</v-icon>
            <span>{{ room.type.text }}</span>
          </v-col>
          <v-col sm="6" cols="12">
            <v-icon>mdi-check-circle-outline</v-icon>
            <span v-html="room.availableHtml"></span>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="4" cols="12">
            <v-icon>{{`mdi-${room.gender.icon}`}}</v-icon>
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
            <span>Tạo mới</span>
          </v-col>
          <v-col sm="6" cols="12" v-if="owner">
            <v-icon>mdi-marker-check</v-icon>
            <span>Chờ được duyệt</span>
          </v-col>
          <v-col cols="12" v-else>
            <v-icon>mdi-map-marker</v-icon>
            <span>{{ room.address }}</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="2" cols="4" class="secondary--text text--center">
        <v-layout justify-end >
          <room-verify-icon v-if="room.verify" />
          <v-btn v-if="owner" class="ml-5" outlined rounded color="info">Sửa</v-btn>
          <v-btn v-if="owner" class="ml-5" outlined rounded color="warning">Xóa</v-btn>
          <room-favor-btn class="ml-5" :favorite.sync="favorite" :clickFavor="clickFavor"  v-else />
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
  name: "RoomCard",
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
  @Prop({ required: true }) readonly room!: RoomCardDTO

  private favorite: boolean = false

  public async clickFavor(event: Event) {
    event.preventDefault()
    if (this.favorite) {
      await this.unfavorRoom()
    } else {
      await this.favorRoom()
    }
  }
  
  public async favorRoom() {
    await RoomRepository.favorRoom(this.room.id)
      .then(repos => {
        this.favorite = true
        // this.$notify.showMessage({
        //   message: `Bạn đã thêm ${this.room.title} vào danh sách yêu thích`,
        //   color: SnackbarAction.success,
        // })
      })
  }

  public async unfavorRoom() {
    await RoomRepository.unfavorRoom(this.room.id)
      .then(repos => {
        this.favorite = false
        // this.$notify.showMessage({
        //   message: `Bạn đã bỏ ${this.room.title} vào danh sách yêu thích`,
        //   color: SnackbarAction.error,
        // })
      })
  }
}
</script>