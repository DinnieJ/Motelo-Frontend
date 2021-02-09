<template>
  <v-card rounded="lg" class="mt-12 pa-3">
    <div>
      <v-layout>
        <v-icon class="mx-3" size="32" color="warning" dark>
          mdi-information
        </v-icon>
        <h1 class="room__title">Mô tả thêm</h1>
      </v-layout>
      <v-divider />
    </div>
    <div class="pa-4">
      <p>Cho Thuê Phòng CĂN HỘ CCMN Full Đồ</p>
      <p>26 Võng Thị cách Hồ Tây 200m</p>
      <p>🌻Diện tích:40m</p>
      <p>🌻 CHÍNH CHỦ KHÔNG MÔI GIƠI, XEM PHÒNG MIỄN PHÍ.</p>
      <p>
        🌻 Full Nội thất tiện nghi: sàn gỗ,máy giặt, nóng lạnh , gường, tủ, bàn
        trang điểm,điều hoà, may giặt, kệ bếp tủ bếp, bếp từ, hút mùi, chăn ga
        gối đêm, bàn ăn, tivi truyền hình cáp....sang trọng, lịch sự. Chỉ cần
        xách vali đến ở.
      </p>
      <p>🌻 Cầu thang máy , khoá từ từng phòng</p>
      <p>🌻 để xe tầng hầm, ban công phơi đồ riêng</p>
      <p>🌻 Điện nước giá rẻ</p>
      <p>🌻 Không chung chủ,đóng 1 cọc 1</p>
      <p>🌻 Không gian thoáng đãng, yên tĩnh, trong lành</p>
      <p>
        🌻 Nhận nhà ngay.bảo vệ trông đêm giờ giấc thoải mái ảnh thật của phòng
        liên hệ cc 0333.90.1990
      </p>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component<RoomDescriptionSection>({
  name: 'RoomDescriptionSection',
  // eslint-disable-next-line no-undef
})
export default class RoomDescriptionSection extends Vue {
}
</script>
