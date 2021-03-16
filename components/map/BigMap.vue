<template>
  <section>
    <!-- minh họa thôi -->
    <div class="grey map__big">
      <!-- This for google map -->
      <div class="map__container">
        <v-btn @click="clickMarker">Marker</v-btn>
      </div>
      <!-- End -->

        <div
          v-if="showBottom"
          class="white rounded-t pt-3 map__bottom"
        >
          <v-row>
            <v-col cols="6" class="pa-1">
              <v-img
                :lazy-src="loadingImg"
                :src="img"
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
                  <v-icon x-small>{{ `mdi-${type.icon}` }}</v-icon>
                  <span>{{ type.text }}</span>
                </v-btn>
                <v-btn x-small color="secondary" text icon @click="closeBottom">
                  <v-icon small>mdi-close-circle</v-icon>
                </v-btn>
              </v-layout>

              <h1 class="ma-0 room__title">
                {{ name }}
              </h1>
              <p class="room__smaller map__overflow">{{ description }}</p>
            </v-col>
          </v-row>
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
  private img: string = '/imgs/anh_room.jpg'
  private name: string =
    'Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.'
  private type = {
    id: 3,
    text: 'Chung cư',
    code: 'apartment',
    icon: 'office-building',
  }
  private description: string =
    'Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.Nemo quam iste molestias. Est perspiciatis sed adipisci ut. Et numquam eum qui aut qui sequi voluptate.'

  public clickMarker() {
    this.showBottom = true
  }

  public closeBottom() {
    this.showBottom = false
  }
}
</script>
