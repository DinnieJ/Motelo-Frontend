<template>
  <v-container tag="section">
    <v-layout d-flex justify-center class="rounded white">
      <div class="auth__section pa-2">
        <v-layout justify-space-between>
          <h1 class="primary--text ma-0 auth__title">CẬP NHẬT NHÀ TRỌ</h1>
          <v-btn color="secondary" text icon @click="closeDialog">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-layout>
        <v-tabs v-if="acceptPolicy" v-model="tab" grow centered center-active color="secondary">
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
          <v-tabs-items v-model="tab" class="pt-6">
            <!-- basic inn data step -->
            <v-tab-item class="pt-4">
              <v-text-field
                v-model="formData.name"
                outlined
                label="Tên nhà trọ"
              ></v-text-field>
              <v-text-field
                v-model="formData.electric_price"
                outlined
                label="Tiền điện"
                type="number"
                suffix="VNĐ/số"
                hint="Điền 0 nếu miễn phí hoặc không có"
              ></v-text-field>
              <v-text-field
                v-model="formData.water_price"
                outlined
                label="Tiền nước"
                type="number"
                suffix="VNĐ/khối"
                hint="Điền 0 nếu miễn phí hoặc không có"
              ></v-text-field>
              <v-text-field
                v-model="formData.wifi_price"
                outlined
                label="Wifi"
                type="number"
                suffix="VNĐ/tháng"
                hint="Điền 0 nếu miễn phí hoặc không có"
              ></v-text-field>
              <v-btn color="primary" class="mr-3" @click="nextTab">
                Tiếp theo
              </v-btn>
            </v-tab-item>
            <!-- inn ameenities step -->
            <v-tab-item>
              <v-row>
                <v-col
                  v-for="item in amenities"
                  :key="item.id"
                  cols="12"
                  sm="4"
                  class="py-0"
                >
                  <v-layout align-center>
                    <v-checkbox
                      v-model="amenitiesChosen"
                      :value="item.id"
                    ></v-checkbox>
                    <v-flex class="filter__content">
                      <span>
                        <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
                      </span>
                      <span>{{ item.text }}</span>
                    </v-flex>
                  </v-layout>
                </v-col>
              </v-row>
              <div class="mt-3">
                <v-btn color="primary" class="mr-3" @click="nextTab">
                  Tiếp theo
                </v-btn>
                <v-btn class="mr-3" @click="preTab"> Trở lại </v-btn>
              </div>
            </v-tab-item>
            <!-- inn safety step -->
            <v-tab-item>
              <v-row>
                <v-col
                  v-for="item in securities"
                  :key="item.id"
                  cols="12"
                  sm="4"
                  class="py-0"
                >
                  <v-layout align-center>
                    <v-checkbox
                      v-model="securitiesChosen"
                      :value="item.id"
                    ></v-checkbox>
                    <v-flex class="filter__content">
                      <span>
                        <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
                      </span>
                      <span>{{ item.text }}</span>
                    </v-flex>
                  </v-layout>
                </v-col>
              </v-row>

              <template>
                <v-text-field
                  v-model="open_time"
                  outlined
                  label="Mở cửa"
                  type="time"
                ></v-text-field>
                <v-text-field
                  v-model="close_time"
                  outlined
                  label="Đóng cửa"
                  type="time"
                ></v-text-field>
              </template>

              <div class="mt-3">
                <v-btn color="primary" class="mr-3" @click="nextTab">
                  Tiếp theo
                </v-btn>
                <v-btn class="mr-3" @click="preTab"> Trở lại </v-btn>
              </div>
            </v-tab-item>
            <!-- Edit inn's location step -->
            <v-tab-item>
              <div
                class="pa-0 ma-0 mapTab"
                @touchstart="stopTouchTransition"
                @touchmove="stopTouchTransition"
                @touchend="stopTouchTransition"
              >
                <v-text-field
                  v-model="formData.address"
                  required
                  outlined
                  label="Địa chỉ"
                >
                </v-text-field>
                <gmap-map
                  :center="center"
                  :zoom="zoom"
                  :options="mapOptions"
                  class="map__container"
                  style="width: auto; height: 100%; min-height: 50vh"
                  @click="setMapCenter"
                >
                  <gmap-marker :position="center"></gmap-marker>
                  <gmap-marker
                    v-for="marker in markers"
                    :key="marker.id"
                    :position="marker.position"
                    :icon="{ path: marker.type.code }"
                    :title="marker.name"
                  ></gmap-marker>
                </gmap-map>
                <div class="mt-3">
                  <v-btn color="primary" class="mr-3" @click="nextTab">
                    Tiếp theo
                  </v-btn>
                  <v-btn class="mr-3" @click="preTab"> Trở lại </v-btn>
                </div>
              </div>
            </v-tab-item>
            <!-- Update image step -->
            <v-tab-item>
              <v-form class="mt-8">
                <input
                  ref="images"
                  type="file"
                  accept="image/*"
                  class="d-none"
                  @change="onFileChange"
                />
                <v-row class="mb-4 justify-center">
                  <v-col
                    v-for="(image, i) in old_images"
                    :key="`old-${i}`"
                    cols="12"
                    sm="6"
                  >
                    <v-btn
                      small
                      block
                      color="secondary"
                      @click="clickDelete(i, true)"
                    >
                      xóa
                    </v-btn>
                    <img width="100%" height="auto" :src="image.image_url" />
                  </v-col>
                  <v-col
                    v-for="(image, i) in formData.new_images"
                    :key="`new-${i}`"
                    cols="12"
                    sm="6"
                  >
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
                  <v-btn class="mr-3" color="primary" @click="submitForm">
                    Hoàn thành
                  </v-btn>
                  <v-btn class="mr-3" @click="preTab"> Trở lại </v-btn>
                </v-layout>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
        <!-- Policy step -->
        <v-card v-else elevation="0" class="pa-4">
          <v-card-text v-html="policy"></v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="acceptPolicyEvent">đồng ý</v-btn>
            <v-btn color="warning" @click="acceptWarningDialog">từ chối</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-layout>
    <warning-dialog
      v-model="openWarningDialog"
      title="THOÁT"
      content="Nếu bạn thoát, những thông tin trên sẽ không được lưu lại.<br>Bạn có muốn thoát không?"
      @accept="acceptWarningDialog"
      @refuse="refuseWarningDialog"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SECURITY, AMEENITIES, DefaultMapZoom } from '@/constants/app.constant'
