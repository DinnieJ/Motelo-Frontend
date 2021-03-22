<template>
  <v-container tag="section">
    <v-layout d-flex justify-center class="rounded white">
      <div class="auth__section pa-2">
        <v-layout justify-space-between>
          <h1 class="primary--text ma-0 auth__title">THIẾT LẬP NHÀ TRỌ</h1>
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
                <v-card-text>
                  {{ policy }}
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
            <!-- basic inn data step -->
            <v-tab-item class="pt-4">
              <v-text-field
                outlined
                label="Tên nhà trọ"
                v-model="formData.name"
              ></v-text-field>
              <v-layout align-center>
                <v-text-field
                  outlined
                  label="Tiền điện"
                  type="number"
                  suffix="VNĐ/số"
                  hint="Điền 0 nếu miễn phí hoặc không có"
                  v-model="formData.electric_price"
                ></v-text-field>
              </v-layout>
              <v-text-field
                outlined
                label="Tiền nước"
                type="number"
                suffix="VNĐ/khối"
                hint="Điền 0 nếu miễn phí hoặc không có"
                v-model="formData.water_price"
              ></v-text-field>
              <v-text-field
                outlined
                label="Wifi"
                type="number"
                suffix="VNĐ/tháng"
                hint="Điền 0 nếu miễn phí hoặc không có"
                v-model="formData.wifi_price"
              ></v-text-field>
              <v-btn color="primary" @click="nextTab" class="mr-3">
                Tiếp theo
              </v-btn>
            </v-tab-item>
            <!-- inn ameenities step -->
            <v-tab-item class="pt-4">
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                  v-for="item in amenities"
                  :key="item.id"
                  class="py-0"
                >
                  <v-layout align-center>
                    <v-checkbox
                      v-model="formData.amenities"
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
                <v-btn color="primary" @click="nextTab" class="mr-3">
                  Tiếp theo
                </v-btn>
                <v-btn class="mr-3" @click="preTab"> Trở lại </v-btn>
              </div>
            </v-tab-item>
            <!-- inn safety step -->
            <v-tab-item>
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                  v-for="item in securities"
                  :key="item.id"
                  class="py-0"
                >
                  <v-layout align-center>
                    <v-checkbox
                      v-model="formData.securities"
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
                  outlined
                  label="Mở cửa"
                  type="time"
                  v-model="formData.open_time"
                ></v-text-field>
                <v-text-field
                  outlined
                  label="Đóng cửa"
                  type="time"
                  value="12:30:00"
                  v-model="formData.close_time"
                ></v-text-field>
              </template>

              <div class="mt-3">
                <v-btn color="primary" @click="nextTab" class="mr-3">
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
                  required
                  label="Địa chỉ"
                  v-model="formData.address"
                >
                </v-text-field>
                <gmap-map
                  :center="center"
                  :zoom="zoom"
                  :options="mapOptions"
                  class="map__container"
                  @click="setMapCenter"
                  style="width: auto; height: 100%; min-height: 50vh"
                >
                  <gmap-marker :position="center"></gmap-marker>
                  <gmap-marker
                    v-for="marker in markers"
                    :position="marker.position"
                    :key="marker.id"
                    :icon="{ path: marker.type.code }"
                    :title="marker.name"
                  ></gmap-marker>
                </gmap-map>
                <div class="mt-3">
                  <v-btn color="primary" @click="nextTab" class="mr-3">
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
                  type="file"
                  accept="image/*"
                  ref="images"
                  class="d-none"
                  @change="onFileChange"
                />
                <v-row class="mb-4 justify-center">
                  <v-col cols="12" sm="6" v-for="(image, i) in formData.images" :key="i">
                    <v-btn small block color="secondary">
                      >xóa</v-btn
                    >
                    <img width="100%" height="auto" :src="image" />
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
                  <v-btn
                    class="mr-3"
                    color="primary"
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
      title="THOÁT"
      content="Nếu bạn thoát, những thông tin trên sẽ không được lưu lại.<br>Bạn có muốn thoát không?"
      has-cancel
      @accept="acceptWarningDialog"
      @refuse="refuseWarningDialog"
      v-model="openWarningDialog"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SECURITY, AMEENITIES, DefaultMapZoom } from '@/constants/app.constant'
import { TextIcon, MarkerDTO } from '~/constants/app.interface'
import { stopEventFromParentElement } from '@/utils/event'
import UtilityRepository from '@/repositories/UtilityRepository'
import InnRepository from '@/repositories/InnRepository'

import WarningDialog from '@/components/common/WarningDialog.vue'
import InnBasicForm from '@/components/inn/InnBasicForm.vue'
import InnAmeenitiesForm from '@/components/inn/InnAmeenitiesForm.vue'
import InnSafetyForm from '@/components/inn/InnSafetyForm.vue'

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
  //data
  private policy: string =
    'Contrary to popular belief, Lorem Ipsum is not simply Random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum etMalorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'

  private amenities: TextIcon[] = AMEENITIES
  private amenitiesChosen: number[] = []

  private securities: TextIcon[] = SECURITY
  private securitiesChosen: number[] = []

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
      header: 'Chính sách',
      disabled: true,
    },
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
  private tab: number = 1

  private formData: any = {
    name: '',
    water_price: 0,
    electric_price: 0,
    wifi_price: 0,
    open_time: '00:00',
    close_time: '00:00',
    address: '',
    location: {
      lat: 0,
      lng: 0,
    },
    amenities: [],
    securities: [],
    images: [],
  }
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
    //if policy is accepted, disable policy, enable other
    const policyIndex = 0
    this.tabHeaders.forEach((item) => (item.disabled = false))
    this.tabHeaders[policyIndex].disabled = true
    this.tab = policyIndex + 1
  }

  public closeDialog() {
    this.openWarningDialog = true
  }

  public acceptWarningDialog() {
    this.openWarningDialog = false
    this.$router.go(-1)
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
    const context: any = this
    await InnRepository.getInnDetailByOwner().then((response) => {
      const data = response.data
      this.formData = data
      if (!this.formData.wifi_price) {
        this.formData.wifi_price = 0
      }

      const amenitieIds: any[] = AMEENITIES.map((item) => item.id);
      const securityIds: any[]  = SECURITY.map((item) => item.id);

      this.formData.amenities = data.features.filter((id: any) => amenitieIds.includes(id));
      this.formData.securities = data.features.filter((id: any) => securityIds.includes(id));
      this.center = data.location
    })
  }

  clickUpload(e: Event) {
    e.preventDefault()
    const input = this.$refs.images as any
    input.click()
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

  async submitForm() {
    // const formData = new FormData();
    // formData.append('inn_id', this.formData.id)
    // formData.append('name', this.formData.name)
    // formData.append('water_price', this.formData.water_price)
    // formData.append('electric_price', this.formData.electric_price)
    // formData.append('open_hour', this.formData.open_hour)
    // formData.append('open_hour', this.formData.open_hour)
    // formData.append('open_hour', this.formData.open_hour)
    // formData.append('open_hour', this.formData.open_hour)

    // this.images.forEach((image, i) => {
    //   formData.append(`images[${i}]`, image)
    // })

    // await InnRepository.updateInn(formData)
    //   .then(response => {
    //     this.$notify.showMessage({ message: "Đăng thành công", color: "success"})
    //     setTimeout(() => {
    //       this.$router.go(-1)
    //     }, 400)
    //   })
    //   .catch(error => {
    //     this.$notify.showMessage({ message: "Tạo không thành công", color: "red"})
    //   })
  }
}
</script>