<template>
  <section>
    <h1 class="white--text text-center">ĐĂNG NHẬP</h1>
    <validation-observer ref="formObserver" v-slot="{ invalid }">
      <v-form
        class="mt-3 d-flex flex-column justify-content-center white rounded-xl login__form"
      >
        <v-autocomplete
          v-model="loginInfo.role"
          :items="roles"
          item-text="text"
          item-value="role_id"
          filled
          light
          label="Bạn đăng nhập theo tư cách"
        ></v-autocomplete>
        <validation-provider
          v-slot="{ errors }"
          name="email"
          :rules="rules.email"
        >
          <v-text-field
            label="Email"
            v-model="loginInfo.email"
            light
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="password"
          :rules="rules.password"
        >
          <v-text-field
            v-model="loginInfo.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            label="Password"
            light
            color="primary"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <v-btn
          color="primary"
          :disabled="invalid"
          :loading="loading"
          @click="submit"
        >
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
    </validation-observer>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ValidationObserver, ValidationProvider, extend, setInteractionMode } from 'vee-validate'
import { LoginDTO } from '@/constants/app.interface'
import { required, email, min, max } from 'vee-validate/dist/rules'
import { LoginRule } from '@/constants/app.interface'
import { ROLE } from '@/constants/app.constant'


setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'Bạn không được để trống trường này',
})

extend('email', {
  ...email,
  message: 'Vui lòng nhập đúng email của bạn',
})

extend('min', {
  ...min,
  message: 'Mật khẩu phải dài hơn 8 ký tự',
})

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
  private loginInfo: LoginDTO = {
    email: '',
    password: '',
    role: ROLE.TENANT, // default
  }
  private showPassword: boolean = false
  private rules: LoginRule = {
    email: { required: true, email: true },
    password: { required: true, min: 8 },
  }
  private roles: object[] = [
    {
      role_id: ROLE.TENANT,
      text: 'Người thuê',
    },
    {
      role_id: ROLE.OWNER,
      text: 'Chủ trọ',
    },
    {
      role_id: ROLE.COLLAORATOR,
      text: 'Cộng tác viên',
    },
  ]

  @Prop({ required: true }) readonly loading!: boolean

  /**
   * submitLoginForm
   */
  @Emit()
  public async submit() {
    return this.loginInfo
  }
}
</script>