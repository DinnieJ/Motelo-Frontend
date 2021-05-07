<template>
  <v-container>
    <v-layout d-flex justify-center class="rounded white">
      <div class="auth__section pa-2">
        <v-layout justify-space-between>
          <h1 class="primary--text ma-0 auth__title">ĐĂNG PHÒNG MỚI</h1>
          <v-btn color="secondary" text icon @click="closeDialog">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-layout>

        <v-tabs v-model="tab" grow centered center-active color="secondary">
          <v-tabs-slider color="secondary"> </v-tabs-slider>

          <v-tab
            v-for="(item, index) in tabHeaders"
            :key="index"
            :disabled="item.disabled"
          >
            <v-icon small class="mr-2">{{
              `mdi-numeric-${index + 1}-box`
            }}</v-icon>
            {{ item.header }}
          </v-tab>
          <v-tabs-items v-model="tab">
            <!-- Policy step -->
            <v-tab-item>
              <v-card rounded="lg" class="pa-4">
                <v-card-text v-html="policy"> </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="acceptPolicyEvent"
                    >đồng ý</v-btn
                  >
                  <v-btn color="warning" @click="acceptWarningDialog"
                    >từ chối</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <!-- Room basic info step -->
            <v-tab-item>
              <validation-observer ref="formObserver" v-slot="{ invalid }">
                <v-form>
                  <validation-provider
                    v-slot="{ errors }"
                    mode="eager"
                    name="title"
                    :rules="rules.required"
                  >
                    <v-text-field
                      v-model="formData.title"
                      name="title"
                      label="Tiêu đề"
                      class="required"
                      :error-messages="errors"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    mode="eager"
                    name="rent"
                    :rules="rules.required"
                  >
                    <v-layout align-center>
                      <v-text-field
                        v-model="price"
                        label="Tiền thuê"
                        min="0"
                        name="price"
                        @keypress="checkNumber($event)"
                        class="required"
                        :error-messages="errors"
                      ></v-text-field>
                      <span class="pb-1 ml-2">VNĐ/tháng</span>
                    </v-layout>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    mode="eager"
                    name="area"
                    :rules="rules.required"
                  >
                    <v-layout align-center>
                      <v-text-field
                        v-model="formData.acreage"
                        label="Diện tích"
                        type="number"
                        name="acreage"
                        @keypress="checkNumber($event)"
                        class="required"
                        :error-messages="errors"
                      ></v-text-field>
                      <span class="pb-1">m²</span>
                    </v-layout>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    mode="eager"
                    name="room_type"
                    :rules="rules.required"
                  >
                    <v-select
                      v-model="formData.room_type_id"
                      label="Loại phòng"
                      :items="roomTypes"
                      item-text="text"
                      item-value="id"
                      class="required"
                      :error-messages="errors"
                    ></v-select>
                  </validation-provider>
                  <v-textarea
                    v-model="formData.description"
                    label="Miêu tả thêm"
                    outlined
                    auto-grow
                    rows="4"
                  ></v-textarea>
                  <v-btn color="primary" @click="nextTab" :disabled="invalid">
                    Tiếp theo
                  </v-btn>
                </v-form>
              </validation-observer>
            </v-tab-item>
            <!-- Update image step -->
            <v-tab-item>
              <v-form class="mt-8">
                <input
                  ref="images"
                  type="file"
                  accept="image/*"
                  multiple="multiple"
                  class="d-none"
                  @change="onFileChange"
                />
                <v-row class="mb-4 justify-center">
                  <v-col v-for="(image, i) in images" :key="i" cols="12" sm="6">
                    <v-btn small block color="secondary" @click="clickDelete(i)"
                      >xóa</v-btn
                    >
                    <img ref="image" width="100%" height="auto" />
                  </v-col>
                </v-row>
                <v-layout justify-center>
                  <v-btn outlined color="primary" @click="clickUpload">
                    <v-icon left>mdi-upload</v-icon>
                    Tải lên
                  </v-btn>
                </v-layout>
                <v-layout justify-start class="mt-6">
                  <v-btn
                    class="mr-3"
                    color="primary"
                    :disabled="images.length == 0"
                    :loading="loading"
                    @click="submitForm"
                  >
                    Hoàn thành
                  </v-btn>
                  <v-btn class="mr-3" @click="preTab"> Trở lại </v-btn>
                </v-layout>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </div>
    </v-layout>
    <warning-dialog
      v-model="openWarningDialog"
      title="Thoát ra"
      content="Nếu bạn thoát bây giờ, đơn sẽ bị hủy.<br />Bạn có muốn thoát không ?"
      @accept="acceptWarningDialog"
      @refuse="refuseWarningDialog"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'vue-property-decorator'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode,
} from 'vee-validate'
import WarningDialog from '@/components/common/WarningDialog.vue'
import { TextIcon } from '@/constants/app.interface'
import { ROOM_TYPES, GENDER, CAPACITY } from '@/constants/app.constant'
import RoomReponsitory from '@/repositories/RoomRepository'
import { isNumber } from '@/utils/validation'
import { required } from 'vee-validate/dist/rules'

