<template>
  <v-container fluid>
    <v-card class="grey lighten-3">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Thiết lập tài khoản</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text color="white" @click="handleSubmitClick()"> Lưu </v-btn>
          <v-btn text color="warning" @click="handleCancelClick()">
            Hủy bỏ
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
                  <validation-provider
                    v-slot="{ errors }"
                    name="name"
                    :rules="rules.name"
                  >
                    <v-text-field
                      class="text-h5"
                      label="Tên"
                      v-model="userInfo.name"
                      :disabled="!editable"
                      :error-messages="errors"
                    ></v-text-field>
                  </validation-provider>
                </div>
                <div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    :rules="rules.email"
                  >
                    <v-text-field
                      class="text-h5"
                      label="Email"
                      v-model="userInfo.email"
                      :disabled="!editable"
                      :error-messages="errors"
                    ></v-text-field>
                  </validation-provider>
                </div>
                <div v-if="userInfo.zalo">
                  <div>
                    <v-text-field
                      class="text-h5"
                      label="Zalo"
                      v-model="userInfo.zalo"
                      :disabled="!editable"
                    ></v-text-field>
                  </div>
                </div>
                <div v-if="userInfo.facebook">
                  <div>
                    <v-text-field
                      class="text-h5"
                      label="Facebook"
                      v-model="userInfo.facebook"
                      :disabled="!editable"
                    ></v-text-field>
                  </div>
                </div>
                <div v-if="userInfo.phone.length">
                  <div v-for="(phone, index) in userInfo.phone" :key="index">
                    <div>
                      <v-text-field
                        class="text-h5"
                        :label="`Số điện thoại ${index + 1}`"
                        v-model="userInfo.phone[index]"
                        :disabled="!editable"
                      ></v-text-field>
                    </div>
                  </div>
                </div>
                <v-btn
                  block
                  x-small
                  @click="addMorePhone()"
                  color="info"
                  class="mb-5"
                  >Thêm số điện thoại (Nếu có)</v-btn
                >
                <v-layout justify-end class="mt-5">
                  <v-btn
                    rounded
                    outlined
                    color="primary"
                    @click="handleSubmitClick()"
                    class="mr-5"
                  >
                    Lưu
                  </v-btn>
                  <v-btn
                    rounded
                    outlined
                    color="warning"
                    @click="handleCancelClick()"
                  >
                    Hủy bỏ
                  </v-btn>
                </v-layout>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
    <warning-dialog
      title="Hủy thay đổi"
      content="Bạn có chắc chắn muốn hủy bỏ thông tin vừa thay đổi"
      @accept="acceptCancelDialog"
      @refuse="refuseCancelDialog"
      v-model="openCancelDialog"
    />
    <warning-dialog
      title="Lưu thay đổi"
      content="Bạn có chắc chắn muốn lưu thông tin vừa thay đổi"
      @accept="acceptConfirmDialog"
      @refuse="refuseConfirmDialog"
      v-model="openConfirmDialog"
    />
  </v-container>
</template>

<script lang="ts">
import { ValidationProvider, extend, setInteractionMode } from 'vee-validate'
import { Component, Vue } from 'vue-property-decorator'
import PolicyCard from '@/components/common/PolicyCard.vue'
import InnUpdateSteppers from '@/components/inn/InnUpdateSteppers.vue'
import WarningDialog from '@/components/common/WarningDialog.vue'
import { LoginRule, UserInfoDTO } from '@/constants/app.interface'
import PersonalRepository from '@/repositories/PersonalRepository'
import { TenantRegisterRule } from '@/constants/app.interface'
import { required, email } from 'vee-validate/dist/rules'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'Bạn không được để trống trường này',
})

extend('email', {
  ...email,
  message: 'Vui lòng nhập đúng email của bạn',
})

@Component<ProfileUpdate>({
  name: 'ProfileUpdate',
  // eslint-disable-next-line no-undef
  components: {
    PolicyCard,
    InnUpdateSteppers,
    WarningDialog,
    ValidationProvider,
  },
})
export default class ProfileUpdate extends Vue {
  private acceptPolicy: boolean = false
  private openConfirmDialog: boolean = false
  private openCancelDialog: boolean = false
  private userInfo: UserInfoDTO = {
    name: '',
    email: '',
    zalo: '',
    facebook: '',
    phone: [],
  }
  private loadingUserInfo: boolean = false
  private editable: boolean = true
  $notify: any

  private rules: any = {
    name: { required: true },
    email: { required: true, email: true },
  }

  async created() {
    await this.getUserInfo()
  }

  public async getUserInfo(): Promise<any> {
    this.loadingUserInfo = true
    await PersonalRepository.getUserInfo()
      .then((response) => {
        this.userInfo = response
      })
      .catch((error) => {
        console.log('get user info: ', error)
      })
      .finally(() => {
        this.loadingUserInfo = false
      })
  }

  // public acceptPolicyEvent() {
  //   this.acceptPolicy = true
  // }

  public refuseConfirmDialog() {
    this.openConfirmDialog = false
  }

  public refuseCancelDialog() {
    this.openCancelDialog = false
  }

  public async acceptCancelDialog() {
    this.openCancelDialog = false
    this.$router.go(-1)
  }

  public async acceptConfirmDialog() {
    await PersonalRepository.setUserInfo(this.userInfo).then((response) => {
      this.$notify.showMessage({
        message: 'Bạn đã cập nhật thông tin cá nhân thành công!',
        color: 'success',
      })
      this.$router.go(-1)
    })
  }

  public handleCancelClick() {
    this.openCancelDialog = true
  }

  public handleSubmitClick() {
    this.openConfirmDialog = true
  }

  public addMorePhone() {
    this.userInfo.phone.push('')
  }
}
</script>
