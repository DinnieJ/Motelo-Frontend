<template>
  <v-sheet min-height="60vh" rounded="lg" class="pa-3">
    <v-layout class="my-5">
      <h1 class="secondary--text">Yêu thích</h1>
    </v-layout>
    <v-row>
      <v-col cols="12" v-for="room in rooms" :key="room.id">
        <room-card :room="room" />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { RoomCardDTO } from '@/constants/app.interface'
import RoomCard from '@/components/room/RoomCard.vue'

@Component<FavouriteList>({
  name: 'FavouriteList',
  // eslint-disable-next-line no-undef
  components: {
    RoomCard,
  },
})
export default class FavouriteList extends Vue {
  @Prop() readonly rooms!: RoomCardDTO[]
}
</script>
