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
        <div v-for="comment in asyncComments" :key="comment.id" class="mb-10">
            <room-comment-card :comment="comment" />
        </div>
        <room-comment-input @add-comment="addComment" />
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
import { CommentDTO } from '@/constants/app.interface'
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
export default class RoomCommentSection extends Vue {
  @Prop({ type: Function }) readonly editComment!: Function
  @Prop({ type: Function }) readonly deleteComment!: Function
  @Prop({ type: Function }) readonly addComment!: Function
  @PropSync('comments') readonly asyncComments!: CommentDTO[]
}
</script>
