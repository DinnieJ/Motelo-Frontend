<template>
  <div>
    <section class="white pa-1 rounded">
      <v-row class="pa-1">
        <v-col cols="12" :sm="forOwner ? 12 : 6">
          <images-slide :imgs="room.imgLinks" />
        </v-col>
        <v-col cols="12" sm="6" v-if="!forOwner">
          <small-map />
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

          <p class="small my-3">
            Ngày đăng: <i>{{ room.accept_date }}</i>
          </p>

          <room-verify-section v-if="room.verify" />

          <basic-section
            :price="room.price"
            :area="room.area"
            :eservation_fee="room.eservation_fee"
            :electric="room.inn.electric"
            :water="room.water"
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
import {
  RoomDetailDTO,
  CommentDTO,
} from '@/constants/app.interface'

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
}
</script>
