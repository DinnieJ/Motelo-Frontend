<template>
  <v-textarea
    v-model="value"
    outlined
    name="comment"
    label="Thêm nhận xét"
    rows="3"
    no-resize
    ><v-icon slot="append-outer" :disabled="!value" :color="value ? 'primary': ''" @click="addComment">mdi-send</v-icon>
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
    const comment: string = this.value
    this.value = ''
    return comment
  }
}
</script>
