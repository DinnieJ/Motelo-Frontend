<template>
  <v-textarea
    outlined
    name="comment"
    label="Thêm nhận xét"
    v-model="value"
    rows="3"
    no-resize
    ><v-icon slot="append-outer" :disabled="!value" @click="addComment" :color="value ? 'primary': ''">mdi-send</v-icon>
  </v-textarea>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component<RoomCommentInput>({
  name: 'RoomCommentInput',
  // eslint-disable-next-line no-undef
})
export default class RoomCommentInput extends Vue {
  private value: string = ''

  @Emit()
  public addComment(e: Event) {
    e.preventDefault()
    let comment: string = this.value
    this.value = ''
    return comment
  }
}
</script>
