<template>
  <v-textarea
    outlined
    name="comment"
    label="Thêm nhận xét"
    clearable
    append-outer-icon="mdi-send"
    v-model="value"
    @click:append-outer="addComment"
  ></v-textarea>
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
    return this.value
  }
}
</script>
