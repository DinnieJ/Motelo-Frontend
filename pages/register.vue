<template>
  <v-container fluid>
    <v-layout d-flex column justify-center align-center class="login__layout">
      <h1 class="white--text text-center">ĐĂNG KÝ</h1>
      <validation-observer ref="formObserver" v-slot="{ invalid }">
        <v-form
          class="mt-3 d-flex flex-column justify-content-center white rounded-xl login__form"
        >
          <v-autocomplete
            name="type"
            :items="types"
            filled
            light
            clearable
            class="required"
            label="Bạn đăng ký theo tư cách"
          ></v-autocomplete>
          <v-text-field
            label="Tên"
            name="name"
            light
            clearable
            class="required"
          ></v-text-field>
          <v-text-field
            v-model="loginInfo.email"
            label="Email"
            name="email"
            light
            class="required"
            clearable
          ></v-text-field>
          <v-text-field
            v-model="loginInfo.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Mật khẩu"
            name="password"
            light
            clearable
            color="primary"
            class="required"
          ></v-text-field>
          <v-text-field
            v-model="loginInfo.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Nhập lại Mật khẩu"
            light
            clearable
            color="primary"
            class="required"
          ></v-text-field>
          <v-layout align-center>
            <v-img src="/imgs/logo-zalo.jpg" contain width="50" class="mr-3" />
            <v-text-field
              label="Zalo"
              name="zalo"
              light
              clearable
              color="primary"
            ></v-text-field>
          </v-layout>
          <v-layout align-center>
            <v-img src="/imgs/logo-facebook.png" contain width="50" class="mr-3" />
            <v-text-field
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
              :label="`Điện thoại ${index + 1}`"
              name="phone"
              light
              clearable
              color="primary"
            ></v-text-field>
          </v-layout>
          <v-btn block x-small @click="addMorePhone()">Thêm số điện thoại (Nếu có)</v-btn>
          <v-btn
            color="primary"
            :disabled="invalid"
            :loading="loading"
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
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

// eslint-disable-next-line no-use-before-define
@Component<Register>({
  name: 'Login',
  // eslint-disable-next-line no-undef
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  // eslint-disable-next-line no-undef
  layout: 'empty',
})
export default class Register extends Vue {
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

  private types: string[] = ['Người thuê', 'Chủ trọ']
  private phones: string[] = ['']

  public addMorePhone() {
    this.phones.push('')
  }
}
</script>
<style lang="scss">
.login {
  &__layout {
    min-height: 100vh;
    background-image: url('/imgs/anh_homepage.jpg');
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
  }

  &__form {
    padding: 40px;
  }
}
</style>
