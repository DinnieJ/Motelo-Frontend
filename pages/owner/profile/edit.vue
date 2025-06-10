<template>
  <v-container>
    <v-layout class="d-flex column align-center pa-3">
      <h1 class="primary--text text-h3 text-center">Cập nhật thông tin</h1>
      <div class="round-img mt-5 mb-5">
        <img ref="avatar" :src="avatar" />
      </div>
      <v-btn class="mb-5" color="primary" @click="uploadImage"
        ><v-icon left dark>mdi-camera</v-icon>Chọn ảnh mới</v-btn
      >
      <input
        ref="imageForm"
        type="file"
        accept="image/*"
        class="d-none"
        @change="onFileChange"
      />
      <validation-observer ref="formObserver" v-slot="{ invalid }">
        <v-layout d-flex column>
          <validation-provider
            v-slot="{ errors }"
            name="email"
            :rules="rules.name"
          >
            <v-text-field
              v-model="ownerInfo.name"
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
            :rules="rules.address"
          >
            <v-text-field
              v-model="ownerInfo.address"
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
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="ownerInfo.date_of_birth"
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
              v-model="ownerInfo.date_of_birth"
              :max="new Date().toJSON().slice(0, 10).replace(/-/g, '-')"
              @input="dateDialog = false"
            ></v-date-picker>
          </v-menu>
          <p>Liên lạc</p>
          <v-row
            v-for="(contact, i) in contacts"
            :key="i"
            class="d-flex align-start"
          >
            <v-col cols="2" sm="1" class="mr-1">
              <v-menu bottom offset-y>
                <template #activator="{ on, attrs }">
                  <div
                    v-bind="attrs"
                    class="d-flex justify-start align-center auth__select"
                    v-on="on"
                  >
                    <v-icon max-width="2rem" max-height="2rem">{{
                      contactItems.filter(
                        (item) => item.value == contact.contact_type_id
                      )[0].icon
                    }}</v-icon>
                    <v-icon>mdi-menu-down</v-icon>
                  </div>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in contactItems"
                    :key="index"
                    @click="contact.contact_type_id = item.value"
                  >
                    <v-icon max-width="2rem" max-height="2rem">{{
                      item.icon
                    }}</v-icon>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
            <v-col cols="7" sm="9" class="pl-6">
              <validation-provider
                v-slot="{ errors }"
                :name="`contact-${i}`"
                :rules="rules.date_of_birth"
              >
                <v-text-field
                  v-model="contact.content"
                  outlined
                  full-width
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
            :disabled="contacts.length >= 5"
            class="mb-3"
            @click="addContactBox"
            >Thêm liên lạc</v-btn
          >
          <v-btn
            color="primary"
            :disabled="invalid"
            :loading="loading"
            class="my-2"
            @click="submit"
          >
            Cập nhật
          </v-btn>
          <v-btn color="secondary" @click="cancelDialog = true">Hủy bỏ</v-btn>
        </v-layout>
      </validation-observer>
    </v-layout>
    <v-dialog v-model="cancelDialog" max-width="350">
      <v-card>
        <v-card-title class="headline"> Xác nhận </v-card-title>
        <v-card-text
          >Bạn có muốn chắc chắn quay lại khi chưa xác nhận thay đổi thông tin
          ?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="back"> Có </v-btn>
          <v-btn color="green darken-1" text @click="cancelDialog = false">
            Không
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode,
} from 'vee-validate'
import { required, min, regex } from 'vee-validate/dist/rules'
import AuthRepository from '@/repositories/AuthRepository'

extend('required', {
  ...required,
  message: 'Bạn không được để trống trường này',
})

extend('min', {
  ...min,
  message: 'Tên phải dài tối thiểu 8 kí tự',
})

extend('regex', {
  ...regex,
  message: 'Tên không được chứa số và kí tự đặc biệt',
})

@Component<UpdateOwner>({
  name: 'UpdateOwner',
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  async created() {
    await this.getOwnerInfo()
  },
})
export default class UpdateOwner extends Vue {
  $notify: any
  private cancelDialog: boolean = false
  private rules: any = {
    name: {
      required: true,
      regex: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]*$/,
    },
    date_of_birth: { required: true },
    address: { required: true },
  }

  private contactItems = [
    {
      text: 'Email',
      value: 1,
      icon: 'mdi-email',
    },
    {
      text: 'Điện thoại',
      value: 2,
      icon: 'mdi-phone-classic',
    },
    {
      text: 'Zalo',
      value: 3,
      icon: 'mdi-alpha-z-circle',
    },
    {
      text: 'Facebook',
      value: 4,
      icon: 'mdi-facebook',
    },
  ]

  private dateDialog = false
  private loading: boolean = false
  private ownerInfo: any = {
    name: '',
    address: '',
    date_of_birth: new Date().toISOString().substr(0, 10),
  }

  private avatar: any = '/imgs/default-profile.jpg'
  private updatedAvatar: boolean = false
  private contacts: any[] = []

  onFileChange(e: any) {
    this.avatar = null
    const vm: any = this
    this.avatar = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      vm.$refs.avatar.src = reader.result
    }
    reader.readAsDataURL(this.avatar)
    this.updatedAvatar = true
  }

  uploadImage(e: Event) {
    e.preventDefault()
    const input = this.$refs.imageForm as any
    input.click()
  }

  public addContactBox() {
    this.contacts.push({
      owner_id: this.$store.state.auth.user.id,
      contact_type_id: 1,
      content: '',
    })
  }

  public removeContactBox(index: any) {
    if (this.contacts.length <= 1) {
      this.$notify.showMessage({
        message: 'Cần ít nhất 1 liên lạc',
        color: 'red',
      })
    } else {
      this.contacts.splice(index, 1)
    }
  }

  public async getOwnerInfo() {
    await AuthRepository.getOwner()
      .then((response) => {
        this.ownerInfo = (({ name, address, date_of_birth }) => ({
          name,
          address,
          date_of_birth,
        }))(response.data)
        this.avatar = response.data.image
          ? response.data.image.image_url
          : '/imgs/default-profile.jpg'
        this.contacts = response.data.contacts
        console.log(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  public back() {
    this.$router.push('/owner/home')
  }

  async submit() {
    this.loading = true
    const formData = new FormData()
    Object.keys(this.ownerInfo).forEach((item) => {
      formData.append(item, this.ownerInfo[item])
    })

    if (this.updatedAvatar) {
      formData.append('image', this.avatar)
    }

    this.contacts.forEach((item, i) => {
      formData.append(`contacts[${i}]`, JSON.stringify(item))
    })

    await AuthRepository.updateOwnerInfo(formData)
      .then((response) => {
        this.$notify.showMessage({
          message: response.data.message,
          color: 'success',
        })

        this.$store.commit('auth/setUser', response.data.user)

        this.$router.push('/owner/home')
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
