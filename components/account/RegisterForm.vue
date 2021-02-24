<template>
  <v-layout d-flex column justify-center align-center class="login__layout">
    <div class="mb-6">
      <h1 class="white--text text-center mb-3">ĐĂNG KÝ</h1>
      <v-layout
        class="d-flex flex-column justify-content-center white rounded-xl pb-6"
      >
        <v-autocomplete
          v-model="form"
          name="type"
          :items="roles"
          item-text="text"
          item-value="role_id"
          filled
          light
          label="Bạn đăng ký theo tư cách"
        ></v-autocomplete>
        <tenant-register-form
          v-if="form == 'Tenant'"
          @submit="registerTenant"
        ></tenant-register-form>
        <owner-register-form
          v-else-if="form == 'Owner'"
          @submit="registerOwner"
        ></owner-register-form>
      </v-layout>
    </div>
  </v-layout>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ROLE } from '@/constants/app.constant'
import TenantRegisterForm from '@/components/account/TenantRegisterForm.vue'
import OwnerRegisterForm from '@/components/account/OwnerRegisterForm.vue'
import { OwnerRegisterDTO, TenantRegisterDTO } from '~/constants/app.interface'
import AuthRepository from '@/repositories/AuthRepository'

// eslint-disable-next-line no-use-before-define
@Component<RegisterForm>({
  name: 'RegisterForm',
  // eslint-disable-next-line no-undef
  components: {
    TenantRegisterForm,
    OwnerRegisterForm,
  },
  // eslint-disable-next-line no-undef
})
export default class RegisterForm extends Vue {
  $notify: any
  private form = ROLE.TENANT

  private roles: object[] = [
    {
      role_id: ROLE.TENANT,
      text: 'Người thuê',
    },
    {
      role_id: ROLE.OWNER,
      text: 'Chủ trọ',
    },
  ]

  public async registerTenant(registerInfo: TenantRegisterDTO) {
    if (registerInfo) {
      await AuthRepository.registerTenant(registerInfo)
        .then((response) => {
          this.$router.push('/register/complete')
        })
        .catch((error) => {
          this.$notify.showMessage({
            message: error.response.data,
            color: 'red',
          })
        })
    }
  }

  public async registerOwner(data: OwnerRegisterDTO) {
    if (data) {
      await AuthRepository.registerOwner(data)
        .then((response) => {
          this.$router.push('/register/complete')
        })
        .catch((error) => {
          this.$notify.showMessage({
            message: error.response.data,
            color: 'red',
          })
        })
    }
  }
}
</script>
