<template>
  <section>
    <!-- minh họa thôi -->
    <div class="grey map__big">
      <!-- This for google map -->
      <div class="map__container">
        <v-btn @click="clickMarker">Marker</v-btn>
      </div>
      <!-- End -->

      <div :class="`map__bottom ${showBottom ? 'active' : ''}`">
        <v-layout justify-center class="white rounded-t">
          <v-row style="height: ">
            <v-col cols="12" md="5">
              <v-img :lazy-src="loadingImg" :src="room.imgLink" contain max-width="100%">
                <v-layout>
                  <v-btn color="secondary" text icon @click="closeBottom">
                    <v-icon>mdi-close-circle</v-icon>
                  </v-btn>
                </v-layout>
              </v-img>
            </v-col>
            <v-col cols="12" md="7">
              <v-card>
                <v-card-title class="pa-2">
                  <p class="ma-0 room__title">
                    {{ room.title }}
                  </p>
                </v-card-title>
                <v-card-text class="mb-2">
                  <p class="text-center secondary--text">
                    <span class="font-weight-bold">{{
                      room.millionPrice
                    }}</span>
                    <i>{{ room.priceUnit }}</i>
                  </p>
                  <v-row>
                    <v-col cols="4" class="pa-1">
                      <v-layout column align-center>
                        <v-icon>mdi-ruler</v-icon>
                        <span class="room__smaller">{{ room.areaString }}</span>
                      </v-layout>
                    </v-col>
                    <v-col cols="4" class="pa-1">
                      <v-layout column align-center>
                        <v-icon>{{ `mdi-${room.gender.icon}` }}</v-icon>
                        <span class="room__smaller">{{
                          room.capacityString
                        }}</span>
                      </v-layout>
                    </v-col>
                    <v-col cols="4" class="pa-1">
                      <v-layout column align-center>
                        <v-icon>mdi-check-circle-outline</v-icon>
                        <span
                          class="room__smaller"
                          v-html="room.availableHtml"
                        ></span>
                      </v-layout>
                    </v-col>
                    <v-col cols="12" class="pa-1">
                      <v-icon>mdi-map-marker</v-icon>
                      <span class="room__small">{{ room.address }}</span>
                    </v-col>
                    <v-col cols="12" class="pa-1">
                      <v-icon>mdi-home</v-icon>
                      <span class="room__smaller">{{ room.inn_name }}</span>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-layout>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { LOADING_IMG } from '@/constants/app.constant'

@Component<BigMap>({
  name: 'BigMap',
  // eslint-disable-next-line no-undef
})
export default class BigMap extends Vue {
  private showBottom: boolean = false
  private loadingImg = LOADING_IMG
  private room = {
    id: 23,
    title:
      'Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.',
    type: {
      id: 3,
      text: 'Chung cư',
      code: 'apartment',
      icon: 'office-building',
    },
    available: 1,
    gender: {
      id: 1,
      text: 'Nam & Nữ',
      icon: 'human-male-female',
      code: 'both',
    },
    area: 1,
    capacity: { max: 3, min: 2 },
    address: '65288 Altenwerth Skyway Suite 102\nColechester, MN 14156-6410',
    verify: 1,
    favorite: false,
    price: 0,
    imgLink: '/imgs/anh_room.jpg',
    inn_name: 'Dangelo Mohr',
    favorited: false,
  }

  public clickMarker() {
    this.showBottom = true
  }

  public closeBottom() {
    this.showBottom = false
  }
}
</script>
