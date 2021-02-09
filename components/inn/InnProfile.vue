<template>
  <v-sheet min-height="60vh" rounded="lg" class="pa-3">
    <v-layout justify-space-between class="my-5">
      <h1 class="secondary--text">Nhà trọ Minh Tuấn</h1>
      <div>
        <v-btn rounded outlined color="primary"> Sửa </v-btn>
      </div>
    </v-layout>
    <v-row class="pa-2">
      <v-col cols="12" md="6">
        <images-slide />
      </v-col>
      <v-col cols="12" md="6">
        <small-map />   
      </v-col>
    </v-row>

    <basic-section for-inn />

    <amenitie-section :amenities="amenities" />

    <safety-section />
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ImagesSlide from '@/components/common/ImagesSlide.vue'
import SmallMap from '@/components/map/SmallMap.vue'
import BasicSection from '@/components/common/BasicSection.vue'
import AmenitieSection from '@/components/common/AmenitieSection.vue'
import SafetySection from '@/components/common/SafetySection.vue'


@Component<InnProfile>({
  name: 'InnProfile',
  // eslint-disable-next-line no-undef
  components: {
    ImagesSlide,
    SmallMap,
    BasicSection,
    AmenitieSection,
    SafetySection,
  },
})
export default class InnProfile extends Vue {
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
