<template>
  <v-card elevation="5" class="mb-2">
    <v-card-title class="pb-0">
      <v-layout justify-space-between align-center>
          <v-layout d-flex align-content-center>
            <v-avatar color="grey" size="36" class="mr-3">
              <v-icon dark> mdi-account-circle </v-icon>
            </v-avatar>
            <p class="mb-0">{{ comment.name }}</p>
            <p class="mb-0 ml-3 caption font-weight-light">{{ comment.time_context }}</p>
          </v-layout>
        <v-menu v-if="editable" bottom offset-y>
          <template #activator="{ on, attrs }">
            <v-btn v-if="isCurrentTenantComment" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-layout column>
            <v-btn text @click="enableEdit">Sửa</v-btn>
            <v-btn text @click="deleteComment">Xóa</v-btn>
          </v-layout>
        </v-menu>
      </v-layout>
    </v-card-title>
    <v-card-text class="mt-3 pl-7 pr-7">
      <v-textarea
        v-model="comment.context"
        :disabled="!isEditing"
        :outlined="isEditing"
        rows="1"
        auto-grow
        flat
        solo
      >
      </v-textarea>
      <v-btn v-if="isEditing" color="primary" @click="editComment"
        >Cập nhật</v-btn
      >
      <v-btn v-if="isEditing" color="secondary" @click="isEditing = false"
        >Hủy</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
import { CommentDTO } from '@/constants/app.interface'

@Component<RoomCommentCard>({
  name: 'RoomCommentCard',
  created() {
    console.log(this.comment)
  }
  // eslint-disable-next-line no-undef
})
export default class RoomCommentCard extends Vue {
  @Prop({ type: Boolean, default: false }) readonly editable!: Function
  @Prop({ type: Object }) readonly comment!: CommentDTO

  private isEditing: boolean = false

  private enableEdit(): void {
    this.isEditing = true
  }

  @Emit()
  editComment() {
    this.isEditing = false
    const data: { id: number; comment: string } = {
      id: this.comment.id,
      comment: this.comment.context,
    }
    return data
  }

  @Emit()
  deleteComment() {
    return this.comment.id
  }

  isCurrentTenantComment() {
    return this.$store.state.auth.user.id == this.comment.account_id
  }
}
</script>
