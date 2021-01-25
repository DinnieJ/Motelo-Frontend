<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet light rounded="lg" min-height="40vh" class="mt-6">
          <v-row class="pa-2">
            <v-col cols="12" lg="6">
              <v-carousel cycle height="auto">
                <v-carousel-item v-for="i in 5" :key="i">
                  <v-img
                    src="/imgs/anh_room.jpg"
                    class="rounded"
                    aspect-ratio="1.77"
                  />
                </v-carousel-item>
              </v-carousel>
            </v-col>
            <v-col cols="12" lg="6">
              <v-img
                src="/imgs/map_minh_hoa.png"
                class="rounded"
                max-height="100%"
              />
            </v-col>
          </v-row>
        </v-sheet>

        <v-row>
          <v-col cols="12" lg="7">
            <v-sheet light rounded="lg" class="mt-6 pa-2">
              <v-row>
                <v-col cols="10">
                  <h1 class="display-1">
                    Phòng cho thuê Võng thị, Quận Tây Hồ
                  </h1>
                  <v-breadcrumbs :items="breadcrumbLinks">
                    <template #divider>
                      <v-icon>mdi-chevron-right</v-icon>
                    </template>
                  </v-breadcrumbs>
                </v-col>
                <v-col cols="2">
                  <v-layout justify-end>
                    <v-icon
                      class="mr-4 post__favor"
                      size="32"
                      color="secondary"
                      dark
                    >
                      mdi-heart-plus-outline
                    </v-icon>
                  </v-layout>
                </v-col>
              </v-row>

              <v-card rounded="lg" class="pa-2">
                <v-layout>
                  <v-icon class="mr-4" size="48" color="primary" dark>
                    mdi-shield-home
                  </v-icon>
                  <h1 class="subtitle-1">
                    Cộng tác viên của <span class="primary--text"> Motelo </span> đích
                    thân đi xác thực về chất lượng phòng và độ tin cậy của chủ phòng.
                  </h1>
                </v-layout>
              </v-card>

              <v-card rounded="lg" class="mt-6 pa-3">
                <div>
                  <v-layout>
                    <v-icon class="mx-3" size="32" color="secondary" dark>
                      mdi-home
                    </v-icon>
                    <h1 class="post__title">Thông tin cơ bản</h1>
                  </v-layout>
                  <v-divider />
                </div>
                <v-row class="mt-3">
                  <v-col cols="6" md="3">
                    <p class="caption font-weight-thin font-italic">
                      GIÁ PHÒNG
                    </p>
                    <h3 class="font-weight-light">6,000,000 đồng</h3>
                  </v-col>
                  <v-col cols="6" md="3">
                    <p class="caption font-weight-thin font-italic">
                      DIỆN TÍCH
                    </p>
                    <h3 class="font-weight-light">40 mét vuông</h3>
                  </v-col>
                  <v-col cols="6" md="3">
                    <p class="caption font-weight-thin font-italic">ĐẶT CỌC</p>
                    <h3 class="font-weight-light">6,000,000 đồng</h3>
                  </v-col>
                  <v-col cols="6" md="3">
                    <p class="caption font-weight-thin font-italic">SỨC CHỨA</p>
                    <h3 class="font-weight-light">3 Nam hoặc Nữ</h3>
                  </v-col>
                  <v-col cols="6" md="3">
                    <p class="caption font-weight-thin font-italic">ĐIỆN</p>
                    <h3 class="font-weight-light">3,500 đồng</h3>
                  </v-col>
                  <v-col cols="6" md="3">
                    <p class="caption font-weight-thin font-italic">NƯỚC</p>
                    <h3 class="font-weight-light">NƯỚC</h3>
                  </v-col>
                  <v-col cols="6" md="3">
                    <p class="caption font-weight-thin font-italic">WIFI</p>
                    <h3 class="font-weight-light">100,000 đồng</h3>
                  </v-col>
                  <v-col cols="6" md="3">
                    <p class="caption font-weight-thin font-italic">
                      TRẠNG THÁI
                    </p>
                    <h3 class="font-weight-light">
                      <span class="success--text">Còn phòng</span>
                    </h3>
                  </v-col>
                  <v-col cols="12">
                    <p class="caption font-weight-thin font-italic">ĐIẠ CHỈ</p>
                    <h3 class="font-weight-light">
                      26 Võng thị, Phường Bưởi, Quận Tây Hồ, Hà Nội
                    </h3>
                  </v-col>
                </v-row>
              </v-card>

              <v-card rounded="lg" class="mt-12 pa-3">
                <div>
                  <v-layout>
                    <v-icon class="mx-3" size="32" color="success" dark>
                      mdi-thumb-up
                    </v-icon>
                    <h1 class="post__title">Tiện ích</h1>
                  </v-layout>
                  <v-divider />
                </div>
                <v-row class="mt-6">
                  <v-col
                    cols="6"
                    md="3"
                    v-for="amenitie in amenities"
                    :key="amenitie.code"
                  >
                    <h3 class="font-weight-light">
                      <span class="mr-2">
                        <font-awesome-icon
                          style="font-size: 32"
                          v-if="amenitie.fas"
                          :icon="['fas', amenitie.icon]"
                        />
                        <v-icon size="32" v-else>{{
                          `mdi-${amenitie.icon}`
                        }}</v-icon>
                      </span>
                      <span>{{ amenitie.text }}</span>
                    </h3>
                  </v-col>
                </v-row>
              </v-card>

              <v-card rounded="lg" class="mt-12 pa-3">
                <div>
                  <v-layout>
                    <v-icon class="mx-3" size="32" color="warning" dark>
                      mdi-information
                    </v-icon>
                    <h1 class="post__title">Mô tả thêm</h1>
                  </v-layout>
                  <v-divider />
                </div>
                <div class="pa-4">
                  <p>Cho Thuê Phòng CĂN HỘ CCMN Full Đồ</p>
                  <p>26 Võng Thị cách Hồ Tây 200m</p>
                  <p>🌻Diện tích:40m</p>
                  <p>🌻 CHÍNH CHỦ KHÔNG MÔI GIƠI, XEM PHÒNG MIỄN PHÍ.</p>
                  <p>
                    🌻 Full Nội thất tiện nghi: sàn gỗ,máy giặt, nóng lạnh ,
                    gường, tủ, bàn trang điểm,điều hoà, may giặt, kệ bếp tủ bếp,
                    bếp từ, hút mùi, chăn ga gối đêm, bàn ăn, tivi truyền hình
                    cáp....sang trọng, lịch sự. Chỉ cần xách vali đến ở.
                  </p>
                  <p>🌻 Cầu thang máy , khoá từ từng phòng</p>
                  <p>🌻 để xe tầng hầm, ban công phơi đồ riêng</p>
                  <p>🌻 Điện nước giá rẻ</p>
                  <p>🌻 Không chung chủ,đóng 1 cọc 1</p>
                  <p>🌻 Không gian thoáng đãng, yên tĩnh, trong lành</p>
                  <p>
                    🌻 Nhận nhà ngay.bảo vệ trông đêm giờ giấc thoải mái ảnh
                    thật của phòng liên hệ cc 0333.90.1990
                  </p>
                </div>
              </v-card>
            </v-sheet>
          </v-col>
          <v-col cols="12" lg="5" class="pr-2">
            <v-sheet light rounded="lg" class="mt-6 pa-2">
              <v-layout justify-center>
                <p class="title">Ngày đăng: <span>23/12/2020</span></p>
              </v-layout>

              <div class="pa-2 owner">
                <div>
                  <v-layout>
                    <v-icon class="mx-3" size="32" color="primary" dark>
                      mdi-book-account
                    </v-icon>
                    <h1 class="post__title">Chủ phòng</h1>
                  </v-layout>
                  <v-divider />
                </div>
                <div class="mt-2">
                  <v-layout class="mb-4">
                    <v-img
                      src="/imgs/logo-name.png"
                      max-width="32"
                      max-height="32"
                    ></v-img>
                    <p class="ml-6">Dao Tien Nam</p>
                  </v-layout>
                  <v-layout class="mb-4">
                    <v-img
                      src="/imgs/logo-phone.png"
                      max-width="32"
                      max-height="32"
                    ></v-img>
                    <p class="ml-6">0912839213</p>
                  </v-layout>
                  <v-layout class="mb-4">
                    <v-img
                      src="/imgs/logo-facebook.png"
                      max-width="32"
                      max-height="32"
                    ></v-img>
                    <a
                      class="ml-6"
                      href="https://www.facebook.com/nguyenvana/"
                      target="_blank"
                      rel="noopener noreferrer"
                      >https://www.facebook.com/nguyenvana/</a
                    >
                  </v-layout>
                  <v-layout class="mb-4">
                    <v-img
                      src="/imgs/logo-zalo.jpg"
                      max-width="32"
                      max-height="32"
                    ></v-img>
                    <a
                      class="ml-6"
                      href="https://zalo.me/0912839213"
                      target="_blank"
                      rel="noopener noreferrer"
                      >https://zalo.me/0912839213</a
                    >
                  </v-layout>
                </div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BreadcrumbLink, TextIcon } from '@/constants/app.interface'
import { AMEENITIES } from '@/constants/app.constant'

// eslint-disable-next-line no-use-before-define
@Component<Detail>({
  name: 'Detail',
})
export default class Detail extends Vue {
  private breadcrumbLinks: BreadcrumbLink[] = [
    {
      text: 'Hà Nội',
      disabled: false,
      href: 'breadcrumbs_dashboard',
    },
    {
      text: 'Tây Hồ',
      disabled: true,
      href: 'breadcrumbs_link_1',
    },
  ]

  private amenitieCodes: string[] = [
    'wifi',
    'toilet',
    'air_conditioner',
    'parking',
    'independence',
    'washing_machine',
    'cabinet',
    'fridge',
    'kitchen',
    'heater',
    'pet',
  ]

  private amenities: TextIcon[] = []

  created() {
    this.amenities = AMEENITIES.filter((amenitie) => {
      const found = this.amenitieCodes.find((item) => item === amenitie.code)
      if (found) {
        return true
      }
      return false
    })
  }
}
</script>

<style lang="scss">
.post {
  &__title {
    font-weight: 400;
  }

  &__favor {
    cursor: pointer;
  }
}

.owner {
  &__name {
    font-weight: 400;
    font-size: 1.25em;
  }
}
</style>
