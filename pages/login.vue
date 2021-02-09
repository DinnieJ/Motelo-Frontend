<template>
  <v-container fluid>
    <v-layout d-flex column justify-center align-center class="login__layout">
      <h1 class="white--text text-center">ĐĂNG NHẬP</h1>
      <validation-observer ref="formObserver" v-slot="{ invalid }">
        <v-form
          class="mt-3 d-flex flex-column justify-content-center white rounded-xl login__form"
        >
          <v-autocomplete :items="types" filled light label="Bạn đăng nhập theo tư cách"></v-autocomplete>
          <v-text-field
            v-model="loginInfo.email"
            label="Email"
            light
          ></v-text-field>
          <v-text-field
            v-model="loginInfo.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
          label="Password"
            light
            color="primary"
          ></v-text-field>

          <v-btn color="primary" :disabled="invalid" :loading="loading">
            Login
          </v-btn>
          <v-btn class="mt-3" light>
            <v-icon left>mdi-google</v-icon>
            Login with google
          </v-btn>
        </v-form>
      </validation-observer>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

// eslint-disable-next-line no-use-before-define
@Component<Login>({
  name: 'Login',
  // eslint-disable-next-line no-undef
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  // eslint-disable-next-line no-undef
  layout: 'empty',
})
export default class Login extends Vue {
  private loginInfo: any = {
    email: '',
    password: '',
  }

  private showPassword: boolean = false
  private loading: boolean = false
  private rules: any = {
    email: { required: true, email: true },
    password: { required: true, min: 8 },
  }

  private types: string[] = [
      'Người thuê',
      'Chủ trọ',
      'Cộng tác viên',
  ]
}
</script>
<style lang="scss">
.login {
  &__layout {
    min-height: 100vh;
    background-image: url('/imgs/anh_homepage.jpg');
    background-repeat: no-repeat;
    background-position: bottom center;
    background-size: cover;
  }

  &__form {
    padding: 40px;
  }
}
</style>
