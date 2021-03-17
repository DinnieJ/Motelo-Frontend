<template>
  <v-card elevation="8" rounded class="room__card">
    <nuxt-link :to="getLink()">
      <v-img
        :lazy-src="loadingImg"
        :src="room.imgLink"
        class="rounded"
        contain
        max-width="100%"
      >
        <v-layout column justify-space-between class="room__img">
          <v-card-actions class="justify-space-between align-start">
            <room-favor-btn
              :favorite.sync="room.favorited"
              :loading.sync="loadingFavorite"
              :clickFavor="clickFavor"
              v-if="!owner && loggedIn"
            />

            <v-layout column v-if="owner">
              <v-btn
                fab
                x-small
                color="info"
                class="mb-2"
                :to="`/owner/requests/${room.id}/edit`"
              >
                <v-icon small dark> mdi-cog </v-icon>
              </v-btn>
              <v-btn
                fab
                x-small
                color="warning"
                @click="clickDelete(index)"
              >
                <v-icon small dark> mdi-trash-can-outline </v-icon>
              </v-btn>
            </v-layout>

            <v-btn fab x-small color="primary" v-if="room.verify">
              <v-icon small dark> mdi-shield-home </v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-subtitle class="pa-0 ml-3">
            <v-btn x-small depressed class="mb-2">
              <v-icon x-small>{{ `mdi-${room.type.icon}` }}</v-icon>
              <span>{{ room.type.text }}</span>
            </v-btn>
          </v-card-subtitle>
        </v-layout>
      </v-img>
      <v-card-title class="pa-2">
        <p class="ma-0 room__title">
          {{ room.title }}
        </p>
      </v-card-title>
      <v-card-text class="mb-2">
        <p class="text-center secondary--text">
          <span class="font-weight-bold">{{ room.millionPrice }}</span>
          <i>{{ room.priceUnit }}</i>
        </p>
        <v-row>
          <v-col cols="4" class="pa-1">
            <v-layout column align-center>
              <v-icon>mdi-ruler</v-icon>
              <span class="room__smaller">{{ room.areaString }}</span>
            </v-layout>
          </v-col>
          <v-col cols="4" class="pa-1">
            <v-layout column align-center>
              <v-icon>{{ `mdi-${room.gender.icon}` }}</v-icon>
              <span class="room__smaller">{{ room.capacityString }}</span>
            </v-layout>
          </v-col>
          <v-col cols="4" class="pa-1">
            <v-layout column align-center>
              <v-icon>mdi-check-circle-outline</v-icon>
              <span class="room__smaller" v-html="room.availableHtml"></span>
            </v-layout>
          </v-col>
          <v-col cols="12" class="pa-1">
            <v-icon>mdi-map-marker</v-icon>
            <span class="room__small">{{ room.address }}</span>
          </v-col>
          <v-col cols="12" class="pa-1">
            <v-icon>mdi-home</v-icon>
            <span class="room__smaller">{{ room.inn_name }}</span>
          </v-col>
        </v-row>
      </v-card-text>
    </nuxt-link>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { RoomCardDTO } from '@/constants/app.interface'
import RoomFavorBtn from './RoomFavorBtn.vue'
import RoomVerifyIcon from './RoomVerifyIcon.vue'
import RoomRepository from '@/repositories/RoomRepository'
import { LOADING_IMG } from '@/constants/app.constant'

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
  private loadingImg: string = LOADING_IMG

  get loggedIn(): boolean {
    return !!this.$store.state.auth.user
  }

  public shortTitle(): string {
    const title: string = this.room.title

    if (title.length > 35) {
      return title.substring(0, 35) + '...'
    }

    return title
  }

  public getLink(): string {
    if (this.owner) {
      return `/owner/requests/${this.room.id}`
    } else {
      return `/rooms/${this.room.id}`
    }
  }

  public async clickFavor(event: Event) {
    event.preventDefault()
    if (this.room.favorited) {
      await this.unfavorRoom()
    } else {
      await this.favorRoom()
    }
  }

  public async favorRoom() {
    this.loadingFavorite = true
    await RoomRepository.favorRoom(this.room.id)
      .then((repos) => {
        this.room.favorited = true
        this.$notify.showMessage({
          message: `Bạn đã thêm "${this.room.title}" vào danh sách yêu thích`,
          color: 'success',
        })
      })
      .finally(() => {
        this.loadingFavorite = false
      })
  }

  public async unfavorRoom() {
    this.loadingFavorite = true
    await RoomRepository.unfavorRoom(this.room.id)
      .then((repos) => {
        this.room.favorited = false
        this.$notify.showMessage({
          message: `Bạn đã bỏ "${this.room.title}" vào danh sách yêu thích`,
          color: 'warning',
        })
      })
      .finally(() => {
        this.loadingFavorite = false
      })
  }
}
</script>