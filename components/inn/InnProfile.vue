<template>
  <section>
    <v-sheet min-height="60vh" rounded="lg" class="pa-3">
      <v-layout justify-space-between class="my-5">
        <h1 class="secondary--text">{{ inn.name }}</h1>
        <div>
          <v-btn rounded outlined color="primary" to="/owner/edit"> Sửa </v-btn>
        </div>
      </v-layout>
      <v-row class="pa-2">
        <v-col cols="12" md="6">
          <images-slide :imgs="inn.imgLinks" />
        </v-col>
        <v-col cols="12" md="6">
          <small-map />
        </v-col>
      </v-row>

      <basic-section
        for-inn
        :electric="inn.electric"
        :water="inn.water"
        :wifi="inn.wifi"
        :address="inn.address"
      />

      <amenitie-section :amenities="inn.amenities" />

      <safety-section :security="inn.security" :open_time="inn.open_time" />
    </v-sheet>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { InnProfileDTO } from '@/constants/app.interface'
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
  @Prop({ type: Object }) readonly inn!: InnProfileDTO
  @Prop({ type: Function }) readonly clickUpdate!: Function
}
</script>
