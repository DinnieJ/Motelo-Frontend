<template>
  <v-card elevation="8" rounded class="room__card">
    <nuxt-link :to="getLink()">
      <v-img
        :lazy-src="loadingImg"
        :src="room.image"
        class="rounded"
        contain
        max-width="100%"
      >
        <v-layout column justify-space-between class="room__img">
          <v-card-actions class="justify-space-between align-start">
            <room-favor-btn
              :favorite.sync="room.favorite"
              :loading.sync="loadingFavorite"
              :clickFavor="clickFavor"
              v-if="isTenant && loggedIn"
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
                @click="clickDelete($event, index)"
              >
                <v-icon small dark> mdi-trash-can-outline </v-icon>
              </v-btn>
            </v-layout>

            <!-- verify btn -->
            <template v-if="isCollaborator">
              <v-btn fab x-small color="primary" :loading="loadingVerify" @click="clickVerify">
                <v-icon small dark> 
                  {{ verify ? 'mdi-shield-home' : 'mdi-shield-plus' }}
                </v-icon>
              </v-btn>
            </template>
            <template v-else>
              <v-btn fab x-small color="primary" v-if="verify">
                <v-icon small dark> mdi-shield-home </v-icon>
              </v-btn>
            </template>
            <!-- end verify btn -->
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
          <span class="font-weight-bold">{{ room.price }}</span>
          <i>tr VND/tháng</i>
        </p>
        <v-row>
          <v-col cols="4" class="pa-1">
            <v-layout column align-center>
              <v-icon>mdi-ruler</v-icon>
              <span class="room__smaller">{{ `${room.area} m²` }}</span>
            </v-layout>
          </v-col>
          <v-col cols="4" class="pa-1">
            <v-layout column align-center>
              <v-icon>{{ `mdi-${room.gender.icon}` }}</v-icon>
              <span class="room__smaller">{{ room.gender.text }}</span>
            </v-layout>
          </v-col>
          <v-col cols="4" class="pa-1">
            <v-layout column align-center>
              <v-icon>mdi-check-circle-outline</v-icon>
              <span class="room__smaller success--text" v-if="room.available">Còn phòng</span>
              <span class="room__smaller warning--text" v-else>Hết phòng</span>
            </v-layout>
          </v-col>
          <v-col cols="12" class="pa-1" v-if="!owner">
            <v-icon>mdi-map-marker</v-icon>
            <span class="room__small">{{ room.address }}</span>
          </v-col>
          <v-col cols="12" class="pa-1" v-if="!owner">
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
import { LOADING_IMG, ROLE } from '@/constants/app.constant'
import { mapGetters } from 'vuex'
import { Getter } from '@/constants/app.vuex'

// eslint-disable-next-line no-use-before-define
@Component<RoomCard>({
  name: 'RoomCard',
  components: {
    RoomVerifyIcon,
    RoomFavorBtn,
  },
  computed: {
    ...mapGetters({
      role: Getter.ROLE,
      isTenant: Getter.IS_TENANT,
      isCollaborator: Getter.IS_COLLABORATOR,
    }),
  },
  created() {
    this.favorite = this.room.favorite
    this.verify = this.room.verify
  },
})
export default class RoomCard extends Vue {
  @Prop({ type: Boolean, default: false }) readonly owner!: boolean
  @Prop({ type: Object, required: true }) readonly room!: any
  @Prop({ type: Function }) readonly clickDelete!: Function
  @Prop({ type: Number }) readonly index!: Number

  private favorite: boolean = false
  private loadingFavorite = false

  private verify: boolean = false
  private loadingVerify: boolean = false

  $notify: any
  private loadingImg: string = LOADING_IMG

  get loggedIn(): boolean {
    return !!this.$store.state.auth.user
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
    if (this.room.favorite) {
      await this.unfavorRoom()
    } else {
      await this.favorRoom()
    }
  }

  public async clickVerify(event: Event) {
    event.preventDefault()
    if (!this.verify) {
      this.verifyRoom();
    }
  }

   public async favorRoom() {
    this.loadingFavorite = true
    await RoomRepository.favorRoom(this.room.id)
      .then((repos) => {
        this.room.favorite = true
        this.$notify.showMessage({
          message: `Bạn đã thêm "${this.room.title}" vào danh sách yêu thích`,
          color: 'success',
        })
      }).catch((error) => {
        console.log(error);
        this.$notify.showMessage({
          message: error.response.data.message,
          color: 'error'
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
        this.room.favorite = false
        this.$notify.showMessage({
          message: `Bạn đã bỏ "${this.room.title}" khỏi danh sách yêu thích`,
          color: 'warning',
        })
      })
      .finally(() => {
        this.loadingFavorite = false
      })
  }

  public async verifyRoom() {
    this.loadingVerify = true
    await RoomRepository.verifyRoom(this.room.id)
      .then((repos) => {
        this.verify = true
        this.$notify.showMessage({
          message: `Bạn đã kiểm chứng "${this.room.title}"`,
          color: 'success',
        })
      }).catch((error) => {
        this.$notify.showMessage({
          message: error.response.data.message,
          color: 'error'
        })
      })
      .finally(() => {
        this.loadingVerify = false
      })
  }
}

</script>
