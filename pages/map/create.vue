<template>
  <v-container tag="section">
    <v-layout d-flex justify-center class="rounded white">
      <div class="auth__section pa-2">
        <v-layout justify-space-between>
          <h1 class="primary--text ma-0 auth__title">TIỆN ÍCH MỚI</h1>
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
            <!-- basic utility data step -->
            <v-tab-item>
              <v-form class="mt-4">
                <v-select
                  label="Loại tiện ích"
                  :prepend-icon="`mdi-${selectIcon}`"
                  v-model="selectIndex"
                  :items="utilitysType"
                  item-text="text"
                  item-value="index"
                  @change="changeSelect"
                ></v-select>

                <v-text-field
                  label="Tiêu đề"
                  v-model="formData.title"
                ></v-text-field>
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
            <!-- choose utility's location step -->
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
                  <v-col cols="12" sm="6">
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
                    :disabled="!image"
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
import WarningDialog from '@/components/common/WarningDialog.vue'
import { UTILITY_TYPE, DefaultMapZoom } from '@/constants/app.constant'
import UtilityRepository from '@/repositories/UtilityRepository'
import UploadImageForm from '@/components/common/UploadImageForm.vue'
import { MarkerDTO } from '~/constants/app.interface'
import { stopEventFromParentElement } from '@/utils/event'

@Component<CreateUtility>({
  name: 'CreateUtility',
  components: {
    WarningDialog,
    UploadImageForm,
  },
  async created() {
    await this.getAllMarker()
  },
})
export default class CreateUtility extends Vue {
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

  public setMapCenter({ latLng }: any) {
    this.center = latLng
  }

  mounted() {
    this.getCurrentPosition()
  }

  public stopTouchTransition: Function = stopEventFromParentElement

  public getCurrentPosition() {
    const context = this
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function setMapCenterByGPS(
        position
      ) {
        context.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      })
    }
  }

  public async getAllMarker() {
    await UtilityRepository.getAllUtilities().then((response) => {
      const markers = response.data
      this.markers = markers.map(function (marker: any) {
        return new MarkerDTO(marker)
      })
    })
  }

  private openWarningDialog: boolean = false
  private tabHeaders = [
    {
      header: 'Thông tin cơ bản',
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
  private utilitysType = UTILITY_TYPE.map((item, index) => ({ ...item, index }))
  private tab: number = 0

  private formData = {
    title: '',
    address: '',
    type_id: -1,
    description: '',
  }

  private selectIcon: string = 'help'
  private selectIndex = ''
  private image: any = null

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

  public changeSelect(i: number) {
    const utility = this.utilitysType[i]
    this.formData.type_id = utility.id
    this.selectIcon = utility.icon
  }

  public nextTab() {
    this.tab++
  }

  public preTab() {
    this.tab--
  }

  $notify: any

  async submitForm() {
    const formData = new FormData()
    formData.append('title', this.formData.title)
    formData.append('utility_type_id', this.formData.type_id.toString())
    formData.append('description', this.formData.description)
    formData.append('address', this.formData.address)
    const position = this.center
    if (typeof position.lat === 'function') {
      // when user choose location, lat and lng will become function
      formData.append('location[0]', position.lat())
      formData.append('location[1]', position.lng())
    } else {
      formData.append('location[0]', position.lat)
      formData.append('location[1]', position.lng)
    }

    formData.append('image', this.image)
    await UtilityRepository.createUtility(formData)
      .then((response) => {
        this.$notify.showMessage({
          message: 'Thêm thành công',
          color: 'success',
        })
        setTimeout(() => {
          this.$router.go(-1)
        }, 400)
      })
      .catch((error) => {
        this.$notify.showMessage({
          message: 'Thêm không thành công',
          color: 'red',
        })
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
    this.image = selectedFiles[0]

    let reader = new FileReader()
    reader.onload = (e) => {
      vm.$refs.image.src = reader.result
    }

    reader.readAsDataURL(this.image)
  }
}
</script>