import { stopEventFromParentElement } from '@/utils/event'
import UtilityRepository from '@/repositories/UtilityRepository'
import InnRepository from '@/repositories/InnRepository'

import WarningDialog from '@/components/common/WarningDialog.vue'
import InnBasicForm from '@/components/inn/InnBasicForm.vue'
import InnAmeenitiesForm from '@/components/inn/InnAmeenitiesForm.vue'
import InnSafetyForm from '@/components/inn/InnSafetyForm.vue'
import { TextIcon, MarkerDTO } from '~/constants/app.interface'

@Component<UpdateInn>({
  name: 'UpdateInn',
  components: {
    InnBasicForm,
    InnAmeenitiesForm,
    InnSafetyForm,

    WarningDialog,
  },
  middleware: ['authenticated', 'isOwner'],
  async fetch() {
    await Promise.all([this.getInnProfile(), this.getAllMarker()])
  },
})
export default class UpdateInn extends Vue {
  // data
  private policy: string =
    `CHỦ NHÀ TRỌ LƯU Ý <br />
    <b>Yêu cầu về thông tin nhà trọ<b/> <br />
    Chủ trọ phải đăng thông tin nhà trọ theo format dưới đây, đủ thông tin <br />
    1. Tên nhà trọ <br />
    2. Tiền điện, tiền nước, tiền wifi. <br />
    3. Đánh dầu các tiện nghi của có sẵn. <br />
    4. Đánh dấu các điều kiện an ninh. <br />
    5. Chỉ chính xác vị trí trên bản đồ. <br />
    6. Cung cấp hình ảnh chung về nhà trọ. <br />`

  private acceptPolicy: boolean = false;

  private amenities: TextIcon[] = AMEENITIES
  private amenitiesChosen: number[] = []

  private securities: TextIcon[] = SECURITY
  private securitiesChosen: number[] = []

  private open_time: string = '12:00'
  private close_time: string = '12:00'

  private center: any = { lat: 0, lng: 0 }
  private zoom: number = DefaultMapZoom
  private markers: MarkerDTO[] = []
  private mapOptions = {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    disableDefaultUi: false,
  }

