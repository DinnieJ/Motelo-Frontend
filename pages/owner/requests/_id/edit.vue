<template>
  <v-container>
    <v-layout d-flex justify-center class="rounded white">
      <div class="auth__section pa-2">
        <v-layout justify-space-between>
          <h1 class="primary--text ma-0 auth__title">
            CẬP NHẬT THÔNG TIN PHÒNG
          </h1>
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
                <v-card-text v-html="policy">
                </v-card-text>
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
              <v-form>
                <v-text-field
                  name="title"
                  label="Tiêu đề"
                  v-model="formData.title"
                ></v-text-field>
                <v-layout align-center>
                  <v-text-field
                    label="Tiền thuê"
                    type="number"
                    name="price"
                    v-model="formData.price"
                    @keypress="checkNumber($event)"
                  ></v-text-field>
                  <span class="pb-1">VNĐ/tháng</span>
                </v-layout>
                <v-layout align-center>
                  <v-text-field
                    label="Diện tích"
                    type="number"
                    name="acreage"
                    v-model="formData.acreage"
                    @keypress="checkNumber($event)"
                  ></v-text-field>
                  <span class="pb-1">m²</span>
                </v-layout>
                <v-select
                  label="Loại phòng"
                  :items="roomTypes"
                  item-text="text"
                  item-value="id"
                  v-model="formData.room_type_id"
                ></v-select>
                <v-switch
                  v-model="formData.available"
                  :label="formData.available ? 'Còn phòng' : 'Hết phòng'"
                ></v-switch>
                <v-textarea
                  label="Miêu tả thêm"
                  outlined
                  auto-grow
                  rows="2"
                  v-model="formData.description"
                ></v-textarea>
                <v-btn color="primary" @click="nextTab"> Tiếp theo </v-btn>
              </v-form>
            </v-tab-item>
            <!-- Update image step -->
            <v-tab-item>
              <v-form class="mt-8">
                <input
                  type="file"
                  accept="image/*"
                  multiple="multiple"
                  ref="images"
                  class="d-none"
                  @change="onFileChange"
                />
                <v-row class="mb-4 justify-center">
                  <v-col
                    cols="12"
                    sm="6"
                    v-for="(image, i) in oldImages"
                    :key="image.id"
                  >
                    <v-btn
                      small
                      block
                      color="secondary"
                      @click="clickDeleteOldImage(i)"
                      >xóa</v-btn
                    >
                    <v-img
                      width="100%"
                      height="auto"
                      :lazy-src="loadingImg"
                      :src="image.image_url"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" v-for="(image, i) in images" :key="i">
                    <v-btn small block color="secondary" @click="clickDelete(i)"
                      >xóa</v-btn
                    >
                    <img width="100%" height="auto" ref="image" />
                  </v-col>
                </v-row>
                <v-layout justify-center>
                  <v-btn outlined color="primary" @click="clickUpload">
                    <v-icon left>mdi-upload</v-icon>
                    Tải lên
                  </v-btn>
                </v-layout>
                <v-layout justify-start class="mt-6">
                  <v-btn class="mr-3" color="primary" @click="submitForm">
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
      title="Thoát ra"
      content="Nếu bạn thoát bây giờ, đơn sẽ bị hủy.<br />Bạn có muốn thoát không ?"
      @accept="acceptWarningDialog"
      @refuse="refuseWarningDialog"
      v-model="openWarningDialog"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, VModel } from 'vue-property-decorator'
import WarningDialog from '@/components/common/WarningDialog.vue'
import { RoomDetailDTO, TextIcon } from '@/constants/app.interface'
import { ROOM_TYPES, GENDER, LOADING_IMG } from '@/constants/app.constant'
import RoomRepository from '@/repositories/RoomRepository'
import { isNumber } from '@/utils/validation'

@Component<RoomUpdateRequest>({
  name: 'RoomUpdateRequest',
  // eslint-disable-next-line no-undef
  components: {
    WarningDialog,
  },
  middleware: ['authenticated', 'isOwner'],
  async created() {
    this.id = this.$route.params.id
    await this.getRoomDetail()
  },
})
export default class RoomUpdateRequest extends Vue {
  private id: string = '-1'
  private acceptPolicy: boolean = false
  private openWarningDialog: boolean = false
  $notify: any

