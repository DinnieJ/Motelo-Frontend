<template>
  <v-card>
    <v-card-title>
      <v-layout justify-space-between align-center>
        <v-layout>
          <v-avatar color="brown" size="36" class="mr-6">
            <span class="white--text headline">JD</span>
          </v-avatar>
          <p>{{ comment.name }}</p>
        </v-layout>
        <v-menu bottom offset-y v-if="editable">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
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
    <v-card-text>
      <v-textarea
        :disabled="!isEditing"
        outlined
        v-model="comment.context"
        clearable
      >
        <v-icon
          v-if="isEditing"
          :disabled="!comment.context"
          slot="append-outer"
          @click="editComment"
          >mdi-send</v-icon
        >
      </v-textarea>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
import { CommentDTO } from '@/constants/app.interface'

@Component<RoomCommentCard>({
  name: 'RoomCommentCard',
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
    this.isEditing = false;
    let data: { id: number; comment: string } = {
      id: this.comment.id,
      comment: this.comment.context,
    }
    return data
  }

  @Emit()
  deleteComment() {
    return this.comment.id
  }
}
</script>
