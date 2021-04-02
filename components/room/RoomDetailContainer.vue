<template>
  <div>
    <section class="white pa-1 rounded">
      <v-row class="pa-1">
        <v-col cols="12" :sm="forOwner ? 12 : 6">
          <images-slide :imgs="roomImages" />
        </v-col>
        <v-col cols="12" sm="6" v-if="!forOwner">
          <small-map :center="room.inn.position" />
        </v-col>
      </v-row>
    </section>

    <v-row class="mt-3">
      <v-col cols="12" :lg="forOwner ? 12 : 7" class="pt-0">
        <section class="white pa-1 rounded">
          <room-title-section
            :favorite.sync="asyncFavorite"
            :clickFavor="clickFavor"
            :title="room.title"
            :forOwner="forOwner"
            :clickDelete="clickDelete"
            :roomId="room.id"
          />

          <p class="small pl-5 my-3">
            Ngày đăng: <i>{{ room.accept_date }}</i>
          </p>

          <!-- verify btn -->
          <template v-if="isCollaborator">
            <v-btn color="primary" large @click="clickVerify">
              <v-icon dark large left class="mr-4">
                {{ asyncVerify ? 'mdi-shield-home' : 'mdi-shield-plus' }}
              </v-icon>
              {{ asyncVerify ? 'Đã kiểm chứng' : 'Chưa kiểm chứng' }}
            </v-btn>
          </template>
          <template v-else>
            <v-card rounded="lg" class="pa-2" v-if="asyncVerify">
              <v-layout d-flex align-center>
                <v-icon class="mr-4" size="48" color="primary" dark>
                  mdi-shield-home
                </v-icon>
                <h1 class="subtitle-1">
                  Cộng tác viên của
                  <span class="primary--text"> Motelo </span> đích thân đi xác
                  thực về chất lượng phòng và độ tin cậy của chủ phòng.
                </h1>
              </v-layout>
            </v-card>
          </template>
          <!-- end verify btn -->

          <basic-section
            :price="room.price"
            :area="room.area"
            :eservation_fee="room.eservation_fee"
            :electric="room.inn.electric"
            :water="room.inn.water"
            :wifi="room.inn.wifi"
            :capacity="room.capacity"
            :gender="room.gender.text"
            :available="room.available"
            :inn_name="room.inn.name"
            :address="room.inn.address"
          />

          <amenitie-section :amenities="room.inn.amenities" />

          <safety-section
            :security="room.inn.security"
            :open_time="room.inn.open_time"
          />

          <room-description-section :description="room.description" />
        </section>
      </v-col>
      <v-col cols="12" lg="5" class="pt-0" v-if="!forOwner">
        <section class="white pa-1 rounded">
          <room-owner-section class="pa-2" :owner="room.inn.owner" />

          <room-comment-section
            :comments.sync="asyncComments"
            :addComment="addComment"
            :editComment="editComment"
            :deleteComment="deleteComment"
          />
        </section>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
import { RoomDetailDTO, CommentDTO } from '@/constants/app.interface'

import SmallMap from '@/components/map/SmallMap.vue'

import ImagesSlide from '@/components/common/ImagesSlide.vue'
import BasicSection from '@/components/common/BasicSection.vue'
import AmenitieSection from '@/components/common/AmenitieSection.vue'
import SafetySection from '@/components/common/SafetySection.vue'

import RoomVerifySection from '@/components/room/RoomVerifySection.vue'
import RoomTitleSection from '@/components/room/RoomTitleSection.vue'
import RoomDescriptionSection from '@/components/room/RoomDescriptionSection.vue'
import RoomOwnerSection from '@/components/room/RoomOwnerSection.vue'
import RoomCommentSection from '@/components/room/RoomCommentSection.vue'

import { ROLE } from '@/constants/app.constant'
import { mapGetters } from 'vuex'
import { Getter } from '@/constants/app.vuex'

// eslint-disable-next-line no-use-before-define
@Component<RoomDetailContainer>({
  name: 'RoomDetailContainer',
  components: {
    ImagesSlide,
    SmallMap,
    RoomVerifySection,
    BasicSection,
    AmenitieSection,
    SafetySection,
    RoomTitleSection,
    RoomDescriptionSection,
    RoomOwnerSection,
    RoomCommentSection,
  },
  computed: {
    ...mapGetters({
      role: Getter.ROLE,
      isCollaborator: Getter.IS_COLLABORATOR,
    }),
  },
})
export default class RoomDetailContainer extends Vue {
  @Prop({ type: Object, required: true }) readonly room!: RoomDetailDTO
  @Prop({ type: Function }) readonly clickFavor!: Function
  @PropSync('favorite') readonly asyncFavorite!: boolean
  @Prop({ type: Function }) readonly editComment!: Function
  @Prop({ type: Function }) readonly deleteComment!: Function
  @Prop({ type: Function }) readonly addComment!: Function
  @PropSync('comments') readonly asyncComments!: CommentDTO[]
  @Prop({ type: Boolean, default: false }) readonly forOwner!: boolean
  @Prop({ type: Function }) readonly clickDelete!: Function

  @Prop({ type: Function }) readonly clickVerify!: Function
  @PropSync('verify') readonly asyncVerify!: boolean

  get roomImages() {
    return this.room.images.map((item) => item.image_url)
  }
}
</script>
