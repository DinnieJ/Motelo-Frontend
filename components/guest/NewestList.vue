<template>
  <section>
    <v-layout justify-space-between class="my-5">
      <h1>Bài đăng mới nhất</h1>
      <v-btn rounded outlined color="primary" to="/rooms">Xem thêm</v-btn>
    </v-layout>
    <v-row>
      <v-col v-for="room in rooms" :key="room.id" cols="12" sm="6">
        <room-card :room="room" />
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { RoomCardDTO } from '@/constants/app.interface'
import RoomCard from '@/components/room/RoomCard.vue'

// eslint-disable-next-line no-use-before-define
@Component<NewestList>({
  name: 'NewestList',
  components: {
    RoomCard,
  },
})
export default class NewestList extends Vue {
  @Prop({ type: Array }) readonly rooms!: RoomCardDTO[]
}
</script>
