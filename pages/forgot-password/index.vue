<template>
  <v-container>
    <v-layout class="d-flex column justify-center pa-4">
      <h1 class="text-center primary--text display-1">Quên mật khẩu</h1>
      <v-row>
        <v-col cols="10" sm="4" offset="1" offset-sm="4">
          <v-select
            v-model="role"
            label="Vai trò"
            :items="roles"
            item-text="text"
            item-value="role_id"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10" sm="4" offset="1" offset-sm="4">
          <v-text-field v-model="email" label="Email" outlined />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10" sm="4" offset="1" offset-sm="4">
          <v-btn color="primary" width="100%" :loading="loading" @click="submit">Gửi mail xác thực</v-btn>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ROLE } from '~/constants/app.constant'
import AuthRepository from '@/repositories/AuthRepository'

@Component<ForgotPassword>({
  name: 'ForgotPassword',
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

  private role: string = ''
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