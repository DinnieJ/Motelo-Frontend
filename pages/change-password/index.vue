<template>
  <v-container>
    <v-layout class="d-flex column justify-center pa-4">
      <h1 class="text-center primary--text display-1">Đổi mật khẩu</h1>
      <validation-observer ref="formObserver" v-slot="{ invalid }">
        <v-form>
          <v-row>
            <v-col cols="10" offset="1" offset-sm="3" sm="6">
              <validation-provider
                v-slot="{ errors }"
                name="oldPassword"
                :rules="rules.oldPassword"
              >
                <v-text-field
                  v-model="oldPassword"
                  type="password"
                  label="Mật khẩu cũ"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10" offset="1" offset-sm="3" sm="6">
              <validation-provider
                v-slot="{ errors }"
                name="newPassword"
                :rules="rules.newPassword"
                vid="password"
              >
                <v-text-field
                  v-model="newPassword"
                  type="password"
                  label="Mật khẩu mới"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="10" offset="1" offset-sm="3" sm="6">
              <validation-provider
                v-slot="{ errors }"
                name="confirmPassword"
                :rules="rules.confirmPassword"
              >
                <v-text-field
                  v-model="confirmPassword"
                  type="password"
                  label="Xác thực mật khẩu mới"
                  :error-messages="errors"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col offset="1" offset-sm="3">
              <v-btn
                color="primary"
                :disabled="invalid"
                :loading="loading"
                @click="submit"
                >Đổi mật khẩu</v-btn
              >
              <v-btn color="secondary" @click="back">Hủy bỏ</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode,
} from 'vee-validate'
import { min, max, required, confirmed } from 'vee-validate/dist/rules'
import AuthRepository from '@/repositories/AuthRepository'

setInteractionMode('aggressive')

extend('required', {
  ...required,
  message: 'Bạn không được để trống trường này',
})

extend('min', {
  ...min,
  message: 'Mật khẩu phải dài hơn 8 ký tự',
})

extend('max', {
  ...max,
  message: 'Mật khẩu phải ít hơn 32 ký tự',
})

extend('confirmed', {
  ...confirmed,
  message: 'Mật khẩu mới không khớp',
})

@Component<ChangePassword>({
  name: 'ChangePassword',

  components: {
    ValidationObserver,
    ValidationProvider,
  },

  middleware: ['checkAuthen'],
})
export default class ChangePassword extends Vue {
  $notify: any
  private oldPassword: string = ''
  private newPassword: string = ''
  private confirmPassword: string = ''

  private loading: boolean = false

  private rules: any = {
    oldPassword: { required: true, min: 8, max: 32 },
    newPassword: { required: true, min: 8, max: 32 },
    confirmPassword: {
      required: true,
      min: 8,
      max: 32,
      confirmed: 'password',
    },
  }

  public async submit() {
    this.loading = true
    await AuthRepository.changePassword(this.oldPassword, this.newPassword)
      .then((response) => {
        this.$notify.showMessage({
          message: 'Thay đổi mật khẩu thành công',
          color: 'success',
        })

        this.$router.go(-1)
      })
      .catch((err) => {
        this.$notify.showMessage({
          message: err.response.data.message,
          color: 'red',
        })
      })
      .finally(() => {
        this.loading = false
      })
  }

  public back() {
    this.$router.go(-1)
  }
}
</script>