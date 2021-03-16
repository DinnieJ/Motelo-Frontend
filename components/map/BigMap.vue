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
        <gmap-marker
          :position="inn.position"
          v-for="inn in inns"
          :key="inn.id"
          :icon="inn.icon"
          @click="clickMarker(inn)"
        ></gmap-marker>
      </gmap-map>

      <!-- inn marker info -->
      <div v-if="showBottom" class="white rounded-t pt-3 map__bottom">
        <v-row>
          <v-col cols="6" class="pa-1">
            <v-img
              :lazy-src="loadingImg"
              :src="currentMarker.img"
              contain
              width="100%"
              height="100%"
              class="rounded"
            >
            </v-img>
          </v-col>
          <v-col cols="6" class="pa-1 pr-4">
            <v-layout justify-space-between>
              <v-btn x-small outlined>
                <v-icon x-small>{{ `mdi-${currentMarker.type.icon}` }}</v-icon>
                <span>{{ currentMarker.type.text }}</span>
              </v-btn>
              <v-btn x-small color="secondary" text icon @click="closeBottom">
                <v-icon small>mdi-close-circle</v-icon>
              </v-btn>
            </v-layout>

            <h1 class="ma-0 room__title">
              {{ currentMarker.name }}
            </h1>
            <a
              :href="`http://maps.google.com?q=${currentMarker.position.lat},${currentMarker.position.lng}`"
              target="_blank"
              class="room__smaller"
            >
              <i>Xem thêm trên Google Map</i>
            </a>
            <p class="room__small map__overflow">
              {{ currentMarker.description }}
            </p>
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

@Component<BigMap>({
  name: 'BigMap',
  // eslint-disable-next-line no-undef
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
  private currentMarker = {
    name: '',
    description: '',
    type: {
      id: 3,
      text: 'Chung cư',
      code: 'apartment',
      icon: 'office-building',
    },
    position: this.center,
    img: '/imgs/anh_room.jpg',
  }
  private description: string =
    'Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.'

  private showBottom: boolean = false
  private loadingImg = LOADING_IMG
  public clickMarker(inn: any) {
    this.currentMarker = {
      name: inn.title,
      description: inn.content,
      type: {
        id: 3,
        text: 'Chung cư',
        code: 'apartment',
        icon: 'office-building',
      },
      position: inn.position,
      img: '/imgs/anh_room.jpg',
    }
    this.showBottom = true
  }

  public closeBottom() {
    this.showBottom = false
  }
}
</script>
