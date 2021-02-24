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
            light
            clearable
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
            light
            class="required"
            clearable
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="email"
          :rules="rules.name"
        >
          <v-text-field
            v-model="registerInfo.phone"
            label="Số điện thoại"
            name="phone"
            light
            class="required"
            clearable
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
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="registerInfo.date_of_birth"
              label="Ngay sinh"
              light
              color="primary"
              readonly
              class="required"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="registerInfo.date_of_birth"
            @input="dateDialog = false"
          ></v-date-picker>
        </v-menu>
        <validation-provider
          vid="password"
          v-slot="{ errors }"
          name="password"
          :rules="rules.password"
        >
          <v-text-field
            v-model="registerInfo.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            label="Mật khẩu"
            name="password"
            light
            clearable
            color="primary"
            class="required"
            :error-messages="errors"
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
            @click:append="showPassword = !showPassword"
            label="Nhập lại Mật khẩu"
            light
            clearable
            color="primary"
            class="required"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <v-checkbox
          v-model="confirmPolicy"
          label="Tôi đã đọc kĩ điểu khoản và đồng ý sử dụng"
        ></v-checkbox>
        <v-btn
          color="primary"
          :disabled="invalid"
          :loading="loading"
          @click="submit"
          class="my-2"
        >
          ĐĂNG KÝ
        </v-btn>
      </v-form>
    </validation-observer>
  </v-layout>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode,
} from 'vee-validate'
import { required, email, min, confirmed } from 'vee-validate/dist/rules'
import { ROLE } from '@/constants/app.constant'
import { TenantRegisterDTO } from '@/constants/app.interface'
import { TenantRegisterRule } from '@/constants/app.interface'

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
  private rules: TenantRegisterRule = {
    name: { required: true },
    email: { required: true, email: true },
    password: { required: true, min: 8 },
    repassword: { required: true, confirmed: 'password' },
    phone: { required: true },
    date_of_birth: { required: true },
  }
  private dateDialog = false

  private confirmPolicy: boolean = false

  @Emit()
  public async submit() {
    if (this.confirmPolicy) return this.registerInfo
    else {
      this.$notify.showMessage({
        message: 'Bạn cần phải chấp nhận điểu khoản',
        color: 'red',
      })
    }
  }
}
</script>
