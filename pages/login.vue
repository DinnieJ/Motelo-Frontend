<template>
  <v-container>
    <v-layout d-flex justify-center class="rounded white">
      <login-form :loading="loading" @submit="handleSubmit" />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginForm from '@/components/account/LoginForm.vue'
import { Getter, DispatchAction } from '@/constants/app.vuex'
import { LoginDTO } from '@/constants/app.interface'
import { ROLE } from '@/constants/app.constant'
import { mapGetters } from 'vuex'
// eslint-disable-next-line no-use-before-define
@Component<Login>({
  name: 'Login',
  // eslint-disable-next-line no-undef
  components: {
    LoginForm,
  },
  computed: {
    ...mapGetters({
      token: Getter.TOKEN
    }),
  },
  async created() {
    const context: any = this
    if (context.token) {
      await this.$store.dispatch(DispatchAction.LOGOUT)
    } else {
      await this.$store.dispatch(DispatchAction.CLEAR_AUTH)
    }
  },
})
export default class Login extends Vue {
  private loading: boolean = false
  $notify: any
  public async handleSubmit(loginInfo: LoginDTO) {
    this.loading = true
    const login = await this.$store.dispatch(DispatchAction.LOGIN, loginInfo)
    if (!login) {
      this.$notify.showMessage({
        message: 'Sai email hoặc mật khẩu',
        color: 'red',
      })
    } else {
      const role = this.$store.state.auth.role
      switch(role) {
        case ROLE.TENANT:
          this.$router.push('/')
          break
        case ROLE.OWNER:
          this.$router.push('/owner/home')
          break
        case ROLE.COLLABORATOR:
          this.$router.push('/map')
          break
      }
    }
    this.loading = false
  }
}
</script>