<template>
  <v-dialog v-model="openning" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{ title }}
      </v-card-title>

      <v-card-text>
        {{ content }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="clickAccept"> Có </v-btn>
        <v-btn color="primary" text @click="clickRefuse"> Không </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel, Emit } from 'vue-property-decorator'

@Component<WarningDialog>({
  name: 'WarningDialog',
  // eslint-disable-next-line no-undef
})
export default class WarningDialog extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string
  @Prop({ type: String, required: true }) readonly content!: string

  @VModel({ type: Boolean }) openning!: boolean

  @Emit('accept')
  clickAccept() {}

  @Emit('refuse')
  clickRefuse() {}
}
</script>
