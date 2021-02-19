<template>
  <v-container fluid>
    <v-layout d-flex column justify-center align-center class="login__layout">
      <login-form 
        :loading="loading"
        @submit="handleSubmit"/>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginForm from '@/components/account/LoginForm.vue'
import { DispatchAction } from '@/constants/app.vuex' 
import { LoginDTO } from '@/constants/app.interface'
import { ROLE } from '@/constants/app.constant'
// eslint-disable-next-line no-use-before-define
@Component<Login>({
  name: 'Login',
  // eslint-disable-next-line no-undef
  components: {
    LoginForm,
  },
  // eslint-disable-next-line no-undef
  layout: 'empty',
})
export default class Login extends Vue {
  private loading: boolean = false;
  $notify: any;
  public async handleSubmit(loginInfo: LoginDTO) {
    this.loading = true
    const responseDataLogin = await this.$store.dispatch(DispatchAction.LOGIN, loginInfo)
    // console.log('response login = ', responseDataLogin)
    if(responseDataLogin) {
      if (responseDataLogin === ROLE.TENANT) {
        this.$router.push('/')
      } else if (responseDataLogin === ROLE.OWNER) {
        this.$router.push('/owner/home')
      }
    } else {
      // console.log('wrong cred = ', this);
      this.$notify.showMessage({ message: "Sai role hoặc email hoặc password", color:"red" })
    }
    this.loading = false
  }
}
</script>