  private openWarningDialog: boolean = false
  private tabHeaders = [
    {
      header: 'Thông tin cơ bản',
      disabled: false,
    },
    {
      header: 'Tiện ích',
      disabled: false,
    },
    {
      header: 'An ninh',
      disabled: false,
    },
    {
      header: 'Vị trí',
      disabled: false,
    },
    {
      header: 'Ảnh',
      disabled: false,
    },
  ]

  private tab: number = 0

  private formData: any = {
    inn_id: -1,
    name: '',
    water_price: 0,
    electric_price: 0,
    wifi_price: 0,
    open_hour: '0',
    open_minute: '0',
    close_hour: '0',
    close_minute: '0',
    address: '',
    location: [],
    features: [],
    new_images: [],
    delete_images: [],
  }

  private old_images: any[] = []
  private images: any[] = []

  $notify: any

  // methods
  public setMapCenter({ latLng }: any) {
    this.center = latLng
  }

  public stopTouchTransition: Function = stopEventFromParentElement

  public async getAllMarker() {
    await UtilityRepository.getAllUtilities().then((response) => {
      const markers = response.data
      this.markers = markers.map(function (marker: any) {
        return new MarkerDTO(marker)
      })
    })
  }

  public acceptPolicyEvent(event: Event) {
    this.acceptPolicy = true
  }

  public closeDialog() {
    this.openWarningDialog = true
  }

  public acceptWarningDialog() {
    this.openWarningDialog = false
    this.$router.push("/owner/home")
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

  public async getInnProfile() {
    await InnRepository.getInnDetailByOwner().then(({ data }) => {
      Object.keys(this.formData).forEach((key) => {
        if (data[key]) {
          this.formData[key] = data[key]
        }
      })

      this.formData.inn_id = data.id

      const amenitieIds: any[] = AMEENITIES.map((item) => item.id)
      const securityIds: any[] = SECURITY.map((item) => item.id)

      data.features.forEach((id: any) => {
        if (amenitieIds.includes(id)) {
          this.amenitiesChosen.push(id)
        }

        if (securityIds.includes(id)) {
          this.securitiesChosen.push(id)
        }
      })

      this.open_time = data.open_time
      this.close_time = data.close_time

      this.old_images = data.images
      this.center = data.location
    })
  }

  clickUpload(e: Event) {
    e.preventDefault()
    const input = this.$refs.images as any
    input.click()
  }

  onFileChange(e: any) {
    const vm: any = this
    const selectedFiles = e.target.files
    for (let i = 0; i < selectedFiles.length; i++) {
      this.formData.new_images.push(selectedFiles[i])
    }

    for (let i = 0; i < this.formData.new_images.length; i++) {
      const reader = new FileReader()
      reader.onload = (e) => {
        vm.$refs.image[i].src = reader.result
      }

      reader.readAsDataURL(this.formData.new_images[i])
    }
  }

  clickDelete(i: number, old: boolean = false) {
    if (old) {
      this.formData.delete_images.push(this.old_images[i].id)
      this.old_images.splice(i, 1)
    } else {
      this.formData.new_images.splice(i, 1)
    }
  }

  async submitForm() {
    this.formData.location = [this.center.lat, this.center.lng]

    const open_time = this.open_time.split(':')
    this.formData.open_hour = parseInt(open_time[0])
    this.formData.open_minute = parseInt(open_time[1])

    const close_time = this.close_time.split(':')
    this.formData.close_hour = parseInt(close_time[0])
    this.formData.close_minute = parseInt(close_time[1])

    this.formData.features = this.amenitiesChosen.concat(this.securitiesChosen)

    const formData = new FormData()
    for (const [key, value] of Object.entries(this.formData)) {
      if (Array.isArray(value)) {
        value.forEach((item, i) => {
          formData.append(`${key}[${i}]`, item)
        })
      } else {
        formData.append(key, value as string)
      }
    }

    await InnRepository.updateInn(formData)
      .then((response) => {
        this.$notify.showMessage({
          message: 'Sửa thành công',
          color: 'success',
        })
        setTimeout(() => {
          this.$router.push("/owner/home")
        }, 400)
      })
      .catch((error) => {
        this.$notify.showMessage({
          message: 'Sửa không thành công',
          color: 'red',
        })
        setTimeout(() => {
          this.$router.push("/owner/home")
        }, 400)
      })
  }
}
</script>