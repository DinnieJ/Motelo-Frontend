<template>
  <section>
    <div class="map__big">
      <!-- This for google map -->
      <gmap-map
        :center="center"
        :zoom="zoom"
        :options="mapOptions"
        class="map__container"
      >
        <template v-for="marker in markers.concat(inns)">
          <gmap-marker
            :key="marker.id"
            :position="marker.position"
            :icon="{
              path: pinIcon,
              fillColor: marker.id === currentMarker.id ? '#ec655d' : '#5591f4',
              fillOpacity: 1,
              scale: 1.5,
              strokeColor: '#FFFFFF',
              strokeOpacity: 0,
              strokeWeight: 0,
            }"
          ></gmap-marker>
          <gmap-marker
            :position="marker.position"
            :key="`marker-${marker.id}`"
            :icon="{
              path: marker.type.code,
              fillColor: '#FFFFFF',
              fillOpacity: 1,
              anchor: {x: -6.5, y: -7},
              strokeOpacity: 0,
              strokeWeight: 0,
            }"
            @click="clickMarker(marker)"
          ></gmap-marker>
        </template>
      </gmap-map>

      <!-- inn marker info -->
      <div v-if="showBottom" class="white rounded-t pt-3 map__bottom">
        <v-row>
          <v-col cols="6" class="pa-1">
            <v-img
              :lazy-src="loadingImg"
              :src="currentMarker.img"
              width="100%"
              height="100%"
              class="rounded"
            >
            </v-img>
          </v-col>
          <v-col cols="6" class="pa-1 pr-4">
            <template>
              <v-layout justify-space-between>
                <v-btn x-small outlined>
                  <v-icon x-small>{{
                    `mdi-${currentMarker.type.icon}`
                  }}</v-icon>
                  <span>{{ currentMarker.type.text }}</span>
                </v-btn>
                <v-btn x-small color="secondary" text icon @click="closeBottom">
                  <v-icon small>mdi-close-circle</v-icon>
                </v-btn>
              </v-layout>

              <h1 class="ma-0 map__title mobile">
                {{ currentMarker.name }}
              </h1>
              <a
                :href="`http://maps.google.com?q=${currentMarker.position.lat},${currentMarker.position.lng}`"
                target="_blank"
                class="text-decoration-underline room__smaller"
              >
                <i>Xem thêm trên Google Map</i>
              </a>
              <p class="room__small map__overflow">
                {{ currentMarker.description }}
              </p>
            </template>
          </v-col>
        </v-row>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  LOADING_IMG,
  DefaultMapZoom,
  FPTLocation,
} from '@/constants/app.constant'
import UtilityRepository from '~/repositories/UtilityRepository'
import { MarkerDTO } from '~/constants/app.interface'

import { gmapApi } from 'vue2-google-maps'
import { mdiCircle } from '@mdi/js'

@Component<BigMap>({
  name: 'BigMap',
  // eslint-disable-next-line no-undef
  async created() { 
    this.getAllMarker()
  },
})
export default class BigMap extends Vue {
  @Prop() readonly inns!: any
  private center: any = { lat: FPTLocation[0], lng: FPTLocation[1] }
  private zoom: number = DefaultMapZoom
  private mapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    disableDefaultUi: false,
  }

  private markers: MarkerDTO[] = []

  private currentMarker = new MarkerDTO()

  private showBottom: boolean = false
  private loadingImg = LOADING_IMG

  private pinIcon = mdiCircle

  public async getAllMarker() {
    await UtilityRepository.getAllUtilities().then((response) => {
      const markers = response.data
      this.markers = markers.map(function (marker: any) {
        return new MarkerDTO(marker)
      })
    })
  }

  public clickMarker(marker: any) {
    this.currentMarker = marker
    this.showBottom = true
  }

  public closeBottom() {
    this.showBottom = false
  }
}
</script>
