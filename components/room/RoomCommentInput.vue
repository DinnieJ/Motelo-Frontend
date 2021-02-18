<template>
  <v-textarea
    outlined
    name="comment"
    label="Thêm nhận xét"
    value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
    clearable
    append-outer-icon="mdi-send"
  ></v-textarea>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component<RoomCommentInput>({
  name: 'RoomCommentInput',
  // eslint-disable-next-line no-undef
})
export default class RoomCommentInput extends Vue {}
</script>