setInteractionMode('aggressive')

extend('required', {
  ...required,
  message: 'Bạn không được để trống trường này',
})

@Component<RoomCreateRequest>({
  name: 'RoomCreateRequest',
  // eslint-disable-next-line no-undef
  components: {
    WarningDialog,
    ValidationObserver,
    ValidationProvider,
  },
  middleware: ['authenticated', 'isOwner'],
})
export default class RoomCreateRequest extends Vue {
  private acceptPolicy: boolean = false
  private openWarningDialog: boolean = false
  $notify: any

  // when policy isn't accepted, disable all except policy
  private tabHeaders = [
    {
      header: 'Chính sách',
      disabled: false,
    },
    {
      header: 'Thông tin cơ bản',
      disabled: true,
    },
    {
      header: 'Đăng ảnh',
      disabled: true,
    },
  ]

  private rules: any = {
    required: { required: true },
  }

  private checkNumber = isNumber
  private roomTypes: TextIcon[] = ROOM_TYPES
  private genders: TextIcon[] = GENDER
  private capacityDefault = CAPACITY
  private policy: string = `CHỦ NHÀ TRỌ LƯU Ý <br />
      <b>Yêu cầu về thông tin phòng trọ<b /> <br />
      Bài đăng cho thuê sẽ bao gồm thông tin chung của nhà trọ và thông tin riêng của từng phòng <br />
      Chủ trọ phải đăng thông tin phòng trọ theo format dưới đây, đủ thông tin <br />
      1. Tiêu đề <br />
      2. Giá thuê <br />
      3. Diện tích <br />
      4. Loại phòng <br />
      5. Miêu tả thêm (Nếu có) <br />
      6. Ảnh riêng của phòng trọ <br />`

  private tab: number = 0
  private loading: boolean = false;

  set price(modifiedValue) {
    this.formData.price = modifiedValue.replace(/[^\d]/g, '')
  }

  get price() {
    if (this.formData.price) {
      return new Intl.NumberFormat().format(parseFloat(this.formData.price))
    }
    return ''
  }

  private formData = {
    title: '',
    price: '',
    room_type_id: '',
    gender_type_id: 1,
    owner_id: 0,
    description: '',
    acreage: '',
    capacity: [CAPACITY.MIN, CAPACITY.MAX],
  }

  private images: any[] = []

  public closeDialog() {
    this.openWarningDialog = true
  }

  public acceptPolicyEvent(event: Event) {
    this.acceptPolicy = true

    // if policy is accepted, disable policy, enable other
    const policyIndex = 0
    this.tabHeaders.forEach((item) => (item.disabled = false))
    this.tabHeaders[policyIndex].disabled = true
    this.tab = policyIndex + 1
  }

  public acceptWarningDialog() {
    this.openWarningDialog = false
    this.$router.push('/owner/requests')
  }

  public refuseWarningDialog() {
    this.openWarningDialog = false
  }

  public nextTab() {
    this.tab++
  }

  public preTab() {
    this.tab--
  }

  async submitForm() {
    this.loading = true
    const formData = new FormData()
    formData.append('title', this.formData.title)
    formData.append('room_type_id', this.formData.room_type_id)
    formData.append('price', this.formData.price.toString())
    formData.append('acreage', this.formData.acreage.toString())
    formData.append('gender_type_id', this.formData.gender_type_id.toString())
    formData.append('description', this.formData.description)

    this.images.forEach((image, i) => {
      formData.append(`images[${i}]`, image)
    })

    await RoomReponsitory.createRoom(formData)
      .then((response) => {
        this.$notify.showMessage({
          message: 'Đăng thành công',
          color: 'success',
        })
        setTimeout(() => {
          this.$router.push('/owner/requests')
        }, 400)
      })
      .catch((error) => {
        this.$notify.showMessage({
          message: 'Tạo không thành công',
          color: 'red',
        })
      })

      this.loading = false
  }

  clickUpload(e: Event) {
    e.preventDefault()
    const input = this.$refs.images as any
    input.click()
  }

  clickDelete(imgIndex: number) {
    this.images.splice(imgIndex, 1)
  }

  onFileChange(e: any) {
    const vm: any = this
    const selectedFiles = e.target.files
    for (let i = 0; i < selectedFiles.length; i++) {
      this.images.push(selectedFiles[i])
    }

    for (let i = 0; i < this.images.length; i++) {
      const reader = new FileReader()
      reader.onload = (e) => {
        vm.$refs.image[i].src = reader.result
      }

      reader.readAsDataURL(this.images[i])
    }
  }
}
</script>
