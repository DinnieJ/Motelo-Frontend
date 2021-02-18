<template>
  <v-card>
    <v-card-title>
      <v-layout justify-space-between align-center>
        <v-layout>
          <v-avatar color="brown" size="36" class="mr-6">
            <span class="white--text headline">JD</span>
          </v-avatar>
          <p>John Doe</p>
        </v-layout>
        <v-menu bottom offset-y>
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
        value="Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the"
      >
      </v-textarea>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component<RoomCommentCard>({
  name: 'RoomCommentCard',
  // eslint-disable-next-line no-undef
})
export default class RoomCommentCard extends Vue {}
</script>
