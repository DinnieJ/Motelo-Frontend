<template>
  <v-row>
    <v-col>
      <v-sheet light rounded="lg" min-height="40vh" class="mt-6">
        <v-row class="pa-2">
          <v-col cols="12" lg="6">
            <images-slide :imgs="room.imgLinks" />
          </v-col>
          <v-col cols="12" lg="6">
            <small-map />
          </v-col>
        </v-row>
      </v-sheet>

      <v-row>
        <v-col cols="12" lg="7">
          <v-sheet light rounded="lg" class="mt-6 pa-2">
            <room-title-section
              :breadcrumbs="breadcrumbLinks"
              :favorite.sync="asyncFavorite"
              :clickFavor="clickFavor"
              :title="room.title"
            />

            <room-verify-section v-if="room.verify" />

            <basic-section
              :price="room.price"
              :area="room.area"
              :eservation_fee="room.eservation_fee"
              :electric="room.electric"
              :water="room.water"
              :wifi="room.wifi"
              :capacity="room.capacity"
              :gender="room.gender.text"
              :available="room.available"
              :inn_name="room.inn_name"
              :address="room.address"
            />

            <amenitie-section :amenities="room.amenities" />

            <safety-section
              :security="room.security"
              :open_time="room.open_time"
            />

            <room-description-section :description="room.description" />
          </v-sheet>
        </v-col>
        <v-col cols="12" lg="5" class="pr-2">
          <v-sheet light rounded="lg" class="mt-6 pa-2">
            <v-layout justify-center>
              <p class="title">
                Ngày đăng: <span>{{ room.accept_date }}</span>
              </p>
            </v-layout>

            <room-owner-section 
              class="pa-2" 
              :name="room.owner.name"
              :phones="room.owner.phones"
              :facebook="room.owner.facebook"
              :zalo="room.owner.zalo"
            />

            <room-comment-section
              :comments.sync="asyncComments"
              :addComment="addComment"
            />
          </v-sheet>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
import { BreadcrumbLink, RoomDetailDTO, CommentDTO } from '@/constants/app.interface'

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

  private breadcrumbLinks: BreadcrumbLink[] = [
    {
      text: 'Hà Nội',
      disabled: false,
      href: 'breadcrumbs_dashboard',
    },
    {
      text: 'Tây Hồ',
      disabled: true,
      href: 'breadcrumbs_link_1',
    },
  ]
}
</script>
