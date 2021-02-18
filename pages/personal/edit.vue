<template>
  <v-container fluid>
    <v-card class="grey lighten-3">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Thiết lập tài khoản</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text color="white" @click="handleCancelClick()">
            Đồng ý
          </v-btn>
          <v-btn text color="warning" @click="handleCancelClick()">
            Từ chối
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-row class="mt-5 justify-center align-center">
        <v-col cols="12" md="6">
          <v-sheet min-height="60vh" rounded="lg" class="pa-5">
            <v-row>
              <v-col cols="12" class="pa-2">
                <v-layout column align-center>
                  <v-avatar size="300">
                    <img src="/imgs/anh_homepage.jpg" alt="" />
                  </v-avatar>
                  <v-btn class="mt-3">Đổi ảnh đại diện</v-btn>
                </v-layout>
              </v-col>
              <v-col cols="12" class="pa-2">
                <div>
                  <v-text-field
                    class="text-h5"
                    label="Tên"
                    value="Two-line item"
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    class="text-h5"
                    label="Email"
                    value="Two-line item"
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    class="text-h5"
                    label="Zalo"
                    value="Two-line item"
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    class="text-h5"
                    label="Facebook"
                    value="Two-line item"
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    class="text-h5"
                    label="Điện thoại 1"
                    value="Two-line item"
                  ></v-text-field>
                </div>
                <div>
                  <v-text-field
                    class="text-h5"
                    label="Điện thoại 2"
                    value="Two-line item"
                  ></v-text-field>
                </div>
                <v-btn block>Thêm số điện thoại</v-btn>
                <v-layout justify-end class="mt-5">
                  <v-btn
                    rounded
                    outlined
                    color="primary"
                    @click="handleCancelClick()"
                    class="mr-5"
                  >
                    Đồng ý
                  </v-btn>
                  <v-btn
                    rounded
                    outlined
                    color="warning"
                    @click="handleCancelClick()"
                  >
                    Từ chối
                  </v-btn>
                </v-layout>
              </v-col>
            </v-row>
          </v-sheet>
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
import { Component, Vue } from 'vue-property-decorator'
import PolicyCard from '@/components/common/PolicyCard.vue'
import InnUpdateSteppers from '@/components/inn/InnUpdateSteppers.vue'
import WarningDialog from '@/components/common/WarningDialog.vue'

@Component<ProfileUpdate>({
  name: 'ProfileUpdate',
  // eslint-disable-next-line no-undef
  components: {
    PolicyCard,
    InnUpdateSteppers,
    WarningDialog,
  },
  layout: 'empty',
})
export default class ProfileUpdate extends Vue {
  private acceptPolicy: boolean = false
  private openWarningDialog: boolean = false

  public closeForm() {
    this.openWarningDialog = true
  }

  public acceptPolicyEvent() {
    this.acceptPolicy = true
  }

  public refuseWarningDialog() {
    this.openWarningDialog = false
    this.$router.go(-1)
  }

   public handleCancelClick() {
    this.openWarningDialog = true
  }
}
</script>
