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
    const userLogin = await this.$store.dispatch(DispatchAction.LOGIN, loginInfo)
    if(userLogin) {
      if (loginInfo.userType === 0) {
        this.$router.push('/')
      } else if (loginInfo.userType === 1) {
        this.$router.push('/owner/home')
      }
    } else {
      console.log('wrong cred = ', this);
      this.$notify.showMessage({ message: "Wrong email or password", color:"red" })
    }
    this.loading = false
  }
}
</script>