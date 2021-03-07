<template>
  <v-container fluid>
    <v-card class="grey lighten-3">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Thiết lập tài khoản</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text color="warning" @click="handleCancelClick()">
            Hủy bỏ
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-row class="mt-5 justify-center align-center">
        <v-col cols="12" md="6">
          <validation-observer ref="formObserver" v-slot="{ invalid }">
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
                      name="email"
                      :rules="rules.email"
                    >
                      <v-text-field
                        class="text-h5"
                        label="Email"
                        v-model="userInfo.email"
                        :error-messages="errors"
                        readonly
                        disabled
                      ></v-text-field>
                    </validation-provider>
                  </div>
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
                        :error-messages="errors"
                      ></v-text-field>
                    </validation-provider>
                  </div>
                  <div v-if="userInfo.date_of_birth">
                    <v-menu
                      v-model="dateDialog"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="userInfo.date_of_birth"
                          label="Ngay sinh"
                          light
                          color="primary"
                          readonly
                          class="required"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="userInfo.date_of_birth"
                        @input="dateDialog = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                  <div v-if="userInfo.phone_number">
                    <validation-provider
                      v-slot="{ errors }"
                      name="name"
                      :rules="rules.phone_number"
                    >
                      <v-text-field
                        class="text-h5"
                        label="Số điện thoại"
                        v-model="userInfo.phone_number"
                        :error-messages="errors"
                      ></v-text-field>
                    </validation-provider>
                  </div>
                  <v-layout justify-end class="mt-5">
                    <v-btn
                      rounded
                      outlined
                      :disabled="invalid"
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
          </validation-observer>
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
import { ValidationProvider, extend, setInteractionMode, ValidationObserver } from 'vee-validate'
import { Component, Vue } from 'vue-property-decorator'
import PolicyCard from '@/components/common/PolicyCard.vue'
import InnUpdateSteppers from '@/components/inn/InnUpdateSteppers.vue'
import WarningDialog from '@/components/common/WarningDialog.vue'
import { LoginRule, UserInfoDTO } from '@/constants/app.interface'
import PersonalRepository from '@/repositories/PersonalRepository'
import { TenantRegisterRule } from '@/constants/app.interface'
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
    ValidationObserver
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
      regex: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]*$/,
    },
    email: { required: true, email: true },
    phone_number: { required: true, numeric: true },
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
    this.$router.go(-1)
  }

  public async acceptConfirmDialog() {
    await PersonalRepository.updateUserInfo(this.userInfo).then((response) => {
      this.$notify.showMessage({
        message: 'Bạn đã cập nhật thông tin cá nhân thành công!',
        color: 'success',
      })

      this.$store.dispatch(DispatchAction.SET_AUTH, this.userInfo)
      this.$router.go(-1)
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
