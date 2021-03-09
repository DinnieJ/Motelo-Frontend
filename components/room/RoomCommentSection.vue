<template>
  <div class="mt-6 pa-3">
    <div>
      <h1 class="post__title">
        <v-icon class="mx-3" size="32" color="info" dark> mdi-comment </v-icon
        ><span>Nhận xét</span>
      </h1>
      <v-divider />
    </div>
    <div class="pa-4">
      <div v-if="loggedIn">
        <room-comment-input @add-comment="addComment" />
      </div>
      <div v-for="comment in asyncComments" :key="comment.id" class="mb-10">
        <room-comment-card
          :comment="comment"
          :editable="loggedIn && comment.account_id === user.id"
          @edit-comment="editComment"
          @delete-comment="deleteComment"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator'
import { CommentDTO } from '@/constants/app.interface'
import RoomCommentCard from './RoomCommentCard.vue'
import RoomCommentInput from './RoomCommentInput.vue'
import { mapGetters } from 'vuex'
import { Getter } from '@/constants/app.vuex'

@Component<RoomCommentSection>({
  name: 'RoomCommentSection',
  // eslint-disable-next-line no-undef
  components: {
    RoomCommentInput,
    RoomCommentCard,
  },
  computed: {
    ...mapGetters({
      user: Getter.USER,
    }),
  },
})
export default class RoomCommentSection extends Vue {
  @Prop({ type: Function }) readonly editComment!: Function
  @Prop({ type: Function }) readonly deleteComment!: Function
  @Prop({ type: Function }) readonly addComment!: Function
  @PropSync('comments') readonly asyncComments!: CommentDTO[]

  get loggedIn(): boolean {
    return !!this.$store.state.auth.user
  }
}
</script>
