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
            <v-btn text>Sửa</v-btn>
            <v-btn text>Xóa</v-btn>
          </v-layout>
        </v-menu>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <v-textarea
        disabled
        outlined
        :value="comment.context"
        clearable
        :append-outer-icon=" isEditing ? 'mdi-send' : undefined"
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
  @Prop({ type: Function }) readonly editComment!: Function
  @Prop({ type: Function }) readonly deleteComment!: Function
  @Prop({ type: Boolean, default: false }) readonly editable!: Function
  @Prop({ type: Object }) readonly comment!: CommentDTO

  private isEditing: boolean = false
}
</script>
