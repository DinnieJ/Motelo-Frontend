<template>
  <v-card
    elevation="0"
    class="mb-4 post__card"
    :to="`/rooms/${room.id}`"
  >
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="room.imgLink" class="rounded" max-width="100%" />
      </v-col>
      <v-col cols="8" md="6" class="pa-1">
        <h4 class="mb-2">{{ room.title }}</h4>
        <v-row>
          <v-col sm="6" cols="12">
            <v-icon>{{`mdi-${room.type.icon}`}}</v-icon>
            <span>{{ room.type.text }}</span>
          </v-col>
          <v-col sm="6" cols="12">
            <v-icon>mdi-check-circle-outline</v-icon>
            <span v-html="room.availableHtml"></span>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="4" cols="12">
            <v-icon>{{`mdi-${room.gender.icon}`}}</v-icon>
            <span>{{ room.gender.text }}</span>
          </v-col>
          <v-col sm="4" cols="12">
            <v-icon>mdi-ruler</v-icon>
            <span>{{ room.areaString }}</span>
          </v-col>
          <v-col sm="4" cols="12">
            <v-icon>mdi-account-multiple-check-outline</v-icon>
            <span>{{ room.capacityString }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-icon>mdi-map-marker</v-icon>
            <span>{{ room.address }}</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="2" cols="4" class="secondary--text text--center pr-5">
        <v-layout class="justify-end">
          <v-tooltip top class="mr-5" v-if="room.verify">
            <template v-slot:activator="{ on, attrs }">
              <v-icon size="32" color="primary" dark v-bind="attrs" v-on="on">
                mdi-shield-home
              </v-icon>
            </template>
            <span>Được kiểm chứng</span>
          </v-tooltip>
          <v-icon
            class="ml-5"
            size="32"
            color="secondary"
            dark
            v-if="!room.favorite"
          >
            mdi-heart-plus-outline
          </v-icon>
        </v-layout>
        <v-layout class="post__price">
          <span class="display-3 font-weight-bold">{{ room.millionPrice }}</span>
          <span class="caption">{{ room.priceUnit }}</span>
        </v-layout>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { RoomCardDTO } from '@/constants/app.interface'

// eslint-disable-next-line no-use-before-define
@Component<RoomCard>({
  name: "RoomCard"
})
export default class RoomCard extends Vue {
  @Prop({ required: true }) readonly room!: RoomCardDTO
}
</script>
