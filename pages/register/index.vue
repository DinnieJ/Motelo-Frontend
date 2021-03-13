<template>
  <v-container>
    <register-form :loading="loading" @submit="handleSubmit" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RegisterForm from '@/components/account/RegisterForm.vue'
import { DispatchAction } from '@/constants/app.vuex'
import { LoginDTO, TenantRegisterDTO } from '@/constants/app.interface'

// eslint-disable-next-line no-use-before-define
@Component<Register>({
  name: 'Register',
  // eslint-disable-next-line no-undef
  components: {
    RegisterForm,
  },
})
export default class Register extends Vue {
  private loading: boolean = false
  $notify: any
  public async handleSubmit(registerInfo: TenantRegisterDTO) {
    this.loading = true;
    const responseDataRegister = await this.$store.dispatch(DispatchAction.REGISTER, registerInfo)
    if (responseDataRegister) {
      this.$router.push("/login");
    } else {
      this.$notify.showMessage({ message: "Đăng kí không thành công", color: "red"})
    }
    this.loading = false;
  }
}
</script>
