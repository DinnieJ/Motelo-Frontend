<template>
  <v-dialog transition="dialog-bottom-transition" v-model="openning" fullscreen>
    <v-card class="grey lighten-3">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Thiết lập nhà trọ</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="closeDialog"> bỏ qua </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-row class="mt-5 justify-center align-center">
        <v-col cols="12" md="6">
          <inn-update-steppers v-if="acceptPolicy" @finish="closeDialog" />
          <policy-card
            v-else
            :refuse="closeDialog"
            :accept="acceptPolicyEvent"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'vue-property-decorator'
import PolicyCard from '@/components/common/PolicyCard.vue'
import InnUpdateSteppers from './InnUpdateSteppers.vue'

@Component<InnUpdateDialog>({
  name: 'InnUpdateDialog',
  // eslint-disable-next-line no-undef
  components: {
    PolicyCard,
    InnUpdateSteppers,
  },
})
export default class InnUpdateDialog extends Vue {
  @VModel({ type: Boolean })
  openning!: boolean

  private acceptPolicy: boolean = false

  public closeDialog() {
    console.log('closeDialog', this.openning)
    this.openning = false
    this.acceptPolicy = false
  }

  public acceptPolicyEvent() {
    this.acceptPolicy = true
  }
}
</script>
