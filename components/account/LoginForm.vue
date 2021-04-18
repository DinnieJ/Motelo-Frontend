<template>
  <section class="auth__section pa-2">
    <h1 class="primary--text text-center auth__title">ĐĂNG NHẬP</h1>

    <validation-observer ref="formObserver" v-slot="{ invalid }">
      <v-form
        class="mt-3 d-flex flex-column"
      >
        <v-select
          v-model="loginInfo.role"
          :items="roles"
          item-text="text"
          item-value="role_id"
          outlined
          label="Bạn đăng nhập theo tư cách"
        ></v-select>
        <validation-provider
          mode="eager"
          v-slot="{ errors }"
          name="email"
          :rules="rules.email"
        >
          <v-text-field
            label="Email"
            v-model="loginInfo.email"
            outlined
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <validation-provider
          mode="eager"
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
            outlined
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
        <p class="mt-5 text-center">Chưa có tài khoản? Bấm <span class="text-primary"><nuxt-link to="/register">vào đây</nuxt-link></span> để đăng kí</p>
        <nuxt-link to="/forgot-password" class="text-center mt-5">Quên mật khẩu</nuxt-link>
        <v-img :lazy-src="loadingImg" src="/imgs/undraw_city_life_gnpr.svg" />
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
import { ROLE, LOADING_IMG } from '@/constants/app.constant'

setInteractionMode("aggressive")

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

  created() {
    
  }
  // eslint-disable-next-line no-undef
})
export default class LoginForm extends Vue {
  private loginInfo: LoginDTO = {
    email: '',
    password: '',
    role: ROLE.TENANT, // default
  }

  private loadingImg: string = LOADING_IMG

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
      role_id: ROLE.COLLABORATOR,
      text: 'Cộng tác viên',
    },
  ]

  @Prop({ required: true }) readonly loading!: boolean

  /**
   * submitLoginForm
   */
  @Emit()
  public submit() {
    return this.loginInfo
  }
}
</script>