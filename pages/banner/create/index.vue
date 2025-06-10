<template>
  <v-container>
    <h1>Tạo banner sự kiện mới</h1>
    <validation-observer ref="formObserver" v-slot="{ invalid }">
      <v-form>
        <validation-provider
          v-slot="{ errors }"
          name="email"
          :rules="rules.title"
        >
          <v-text-field
            v-model="formData.title"
            label="Tiêu đề"
            class="required"
            :error-messages="errors"
          />
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="email"
          :rules="rules.url"
        >
          <v-text-field
            v-model="formData.url"
            label="Đường link"
            class="required"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <v-menu
          ref="menu1"
          v-model="menu1"
          close-on-content-click
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="formData.start_time"
              label="Ngày bắt đầu sự kiện"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="formData.start_time"
            no-title
            scrollable
            :min="new Date().toJSON().slice(0, 10).replace(/-/g, '-')"
          >
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
        <v-menu
          ref="menu2"
          v-model="menu2"
          close-on-content-click
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="formData.end_time"
              label="Ngày kết thúc sự kiện"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="formData.end_time"
            no-title
            scrollable
            :min="formData.start_time"
          >
            <v-spacer></v-spacer>
          </v-date-picker>
        </v-menu>
        <input
          ref="imageForm"
          type="file"
          accept="image/*"
          class="d-none"
          @change="onFileChange"
        />
        <v-card class="mb-12" color="" elevation="2" min-height="200px">
          <v-card-title
            v-if="formData.image == null"
            primary-title
            class="justify-center"
          >
            <h3 class="headline primary--text justify-center">
              Tải ảnh lên tại đây
            </h3>
          </v-card-title>
          <v-layout v-else d-flex row wrap justify-center class="mt-2">
            <div class="d-flex flex-column align-center ml-2 mr-2 pa-2">
              <img :ref="'image'" class="image-box" />
            </div>
          </v-layout>
          <v-card-actions class="justify-center">
            <v-btn v-if="!formData.image" color="primary" @click="clickUpload">
              <v-icon left>mdi-upload</v-icon>
              Tải lên
            </v-btn>
            <v-btn v-else color="red" @click="removeImages">
              <v-icon left>mdi-delete</v-icon>
              Xóa
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-btn :disabled="invalid || !formData.image" class="primary" @click="createBanner"
          >Tạo mới</v-btn
        >
        <v-btn color="secondary" to="/banner">hủy</v-btn>
      </v-form>
    </validation-observer>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode,
} from 'vee-validate'

import { required } from 'vee-validate/dist/rules'
import BannerRepository from '@/repositories/BannerRepository'

setInteractionMode('aggressive')

extend('required', {
  ...required,
  message: 'Bạn không được để trống trường này',
})

@Component<CreateBanner>({
  name: 'CreateBanner',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class CreateBanner extends Vue {
  $notify: any
  private menu1: boolean = false
  private menu2: boolean = false
  private rules: any = {
    title: { required: true },
    url: { required: true },
  }

  private formData: any = {
    title: '',
    url: '',
    start_time: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    end_time: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    image: null,
  }

  public async createBanner() {
    const formData = new FormData()
    Object.keys(this.formData).forEach((item, i) => {
      formData.append(item, this.formData[item])
    })

    await BannerRepository.createBanner(formData)
      .then((response) => {
        this.$notify.showMessage({
          message: 'Tạo banner sự kiện thành công',
          color: 'success',
        })
        this.$router.push('/banner')
      })
      .catch((err) => {
        this.$notify.showMessage({
          message: 'Có lỗi xảy ra trong hệ thống',
          color: 'red',
        })
      })
  }

  onFileChange(e: any) {
    this.formData.image = null
    const vm: any = this
    this.formData.image = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      vm.$refs.image.src = reader.result
    }
    reader.readAsDataURL(this.formData.image)
  }

  clickUpload(e: Event) {
    e.preventDefault()
    const input = this.$refs.imageForm as any
    input.click()
  }

  removeImages() {
    const refs = this.$refs as any
    refs.imageForm.value = ''
    this.formData.image = null
  }

  @Watch('formData.start_time')
  public changeTime() {
    if (new Date(this.formData.start_time) > new Date(this.formData.end_time)) {
      this.formData.end_time = this.formData.start_time
    }
  }
}
</script>