<template>
  <v-container>
    <v-layout class="d-flex column justify-center pa-4">
      <div class="pa-2">
        <h1 class="text-center primary--text display-1">Quên mật khẩu</h1>
        <validation-observer ref="formObserver" v-slot="{ invalid }">
          <v-form class="mt-3 d-flex flex-column">
            <v-select
              v-model="role"
              label="Vai trò"
              :items="roles"
              item-text="text"
              item-value="role_id"
              outlined
            />
            <validation-provider
              v-slot="{ errors }"
              mode="eager"
              name="email"
              :rules="rules.email"
            >
              <v-text-field
                v-model="email"
                label="Email"
                outlined
                class="required"
                :error-messages="errors"
              />
            </validation-provider>
            <v-btn
              color="primary"
              :disabled="invalid"
              :loading="loading"
              @click="submit"
              >Gửi mail xác thực</v-btn
            >
          </v-form>
        </validation-observer>
      </div>
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
import AuthRepository from '@/repositories/AuthRepository'
import { ROLE } from '~/constants/app.constant'
import { required, email } from 'vee-validate/dist/rules'

setInteractionMode('aggressive')

extend('required', {
  ...required,
  message: 'Bạn không được để trống trường này',
})

extend('email', {
  ...email,
  message: 'Vui lòng nhập đúng email của bạn',
})
@Component<ForgotPassword>({
  name: 'ForgotPassword',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class ForgotPassword extends Vue {
  $notify: any
  private roles: any = [
    {
      role_id: ROLE.TENANT,
      text: 'Người thuê',
    },
    {
      role_id: ROLE.OWNER,
      text: 'Chủ trọ',
    },
    {
      role_id: ROLE.COLLABORATOR,
      text: 'Cộng tác viên',
    },
  ]

  private rules: any = {
    email: { required: true, email: true }
  }

  private role: string = ROLE.TENANT
  private email: string = ''
  private loading: boolean = false

  public async submit() {
    this.loading = true
    await AuthRepository.forgotPassword(this.role, this.email)
      .then(response => {
        this.$notify.showMessage({
          message: 'Vui lòng kiểm tra mail của bạn',
          color: 'success'
        })
        this.$router.push('/login')
      }).catch(error => {
        this.$notify.showMessage({
          message: error.response.data.message,
          color: 'red'
        })
      }).finally(() => {
        this.loading = false
      })
  }
}
</script>