<template>
  <v-container fluid>
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
    <warning-dialog
      title="THOÁT"
      content="Nếu bạn thoát, những thông tin trên sẽ không được lưu lại.<br>Bạn có muốn thoát không?"
      @accept="acceptWarningDialog"
      @refuse="refuseWarningDialog"
      v-model="openWarningDialog"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PolicyCard from '@/components/common/PolicyCard.vue'
import InnUpdateSteppers from '@/components/inn/InnUpdateSteppers.vue'
import WarningDialog from '@/components/common/WarningDialog.vue'

@Component<InnCreate>({
  name: 'InnCreate',
  // eslint-disable-next-line no-undef
  components: {
    PolicyCard,
    InnUpdateSteppers,
    WarningDialog,
  },
  middleware: ['authenticated', 'isOwner'],
  layout: 'empty',
})
export default class InnCreate extends Vue {
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
  }
  public acceptWarningDialog() {
    this.openWarningDialog = false
    this.$router.push("/owner/inn/create")
  }
}
</script>
