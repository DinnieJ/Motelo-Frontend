<template>
     <v-row>
      <v-col>
        <v-sheet light rounded="lg" min-height="40vh" class="mt-6">
          <v-row class="pa-2">
            <v-col cols="12" lg="6">
              <images-slide />
            </v-col>
            <v-col cols="12" lg="6">
              <small-map />
            </v-col>
          </v-row>
        </v-sheet>

        <v-row>
          <v-col cols="12" lg="7">
            <v-sheet light rounded="lg" class="mt-6 pa-2">
              <room-title-section :breadcrumbs="breadcrumbLinks" />

              <room-verify-section />

              <basic-section />

              <amenitie-section :amenities="amenities" />

              <safety-section />

              <room-description-section />
            </v-sheet>
          </v-col>
          <v-col cols="12" lg="5" class="pr-2">
            <v-sheet light rounded="lg" class="mt-6 pa-2">
              <v-layout justify-center>
                <p class="title">Ngày đăng: <span>23/12/2020</span></p>
              </v-layout>

              <room-owner-section class="pa-2" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BreadcrumbLink } from '@/constants/app.interface'

import SmallMap from '@/components/map/SmallMap.vue'

import ImagesSlide from '@/components/common/ImagesSlide.vue'
import BasicSection from '@/components/common/BasicSection.vue'
import AmenitieSection from '@/components/common/AmenitieSection.vue'
import SafetySection from '@/components/common/SafetySection.vue'

import RoomVerifySection from '@/components/room/RoomVerifySection.vue'
import RoomTitleSection from '@/components/room/RoomTitleSection.vue'
import RoomDescriptionSection from '@/components/room/RoomDescriptionSection.vue'
import RoomOwnerSection from '@/components/room/RoomOwnerSection.vue'



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
  },
})
export default class RoomDetailContainer extends Vue {
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

  private amenities: string[] = [
    'wifi',
    'toilet',
    'air_conditioner',
    'parking',
    'independence',
    'washing_machine',
    'cabinet',
    'fridge',
    'kitchen',
    'heater',
    'pet',
  ]
}
</script>
