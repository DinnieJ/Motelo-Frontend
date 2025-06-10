<template>
  <v-container>
    <div class="banner--img text-center mt-5">
      <img ref="bannerImage" :src="image" />
    </div>
    <input
      ref="imageForm"
      type="file"
      accept="image/*"
      class="d-none"
      @change="onFileChange"
    />
    <v-btn
      v-show="editing"
      color="primary"
      fixed
      rounded
      dense
      width="180"
      class="banner--change-btn"
      @click="clickUpload"
      ><v-icon left dark>mdi-camera</v-icon>Chọn ảnh mới</v-btn
    >

    <v-row v-show="!editing" class="mt-5">
      <v-col offset="4" offset-sm="8">
        <v-btn color="primary" class="mr-2" @click="editing = true"
          ><v-icon left>mdi-wrench</v-icon>Sửa</v-btn
        >
        <v-btn
          color="red"
          class="white--text"
          @click="confirmDeleteDialog = true"
          ><v-icon left>mdi-trash-can</v-icon>Xóa</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="8" offset="2">
        <validation-observer ref="formObserver" v-slot="{ invalid }">
          <v-form>
            <validation-provider
              v-slot="{ errors }"
              name="title"
              :rules="rules.title"
            >
              <v-text-field
                v-model="banner.title"
                label="Tiêu đề"
                class="required"
                :error-messages="errors"
                :disabled="!editing"
                :outlined="!editing"
              />
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="url"
              :rules="rules.url"
            >
              <v-text-field
                v-model="banner.url"
                label="Đường link"
                class="required"
                :error-messages="errors"
                :disabled="!editing"
                :outlined="!editing"
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
                  v-model="banner.start_time"
                  label="Ngày bắt đầu sự kiện"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  :disabled="!editing"
                  :outlined="!editing"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="banner.start_time"
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
                  v-model="banner.end_time"
                  label="Ngày kết thúc sự kiện"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  :disabled="!editing"
                  :outlined="!editing"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="banner.end_time"
                no-title
                scrollable
                :min="banner.start_time"
              >
                <v-spacer></v-spacer>
              </v-date-picker>
            </v-menu>
          </v-form>
          <v-btn
            v-show="editing"
            color="primary"
            :disabled="invalid"
            :loading="loadingUpdate"
            @click="updateBanner"
            ><v-icon left>mdi-check</v-icon>Cập nhật</v-btn
          >
          <v-btn
            v-show="editing"
            color="red"
            class="white--text"
            @click="cancelUpdate"
            ><v-icon left>mdi-close</v-icon>Hủy bỏ</v-btn
          >
        </validation-observer>
      </v-col>
    </v-row>
    <v-dialog v-model="confirmDeleteDialog" max-width="370">
      <v-card>
        <v-card-title class="headline"> Xác nhận </v-card-title>
        <v-card-text>Bạn có muốn chắc chắn xóa banner này ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            :loading="loadingDelete"
            @click="deleteBanner"
          >
            Có
          </v-btn>
          <v-btn color="primary" text @click="confirmDeleteDialog = false">
            Không
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

@Component<BannerDetail>({
  name: 'BannerDetail',

  components: {
    ValidationObserver,
    ValidationProvider,
  },

  middleware: ['isCollaborator'],

  async created() {
    this.getBanner()
  },
})
export default class BannerDetail extends Vue {
  $notify: any
  private menu1: boolean = false
  private menu2: boolean = false
  private rules: any = {
    title: { required: true },
    url: { required: true },
  }

  private editing: boolean = false
  private confirmDeleteDialog: boolean = false
  private loadingDelete: boolean = false
  private loadingUpdate: boolean = false
  private banner: any = {
    title: '',
    url: '',
    start_time: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    end_time: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
  }

  private image: any = ''
  private updatedImage: boolean = false

  public async cancelUpdate() {
    await this.getBanner()
    this.editing = false
  }

  public async getBanner() {
    await BannerRepository.getBanner(this.$route.params.id).then((response) => {
      this.banner = response.data
      this.image = response.data.image
    })
  }

  public async updateBanner() {
    this.loadingUpdate = true
    const formData = new FormData()
    Object.keys(this.banner).forEach((item) => {
      formData.append(item, this.banner[item])
    })

    if (this.updatedImage) {
      formData.append('image', this.image)
    }

    await BannerRepository.updateBanner(this.$route.params.id, formData)
      .then((response) => {
        this.$notify.showMessage({
          message: response.data.message,
          color: 'success',
        })
      })
      .catch((err) => {
        this.$notify.showMessage({
          message: 'Có lỗi xảy ra trong hệ thống',
          color: 'red',
        })
      })
      .finally(() => {
        this.loadingUpdate = false
        this.editing = false
      })
  }

  public async deleteBanner() {
    this.loadingDelete = true
    await BannerRepository.deleteBanner(this.$route.params.id)
      .then((response) => {
        this.$notify.showMessage({
          message: 'ok',
          color: 'success',
        })
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        this.loadingDelete = false
        this.$router.push('/banner')
      })
  }

  @Watch('banner.start_time')
  public changeTime() {
    if (new Date(this.banner.start_time) > new Date(this.banner.end_time)) {
      this.banner.end_time = this.banner.start_time
    }
  }

  onFileChange(e: any) {
    this.image = null
    const vm: any = this
    this.image = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      vm.$refs.bannerImage.src = reader.result
    }
    reader.readAsDataURL(this.image)
    this.updatedImage = true
  }

  clickUpload(e: Event) {
    e.preventDefault()
    const input = this.$refs.imageForm as any
    input.click()
  }
}
</script>