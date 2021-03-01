<template>
  <v-textarea
    outlined
    name="comment"
    label="Thêm nhận xét"
    clearable
    v-model="value"
    ><v-icon slot="append-outer" :disabled="!value" @click="addComment">mdi-send</v-icon>
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
