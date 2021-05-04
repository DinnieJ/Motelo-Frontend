<template>
  <v-container
    tag="section"
    fluid
    :class="`${isMobile() ? '' : 'pa-1'} map__full`"
  >
    <!-- This for google map -->
    <gmap-map
      :center="center"
      :zoom="zoom"
      :options="mapOptions"
      class="map__container"
    >
      <template v-for="marker in markers">
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
          :key="`marker-${marker.id}`"
          :position="marker.position"
          :icon="{
            path: marker.type.code,
            fillColor: '#FFFFFF',
            fillOpacity: 1,
            anchor: { x: -6.5, y: -7 },
            strokeOpacity: 0,
            strokeWeight: 0,
          }"
          @click="clickMarker(marker)"
        ></gmap-marker>
      </template>
    </gmap-map>
    <!-- End google map -->

    <div class="map__create-btn">
      <v-btn small to="/map/create">Thêm tiện ích</v-btn>
    </div>

    <template v-if="showBottom">
      <!-- marker info for mobile screen -->
      <div v-if="isMobile()" class="white rounded-t pt-3 map__bottom">
        <v-row>
          <v-col cols="6" class="pa-1">
            <v-img
              :lazy-src="loadingImg"
              :src="currentMarker.img"
              width="100%"
              height="300px"
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
                <v-btn color="secondary" text icon @click="closeBottom">
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-layout>

              <v-layout d-flex align-center justify-space-between class="mt-1">
                <h1 class="ma-0 map__title">
                  {{ currentMarker.name }}
                </h1>
                <v-layout class="justify-end">
                  <v-btn
                    color="primary"
                    text
                    icon
                    :to="`/map/${currentMarker.id}/edit`"
                  >
                    <v-icon>mdi-wrench</v-icon>
                  </v-btn>
                  <v-btn color="red" icon @click="deleteDialog = true">
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </v-layout>
              </v-layout>

              <a
                :href="`http://maps.google.com?q=${currentMarker.position.lat},${currentMarker.position.lng}`"
                target="_blank"
                class="text-decoration-underline room__smaller"
              >
                <i>Xem thêm trên Google Map</i>
              </a>
              <p
                class="room__small map__overflow"
                v-html="currentMarker.description"
              ></p>
            </template>
          </v-col>
        </v-row>
      </div>
      <!-- marker info for dekstop screen -->
      <div v-else class="white rounded-r map__left">
        <v-img
          :lazy-src="loadingImg"
          :src="currentMarker.img"
          width="100%"
          class="rounded"
        >
          <v-layout justify-space-between>
            <v-btn x-small outlined class="white">
              <v-icon x-small>{{ `mdi-${currentMarker.type.icon}` }}</v-icon>
              <span>{{ currentMarker.type.text }}</span>
            </v-btn>
            <v-btn color="secondary" text icon @click="closeBottom">
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </v-layout>
        </v-img>
        <template>
          <v-layout d-flex align-center justify-space-between class="mt-1">
            <h1 class="ma-0 map__title">
              {{ currentMarker.name }}
            </h1>
            <v-layout class="justify-end">
              <v-btn
                color="primary"
                text
                icon
                :to="`/map/${currentMarker.id}/edit`"
              >
                <v-icon>mdi-wrench</v-icon>
              </v-btn>
              <v-btn color="red" icon @click="deleteDialog = true">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </v-layout>
          </v-layout>
          <a
            :href="`http://maps.google.com?q=${currentMarker.position.lat},${currentMarker.position.lng}`"
            target="_blank"
            class="text-decoration-underline room__smaller"
          >
            <i>Xem thêm trên Google Map</i>
          </a>
          <p
            class="room__small map__description"
            v-html="currentMarker.description"
          ></p>
        </template>
      </div>
    </template>
    <v-dialog v-model="deleteDialog" max-width="370">
      <v-card>
        <v-card-title class="headline"> Xác nhận </v-card-title>
        <v-card-text
          >Bạn có chắc chắn muốn xóa tiện ích này không ?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text :loading="loadingDelete" @click="deleteUtility"> Có </v-btn>
          <v-btn color="primary" text @click="deleteDialog = false">
            Không
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { LOADING_IMG, DefaultMapZoom } from '@/constants/app.constant'
import { mdiCircle } from '@mdi/js'
import UtilityRepository from '~/repositories/UtilityRepository'
import { MarkerDTO } from '~/constants/app.interface'

@Component<FullMap>({
  name: 'FullMap',
  // eslint-disable-next-line no-undef
  middleware: ['authenticated', 'isCollaborator'],
})
export default class FullMap extends Vue {
  $notify: any
  private center: any = { lat: 0, lng: 0 }
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

  private deleteDialog: boolean = false

  private markers: MarkerDTO[] = []

  private currentMarker = new MarkerDTO()

  private showBottom: boolean = false
  private loadingImg = LOADING_IMG
  private loadingDelete: boolean = false

  private pinIcon = mdiCircle

  async created() {
    await this.getAllMarker()
    this.getCurrentPosition()
    console.log(this.markers)
  }

  public getCurrentPosition() {
    const context = this
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function setMapCenterByGPS(position) {
          context.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        },
        (error) => {
          console.log(error)
        },
        { maximumAge: 0 }
      )
    }
  }

  public async getAllMarker() {
    await UtilityRepository.getAllUtilities().then((response) => {
      const markers = response.data
      this.markers = markers.map(function (marker: any) {
        return new MarkerDTO(marker)
      })
    })
  }

  public async deleteUtility() {
    this.loadingDelete = true
    await UtilityRepository.deleteUtility(this.currentMarker.id).then(
      (response) => {
        this.$notify.showMessage({
          message: 'Xóa tiện ích thành công',
          color: 'success',
        })

        this.markers = this.markers.filter(
          (item) => item.id !== this.currentMarker.id
        )
      }
    ).catch(err => {
      console.error(err)
    }).finally(() => {
      this.loadingDelete = false
      this.showBottom = false
      this.currentMarker = new MarkerDTO()
      this.deleteDialog = false
    })
  }

  public clickMarker(marker: any) {
    this.currentMarker = marker
    this.showBottom = true
  }

  public closeBottom() {
    this.showBottom = false
  }

  public isMobile(): boolean {
    return this.$vuetify.breakpoint.smAndDown
  }
}
</script>