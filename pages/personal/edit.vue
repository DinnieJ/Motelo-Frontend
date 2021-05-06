<template>
  <v-container>
    <v-layout d-flex justify-center class="rounded white">
      <div class="auth__section pa-2">
        <v-layout justify-space-between>
          <h1 class="primary--text ma-0 auth__title">SỬA TÀI KHOẢN</h1>
          <v-btn color="secondary" text icon @click="handleCancelClick()">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-layout>

        <v-layout class="mt-3 d-flex flex-column">
          <validation-observer ref="formObserver" v-slot="{ invalid }">
            <v-form
              class="d-flex flex-column justify-content-center login__form"
            >
              <validation-provider
                v-slot="{ errors }"
                name="email"
                :rules="rules.email"
              >
                <v-text-field
                  v-model="userInfo.email"
                  label="Email"
                  name="email"
                  outlined
                  :error-messages="errors"
                  readonly
                  disabled
                  class='required'
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="name"
                :rules="rules.name"
              >
                <v-text-field
                  v-model="userInfo.name"
                  label="Tên"
                  name="name"
                  outlined
                  class='required'
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="email"
                :rules="rules.phone"
              >
                <v-text-field
                  v-model="userInfo.phone_number"
                  label="Số điện thoại"
                  name="phone"
                  outlined
                  class="required"
                  :error-messages="errors"
                ></v-text-field>
              </validation-provider>
              <v-menu
                v-model="dateDialog"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="userInfo.date_of_birth"
                    label="Ngày sinh"
                    outlined
                    color="primary"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    class='required'
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="userInfo.date_of_birth"
                  @input="dateDialog = false"
                ></v-date-picker>
              </v-menu>

              <v-layout justify-end>
                <v-btn
                  color="primary"
                  :disabled="invalid"
                  :loading="loadingUserInfo"
                  class="mr-1"
                  @click="handleSubmitClick()"
                >
                  Lưu
                </v-btn>

                <v-btn
                  color="warning"
                  @click="handleCancelClick()"
                  >Hủy</v-btn
                >
              </v-layout>
            </v-form>
          </validation-observer>
        </v-layout>
      </div>
    </v-layout>

    <warning-dialog
      v-model="openCancelDialog"
      title="Hủy thay đổi"
      content="Bạn có chắc chắn muốn hủy bỏ thông tin vừa thay đổi"
      @accept="acceptCancelDialog"
      @refuse="refuseCancelDialog"
    />
    <warning-dialog
      v-model="openConfirmDialog"
      title="Lưu thay đổi"
      content="Bạn có chắc chắn muốn lưu thông tin vừa thay đổi"
      @accept="acceptConfirmDialog"
      @refuse="refuseConfirmDialog"
    />
  </v-container>
</template>

<script lang="ts">
import {
  ValidationProvider,
  extend,
  setInteractionMode,
  ValidationObserver,
} from 'vee-validate'
import { Component, Vue } from 'vue-property-decorator'
import PolicyCard from '@/components/common/PolicyCard.vue'
import InnUpdateSteppers from '@/components/inn/InnUpdateSteppers.vue'
import WarningDialog from '@/components/common/WarningDialog.vue'
import { LoginRule, UserInfoDTO , TenantRegisterRule } from '@/constants/app.interface'
import PersonalRepository from '@/repositories/PersonalRepository'

import { required, email, regex, numeric } from 'vee-validate/dist/rules'
import { DispatchAction } from '~/constants/app.vuex'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'Bạn không được để trống trường này',
})

extend('email', {
  ...email,
  message: 'Vui lòng nhập đúng email của bạn',
})

extend('regex', {
  ...regex,
  message: 'Vui lòng chỉ nhập chữ',
})

extend('numeric', {
  ...numeric,
  message: 'Vui lòng chỉ nhập số',
})

@Component<ProfileUpdate>({
  name: 'ProfileUpdate',
  // eslint-disable-next-line no-undef
  components: {
    PolicyCard,
    InnUpdateSteppers,
    WarningDialog,
    ValidationProvider,
    ValidationObserver,
  },
  middleware: ['authenticated', 'isTenant'],
})
export default class ProfileUpdate extends Vue {
  private acceptPolicy: boolean = false
  private openConfirmDialog: boolean = false
  private openCancelDialog: boolean = false

  private dateDialog: boolean = false
  private userInfo: UserInfoDTO = {
    name: '',
    email: '',
    date_of_birth: '',
    phone_number: '',
  }

  private loadingUserInfo: boolean = false
  private editable: boolean = true
  $notify: any

  private rules: any = {
    name: {
      required: true,
    },
    email: { required: true, email: true },
    phone: { required: true, numeric: true },
  }

  async created() {
    await this.getUserInfo()
  }

  public async getUserInfo(): Promise<any> {
    this.loadingUserInfo = true
    await PersonalRepository.getUserInfo()
      .then((response) => {
        this.userInfo = response.data
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
    this.$router.push("/personal")
  }

  public async acceptConfirmDialog() {
    await PersonalRepository.updateUserInfo(this.userInfo).then((response) => {
      this.$notify.showMessage({
        message: 'Bạn đã cập nhật thông tin cá nhân thành công!',
        color: 'success',
      })

      this.$store.dispatch(DispatchAction.SET_AUTH, this.userInfo)
      this.$router.push("/personal")
    })
  }

  public handleCancelClick() {
    this.openCancelDialog = true
  }

  public handleSubmitClick() {
    this.openConfirmDialog = true
  }
}
</script>
