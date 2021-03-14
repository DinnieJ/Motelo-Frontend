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
          :rules="rules.address"
        >
          <v-text-field
            v-model="registerInfo.address"
            label="Địa chỉ"
            name="address"
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
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="registerInfo.date_of_birth"
              label="Ngay sinh"
              light
              color="primary"
              readonly
              outlined
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
        <p>Liên lạc</p>
        <v-row
          v-for="(contact, i) in registerInfo.contact"
          :key="i"
          class="d-flex align-start"
        >
          <v-col cols="2" sm="1">
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <div
                  v-bind="attrs"
                  v-on="on"
                  class="d-flex justify-start align-center auth__select"
                >
                  <v-img
                    contain
                    max-width="2rem"
                    max-height="2rem"
                    :lazy-src="loadingImg"
                    :src="contactItems.filter(item => item.value == contact.type)[0].img"
                  />
                  <v-icon>mdi-menu-down</v-icon>
                </div>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in contactItems" :key="index" @click="contact.type = item.value">
                  <v-img
                    contain
                    max-width="2rem"
                    max-height="2rem"
                    :lazy-src="loadingImg"
                    :src="item.img"
                  />
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="8" sm="10" class="pl-6">
            <validation-provider
              v-slot="{ errors }"
              :name="`contact-${i}`"
              :rules="rules.date_of_birth"
            >
              <v-text-field
                outlined
                full-width
                v-model="contact.content"
                :error-messages="errors"
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col cols="1">
            <v-btn icon @click="removeContactBox(i)">
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-btn
          small
          @click="addContactBox"
          :disabled="registerInfo.contact.length >= 5"
          class="mb-3"
          >Thêm liên lạc</v-btn
        >
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
            outlined
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
            outlined
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
        <v-btn color="primary" to="/login">
          <v-icon left>mdi-arrow-left</v-icon>
          Quay lại đăng nhập
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
import { OwnerRegisterDTO, OwnerRegisterRule } from '@/constants/app.interface'
import { LOADING_IMG } from '@/constants/app.constant'

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
@Component<OwnerRegisterForm>({
  name: 'OwnerRegisterForm',
  // eslint-disable-next-line no-undef
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  mounted() {
    this.registerInfo.contact.push({
      type: 2,
      content: '',
    })
  },
})
export default class OwnerRegisterForm extends Vue {
  private registerInfo: OwnerRegisterDTO = {
    name: '',
    email: '',
    password: '',
    repassword: '',
    contact: [],
    address: '',
    date_of_birth: new Date().toISOString().substr(0, 10),
  }

  private loadingImg: string = LOADING_IMG

  $notify: any

  private showPassword: boolean = false
  @Prop() readonly loading!: boolean
  private rules: OwnerRegisterRule = {
    name: {
      required: true,
      regex: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]*$/,
    },
    email: { required: true, email: true },
    password: { required: true, min: 8 },
    repassword: { required: true, confirmed: 'password' },
    date_of_birth: { required: true },
    address: { required: true },
  }

  private contactItems = [
    {
      text: 'Email',
      value: 1,
      img: '/imgs/logo-mail.png',
    },
    {
      text: 'Điện thoại',
      value: 2,
      img: '/imgs/logo-phone.png',
    },
    {
      text: 'Zalo',
      value: 3,
      img: '/imgs/logo-zalo.jpg',
    },
    {
      text: 'Facebook',
      value: 4,
      img: '/imgs/logo-facebook.png',
    },
  ]
  private dateDialog = false

  private confirmPolicy: boolean = false

  public addContactBox() {
    this.registerInfo.contact.push({
      type: 1,
      content: '',
    })
  }

  public removeContactBox(index: any) {
    if (this.registerInfo.contact.length <= 1) {
      this.$notify.showMessage({
        message: 'Cần ít nhất 1 liên lạc',
        color: 'red',
      })
    } else {
      this.registerInfo.contact.splice(index, 1)
    }
  }
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
