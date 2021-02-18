
<template>
  <section>
    <h1 class="white--text text-center">ĐĂNG NHẬP</h1>
    <v-form
      class="mt-3 d-flex flex-column justify-content-center white rounded-xl login__form"
    >
      <v-autocomplete
        :items="types"
        filled
        light
        label="Bạn đăng nhập theo tư cách"
      ></v-autocomplete>
      <v-text-field label="Email" light></v-text-field>
      <v-text-field
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        light
        color="primary"
      ></v-text-field>

      <v-btn color="primary" :disabled="invalid" :loading="loading">
        Đăng nhập
      </v-btn>
      <v-btn class="mt-3" light>
        <v-icon left>mdi-google</v-icon>
        Login with google
      </v-btn>
      <nuxt-link to="/register" class="mt-5 text-center"
        >Đăng kí nếu chưa có tài khoản</nuxt-link
      >
    </v-form>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

// eslint-disable-next-line no-use-before-define
@Component<LoginForm>({
  name: 'LoginForm',
  // eslint-disable-next-line no-undef
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  // eslint-disable-next-line no-undef
})
export default class LoginForm extends Vue {
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

  private types: string[] = ['Người thuê', 'Chủ trọ', 'Cộng tác viên']
}
</script>
