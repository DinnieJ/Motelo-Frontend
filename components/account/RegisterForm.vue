<template>
  <v-layout d-flex column justify-center align-center class="login__layout">
    <h1 class="white--text text-center">ĐĂNG KÝ</h1>
    <validation-observer ref="formObserver" v-slot="{ invalid }">
      <v-form
        class="mt-3 d-flex flex-column justify-content-center white rounded-xl login__form"
      >
        <v-autocomplete
          v-model="registerInfo.role"
          name="type"
          :items="roles"
          item-text="text"
          item-value="role_id"
          filled
          light
          class="required"
          label="Bạn đăng ký theo tư cách"
        ></v-autocomplete>
        <validation-provider
          v-slot="{ errors }"
          name="name"
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
        <v-layout align-center>
          <v-img src="/imgs/logo-zalo.jpg" contain width="50" class="mr-3" />
          <v-text-field
            v-model="registerInfo.zalo"
            label="Zalo"
            name="zalo"
            light
            clearable
            color="primary"
          ></v-text-field>
        </v-layout>
        <v-layout align-center>
          <v-img
            src="/imgs/logo-facebook.png"
            contain
            width="50"
            class="mr-3"
          />
          <v-text-field
            v-model="registerInfo.facebook"
            label="Facebook"
            name="facebook"
            light
            clearable
            color="primary"
          ></v-text-field>
        </v-layout>
        <v-layout align-center v-for="(phone, index) in phones" :key="index">
          <v-img src="/imgs/logo-phone.png" contain width="50" class="mr-3" />
          <v-text-field
            v-model="registerInfo.phone"
            :label="`Điện thoại ${index + 1}`"
            name="phone"
            light
            clearable
            color="primary"
          ></v-text-field>
        </v-layout>
        <v-btn block x-small @click="addMorePhone()" color="info" class="mb-5"
          >Thêm số điện thoại (Nếu có)</v-btn
        >
        <v-btn
          color="primary"
          :disabled="invalid"
          :loading="loading"
          @click="submit"
          class="my-2"
        >
          ĐĂNG KÝ
        </v-btn>
        <v-btn>
          <v-icon left>mdi-google</v-icon>
          Register with google
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
import { RegisterDTO } from '@/constants/app.interface'
import { RegisterRule } from '@/constants/app.interface'

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
  message: "Mật khẩu không khớp"
})

// eslint-disable-next-line no-use-before-define
@Component<RegisterForm>({
  name: 'RegisterForm',
  // eslint-disable-next-line no-undef
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  // eslint-disable-next-line no-undef
  layout: 'empty',
})
export default class RegisterForm extends Vue {
  private registerInfo: RegisterDTO = {
    name: '',
    email: '',
    password: '',
    repassword: '',
    role: ROLE.TENANT, // default
    zalo: '',
    facebook: '',
    phone: '',
  }

  private showPassword: boolean = false
  @Prop({ required: true }) readonly loading!: boolean
  private rules: RegisterRule = {
    name: { required: true },
    email: { required: true, email: true },
    password: { required: true, min: 8 },
    repassword: { required: true, confirmed: "password"}
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
  ]

  private phones: string[] = ['']

  public addMorePhone() {
    this.phones.push('')
  }

  @Emit()
  public async submit() {
    return this.registerInfo
  }
}
</script>