  private checkNumber = isNumber

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
  private roomTypes: TextIcon[] = ROOM_TYPES
  private genders: TextIcon[] = GENDER
  private policy: string =
  `CHỦ NHÀ TRỌ LƯU Ý <br />
    <b>Yêu cầu về thông tin phòng trọ<b/> <br />
    Bài đăng cho thuê sẽ bao gồm thông tin chung của nhà trọ và thông tin riêng của từng phòng <br />
    Chủ trọ phải đăng thông tin phòng trọ theo format dưới đây, đủ thông tin <br />
    1. Tiêu đề <br />
    2. Giá thuê <br />
    3. Diện tích <br />
    4. Loại phòng <br />
    5. Miêu tả thêm (Nếu có) <br />
    6. Ảnh riêng của phòng trọ <br />`
  private tab: number = 0
  private formData = {
    title: '',
    price: 0,
    room_type_id: -1,
    gender_type_id: 1,
    description: '',
    acreage: 0,
    available: true,
  }

  private images: any[] = []
  private oldImages: { id: number; image_url: string }[] = [
    {
      id: -1,
      image_url:
        'https://tgrh.org/wp-content/uploads/2020/02/avt-demo-la-gi.png',
    },
  ]
  private deleteImages: number[] = []
  private loadingImg: string = LOADING_IMG

  public async getRoomDetail() {
    // Mockup get demo data from api Guest(ListRoom)
    await RoomRepository.getRoomDetail(this.id).then((repos) => {
      const room: RoomDetailDTO = new RoomDetailDTO(repos.data)
      this.formData.title = room.title
      this.formData.price = room.price
      this.formData.room_type_id = (room.type && room.type.id) || 0
      this.formData.gender_type_id = (room.gender && room.gender.id) || 0
      this.formData.description = room.description
      this.formData.acreage = room.area
      this.formData.available = room.available
      this.oldImages = room.images
    })
  }

  public closeDialog() {
    this.openWarningDialog = true
  }

  public acceptPolicyEvent(event: Event) {
    this.acceptPolicy = true

    //if policy is accepted, disable policy, enable other
    const policyIndex = 0
    this.tabHeaders.forEach((item) => (item.disabled = false))
    this.tabHeaders[policyIndex].disabled = true
    this.tab = policyIndex + 1
  }

  public acceptWarningDialog() {
    this.openWarningDialog = false
    this.$router.push(`/owner/requests/${this.id}`)
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
    const formData = new FormData()
    formData.append('room_id', this.id)
    formData.append('title', this.formData.title)
    formData.append('price', (this.formData.price).toString())
    formData.append('room_type_id', this.formData.room_type_id.toString())
    formData.append('gender_type_id', this.formData.gender_type_id.toString())
    formData.append('description', this.formData.description)
    formData.append('acreage', this.formData.acreage.toString())
    formData.append('available', (this.formData.available ? 1 : 0).toString())

    this.images.forEach((image, i) => {
      formData.append(`new_images[${i}]`, image)
    })

    this.deleteImages.forEach((id, index) => {
      formData.append(`delete_images[${index}]`, id.toString())
    })

    await RoomRepository.updateRoom(formData)
      .then((response) => {
        this.$notify.showMessage({
          message: 'Cập nhật thông tin phòng thành công',
          color: 'success',
        })
        setTimeout(() => {
          this.$router.push(`/owner/requests/${this.id}`)
        }, 400)
      })
      .catch((error) => {
        this.$notify.showMessage({
          message: 'Cập nhật thông tin phòng không thành công',
          color: 'red',
        })
      })
  }

  clickUpload(e: Event) {
    e.preventDefault()
    const input = this.$refs.images as any
    input.click()
  }

  clickDelete(imgIndex: number) {
    this.images.splice(imgIndex, 1)
  }

  clickDeleteOldImage(imgIndex: number) {
    const deletedImage = this.oldImages.splice(imgIndex, 1)
    this.deleteImages.push(deletedImage[0].id)
  }

  onFileChange(e: any) {
    let vm: any = this
    var selectedFiles = e.target.files
    for (let i = 0; i < selectedFiles.length; i++) {
      this.images.push(selectedFiles[i])
    }

    for (let i = 0; i < this.images.length; i++) {
      let reader = new FileReader()
      reader.onload = (e) => {
        vm.$refs.image[i].src = reader.result
      }

      reader.readAsDataURL(this.images[i])
    }
  }
}
</script>
