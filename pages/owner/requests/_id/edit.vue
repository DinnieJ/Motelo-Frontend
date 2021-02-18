<template>
  <v-container>
    <v-card class="grey lighten-3">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Tạo mới phòng trọ</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="closeDialog"> bỏ qua </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-row class="mt-5 justify-center align-center">
        <v-col cols="12" md="6">
          <room-form-steppers v-if="acceptPolicy" @finish="closeDialog" />
          <policy-card
            v-else
            :refuse="closeDialog"
            :accept="acceptPolicyEvent"
          />
        </v-col>
      </v-row>
    </v-card>
    <warning-dialog
      title="Lưu thay đổi"
      content="bạn có muốn lưu sửa đổi này không"
      @accept="refuseWarningDialog"
      @refuse="refuseWarningDialog"
      v-model="openWarningDialog"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'vue-property-decorator'
import PolicyCard from '@/components/common/PolicyCard.vue'
import WarningDialog from '@/components/common/WarningDialog.vue'

import RoomFormSteppers from '@/components/room/RoomFormSteppers.vue'

@Component<RoomEditRequest>({
  name: 'RoomEditRequest',
  // eslint-disable-next-line no-undef
  components: {
    PolicyCard,
    RoomFormSteppers,
    WarningDialog,
  },
})
export default class RoomEditRequest extends Vue {
  private acceptPolicy: boolean = false
  private openWarningDialog: boolean = false

  public closeDialog() {
    this.openWarningDialog = true
  }

  public acceptPolicyEvent() {
    this.acceptPolicy = true
  }

  public refuseWarningDialog() {
    this.openWarningDialog = false
    this.$router.go(-1)
  }
}
</script>
