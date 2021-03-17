<template>
  <v-container
    tag="section"
    fluid
    :class="`${isMobile() ? '' : 'pa-1'} map__full`"
  >
    <!-- This for google map -->
    <div class="yellow map__container">
      <v-layout justify-end>
        <v-btn @click="clickMarker">Marker</v-btn>
      </v-layout>
    </div>
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

              <v-layout justify-space-between>
                <h1 class="ma-0 map__title mobile">
                  {{ currentMarker.name }}
                </h1>
                <v-btn small color="primary" text icon :to="`#`">
                  <!-- bổ sung ":to" => "/map/_id/edit" nhét -->
                  <v-icon>mdi-wrench</v-icon>
                </v-btn>
              </v-layout>

              <!-- <a
                :href="`http://maps.google.com?q=${currentMarker.position.lat},${currentMarker.position.lng}`"
                target="_blank"
                class="room__smaller"
              >
                <i>Xem thêm về {{ currentMarker.name }} ở Google Map</i>
              </a> -->
              <p class="room__small map__overflow">
                {{ currentMarker.description }}
              </p>
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
            <v-btn x-small color="secondary" text icon @click="closeBottom">
              <v-icon small>mdi-close-circle</v-icon>
            </v-btn>
          </v-layout>
        </v-img>
        <template>
          <v-layout justify-space-between class="mt-1">
            <h1 class="ma-0 map__title">
              {{ currentMarker.name }}
            </h1>

            <v-btn small color="primary" text icon :to="`#`">
              <!-- bổ sung ":to" => "/map/_id/edit" nhét -->
              <v-icon>mdi-wrench</v-icon>
            </v-btn>
          </v-layout>
          <!-- <a
                :href="`http://maps.google.com?q=${currentMarker.position.lat},${currentMarker.position.lng}`"
                target="_blank"
                class="room__smaller"
              >
                <i>Xem thêm về {{ currentMarker.name }} ở Google Map</i>
              </a> -->
          <p class="room__small map__description">
            {{ currentMarker.description }}
          </p>
        </template>
      </div>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { LOADING_IMG, FPTLocation } from '@/constants/app.constant'
@Component<FullMap>({
  name: 'FullMap',
  // eslint-disable-next-line no-undef
  // middleware: ['authenticate', 'isCollaborator']
})
export default class FullMap extends Vue {
  private currentMarker = {
    name: 'faefafaefafaefaefafaefafaefaefafaefafaefaefafaefafae',
    description:
      'faefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafaefaefafaefafae',
    type: {
      id: 3,
      text: 'Chung cư',
      code: 'apartment',
      icon: 'office-building',
    },
    img: '/imgs/anh_room.jpg',
  }
  private showBottom: boolean = false
  private loadingImg = LOADING_IMG

  public clickMarker(inn: any) {
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