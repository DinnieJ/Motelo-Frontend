<template>
  <v-layout d-flex column>
    <validation-observer ref="formObserver" v-slot="{ invalid }">
      <v-form
        class="d-flex flex-column justify-content-center white rounded-xl login__form"
      >
        <validation-provider
          v-slot="{ errors }"
          name="email"
          :rules="rules.name"
        >
          <v-text-field
            v-model="registerInfo.name"
            label="Tên"
            name="name"
            outlined
            class="required"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="email"
          :rules="rules.email"
        >
          <v-text-field
            v-model="registerInfo.email"
            label="Email"
            name="email"
            outlined
            class="required"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="email"
          :rules="rules.phone"
        >
          <v-text-field
            v-model="registerInfo.phone"
            label="Số điện thoại"
            name="phone"
            outlined
            class="required"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <v-menu
          v-model="dateDialog"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="registerInfo.date_of_birth"
              label="Ngày sinh"
              outlined
              color="primary"
              readonly
              class="required"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="registerInfo.date_of_birth"
            :max="new Date().toJSON().slice(0, 10).replace(/-/g, '-')"
            @input="dateDialog = false"
          ></v-date-picker>
        </v-menu>
        <validation-provider
          v-slot="{ errors }"
          vid="password"
          name="password"
          :rules="rules.password"
        >
          <v-text-field
            v-model="registerInfo.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Mật khẩu"
            name="password"
            outlined
            color="primary"
            class="required"
            :error-messages="errors"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="repassword"
          :rules="rules.repassword"
        >
          <v-text-field
            v-model="registerInfo.repassword"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Nhập lại Mật khẩu"
            outlined
            color="primary"
            class="required"
            :error-messages="errors"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </validation-provider>
        <v-checkbox v-model="confirmPolicy">
          <template #label>
            <div>
              Tôi đã đọc kĩ
                  <a
                    target="_blank"
                    href="/policy"
                    @click.stop
                  >
                    điều khoản
                  </a>
              và đồng ý sử dụng
            </div>
          </template>
        </v-checkbox>
        <v-btn
          color="primary"
          :disabled="invalid"
          :loading="loading"
          class="my-2"
          @click="register"
        >
          ĐĂNG KÝ
        </v-btn>
        <v-btn color="primary" to="/login">
          <v-icon left>mdi-arrow-left</v-icon>
          Quay lại đăng nhập
        </v-btn>
      </v-form>
    </validation-observer>
  </v-layout>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, PropSync } from 'vue-property-decorator'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode,
} from 'vee-validate'
import { required, email, min, confirmed, regex, numeric } from 'vee-validate/dist/rules'
import { ROLE } from '@/constants/app.constant'
import { TenantRegisterDTO , TenantRegisterRule } from '@/constants/app.interface'


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

extend('confirmed', {
  ...confirmed,
  message: 'Mật khẩu không khớp',
})

extend('regex', {
  ...regex,
  message: 'Khong duoc chua ki tu dac biet hoac so',
})

extend('numeric', {
  ...numeric,
  message: 'Số điện thoại phải nhập đúng định dạng'
})

// eslint-disable-next-line no-use-before-define
@Component<TenantRegisterForm>({
  name: 'TenantRegisterForm',
  // eslint-disable-next-line no-undef
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class TenantRegisterForm extends Vue {
  @PropSync('loading') asyncLoading!: boolean
  $notify: any
  private registerInfo: TenantRegisterDTO = {
    name: '',
    email: '',
    password: '',
    repassword: '',
    phone: '',
    date_of_birth: new Date().toISOString().substr(0, 10),
  }

  private showPassword: boolean = false
  @Prop() readonly loading!: boolean
  private rules: any = {
    name: {
      required: true
    },
    email: { required: true, email: true },
    password: { required: true, min: 8 },
    repassword: { required: true, confirmed: 'password' },
    phone: { required: true, numeric: true },
    date_of_birth: { required: true },
  }

  private dateDialog = false

  private confirmPolicy: boolean = false
  public async register() {
    if (this.confirmPolicy) {
      await this.submit()
    } else {
      this.$notify.showMessage({
        message: 'Bạn cần phải chấp nhận điểu khoản',
        color: 'red',
      })
    }
  }

  @Emit()
  public async submit() {
    return this.registerInfo
  }
}
</script>
