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
            <v-tab-item>
              <v-card rounded="lg" class="pa-4">
                <v-card-text>
                  {{ policy }}
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="nextTab">đồng ý</v-btn>
                  <v-btn color="warning" @click="refuseWarningDialog"
                    >từ chối</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-form @submit="submitBasicRoomData">
                <v-text-field name="title" label="Tiêu đề" v-model="formData.title"></v-text-field>
                <v-layout align-center>
                  <v-text-field
                    class=" right-text-field"
                    label="Tiền thuê"
                    type="number"
                    name="price"
                    v-model="formData.price"
                  ></v-text-field>
                  <span class="pb-1">00.000 VNĐ/tháng</span>
                </v-layout>
                <v-layout align-center>
                  <v-text-field
                    class=" right-text-field"
                    label="Diện tích"
                    type="number"
                    name="acreage"
                    v-model="formData.acreage"
                  ></v-text-field>
                  <span class="pb-1">m²</span>
                </v-layout>
                <v-range-slider
                  label="Sức chứa:"
                  hint="người/phòng"
                  persistent-hint
                  name="capacity"
                  v-model="formData.capacity"
                  :max="capacityDefault.MAX"
                  :min="capacityDefault.MIN"
                  :step="capacityDefault.STEP"
                  thumb-label="always"
                  color="secondary"
                  class="my-6 mr-4"
                ></v-range-slider>
                <v-select
                  label="Loại phòng"
                  :items="roomTypes"
                  item-text="text"
                  item-value="id"
                  v-model="formData.room_type_id"
                ></v-select>
                <v-select
                  label="Giới tính"
                  :items="genders"
                  item-text="text"
                  item-value="id"
                  v-model="formData.gender_type_id"
                ></v-select>
                <v-textarea
                  label="Miêu tả thêm"
                  outlined
                  auto-grow
                  rows="2"
                  v-model="formData.description"
                ></v-textarea>
                <v-btn color="primary" type="submit"> Tiếp theo </v-btn>
              </v-form>
            </v-tab-item>
            <v-tab-item>
              <upload-image-form @next="refuseWarningDialog" @back="refuseWarningDialog" />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </div>
    </v-layout>
    <warning-dialog
      title="Lưu thay đổi"
      content="bạn có muốn lưu sửa đổi này không"
      has-cancel
      @accept="refuseWarningDialog"
      @refuse="refuseWarningDialog"
      @cancel="cancelWarningDialog"
      v-model="openWarningDialog"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'vue-property-decorator'
import WarningDialog from '@/components/common/WarningDialog.vue'
import { TextIcon } from '@/constants/app.interface'
import { ROOM_TYPES, GENDER, CAPACITY } from '@/constants/app.constant'
import RoomReponsitory from '@/repositories/RoomRepository'
import UploadImageForm from '@/components/common/UploadImageForm.vue'

@Component<RoomCreateRequest>({
  name: 'RoomCreateRequest',
  // eslint-disable-next-line no-undef
  components: {
    WarningDialog,
    UploadImageForm,
  },
  // middleware: ['authenticated', 'isOwner'],
})
export default class RoomCreateRequest extends Vue {
  private acceptPolicy: boolean = false
  private openWarningDialog: boolean = false
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
  private roomTypes: TextIcon[] = ROOM_TYPES
  private genders: TextIcon[] = GENDER
  private capacityDefault = CAPACITY
  private policy: string =
    'Contrary to popular belief, Lorem Ipsum is not simply Random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum etMalorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'

  private tab: number = 0

  private formData = {
    title: '',
    price: 0,
    room_type_id: '',
    gender_type_id: '',
    owner_id: 0,
    description: '',
    acreage: 0,
    capacity: [CAPACITY.MIN, CAPACITY.MAX]
  }

  public closeDialog() {
    this.openWarningDialog = true
  }

  public acceptPolicyEvent(event: Event) {
    this.acceptPolicy = true
    this.nextTab(event)
  }

  public refuseWarningDialog() {
    this.openWarningDialog = false
    this.$router.go(-1)
  }

  public cancelWarningDialog() {
    this.openWarningDialog = false
  }

  public async submitBasicRoomData(event: Event) {
    event.preventDefault()
    await RoomReponsitory.createRoom(this.formData)
      .then(response => {
        this.nextTab(event)
      })
  }

  public nextTab(event: Event) {
    event.preventDefault()
    const nextTab = (this.tab + 1) % this.tabHeaders.length
    this.tabHeaders[nextTab].disabled = false
    this.tab++
  }
}
</script>
