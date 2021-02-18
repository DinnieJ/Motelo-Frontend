<template>
  <v-card rounded="lg" class="mt-12 pa-3">
    <div>
      <v-layout>
        <v-icon class="mx-3" size="32" color="info" dark> mdi-comment </v-icon>
        <h1 class="room__title">Nhận xét</h1>
      </v-layout>
      <v-divider />
    </div>
    <div class="pa-1">
        <div v-for="i in 3" :key="i" class="mb-10">
            <room-comment-card />
        </div>
        <room-comment-input />
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RoomCommentCard from './RoomCommentCard.vue'
import RoomCommentInput from './RoomCommentInput.vue'

@Component<RoomCommentSection>({
  name: 'RoomCommentSection',
  // eslint-disable-next-line no-undef
  components: {
    RoomCommentInput,
    RoomCommentCard,
  },
})
export default class RoomCommentSection extends Vue {}
</script>
