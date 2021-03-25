<template>
  <v-container>
    <v-layout d-flex justify-center class="rounded white">
      <div class="auth__section pa-2">
        <v-layout justify-space-between>
          <h1 class="primary--text ma-0 auth__title">
            CẬP NHẬT THÔNG TIN TIỆN ÍCH
          </h1>
          <v-btn color="secondary" text icon @click="closeDialog">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-layout>

        <v-tabs v-model="tab" grow centered center-active color="secondary">
          <v-tabs-slider color="secondary"> </v-tabs-slider>

          <v-tab v-for="(header, index) in tabHeaders" :key="index">
            <v-icon small class="mr-2">{{
              `mdi-numeric-${index + 1}-box`
            }}</v-icon>
            {{ header }}
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
              <v-text-field required label="Địa chỉ" v-model="formData.address">
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
                <v-row class="mb-4 justify-center" v-if="oldImage !== ''">
                  <v-col cols="12" sm="6">
                    <v-img
                      width="100%"
                      height="auto"
                      :lazy-src="loadingImg"
                      :src="oldImage"
                    />
                  </v-col>
                </v-row>
                <v-row class="mb-4 justify-center">
                  <v-col cols="12" sm="6">
                    <img width="100%" height="auto" ref="image" />
                  </v-col>
                </v-row>
                <v-layout justify-center>
                  <v-btn outlined color="primary" @click="clickUpload">
                    <v-icon left>mdi-upload</v-icon>
                    Thay đổi
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
import { Component, Vue } from 'vue-property-decorator'
import WarningDialog from '@/components/common/WarningDialog.vue'
import { MarkerDTO } from '@/constants/app.interface'
import {
  LOADING_IMG,
  UTILITY_TYPE,
  DefaultMapZoom,
} from '@/constants/app.constant'
import UtilityRepository from '~/repositories/UtilityRepository'

@Component<RoomUpdateRequest>({
  name: 'RoomUpdateRequest',
  // eslint-disable-next-line no-undef
  components: {
    WarningDialog,
  },
  // middleware: ['authenticated', 'isCollaborator'],
})
export default class RoomUpdateRequest extends Vue {
  private id: number = -1
  private acceptPolicy: boolean = false
  private openWarningDialog: boolean = false
  $notify: any

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

  async created() {
    try {
      this.id = parseInt(this.$route.params.id)
    } catch (e) {
      this.id = -1
    }
    await Promise.all([this.getAllUtilities(), this.getUtility()])
  }

  public setMapCenter({ latLng }: any) {
    this.center = latLng
  }

  private tabHeaders = ['Thông tin cơ bản', 'Vị trí', 'Ảnh']

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
  private oldImage: string = ''

  private loadingImg: string = LOADING_IMG

  public async getAllUtilities() {
    await UtilityRepository.getAllUtilities().then((response) => {
      const markers = response.data
      this.markers = markers.map(function (marker: any) {
        return new MarkerDTO(marker)
      })
    })
  }

  public async getUtility() {
    await UtilityRepository.getUtilityById(this.id).then((response) => {
      const utility = response
      console.log(response)
      this.formData.title = utility.title
      this.formData.description = utility.description
      this.formData.address = utility.address
      this.formData.type_id = utility.type
      this.selectIndex = utility.type
      const location = utility.location
        .split(' ')
        .map((coord: any) => parseFloat(coord))
      this.center = {
        lat: location[0],
        lng: location[1],
      }
      this.oldImage = utility.image_url
    })
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
    await UtilityRepository.updateUtility(formData)
      .then((response) => {
        this.$notify.showMessage({
          message: 'Cập nhật thông tin thành công',
          color: 'success',
        })
        setTimeout(() => {
          this.$router.go(-1)
        }, 400)
      })
      .catch((error) => {
        this.$notify.showMessage({
          message: 'Cập nhật thông tin không thành công',
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
    this.oldImage = ''
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
