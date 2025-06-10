<template>
  <v-container white>
    <v-layout column align-center>
      <div
        color="text--primary"
        class="text-h2 primary--text mt-5 mb-5 text-center"
      >
        Điều khoản sử dụng
      </div>
      <v-layout class="description" column align-start>
        <h3 class="text-h5 mb-2">* Đối với chủ trọ</h3>
        <p class="text-subtitle-1">
          1. Chỉ sử dụng duy nhất 1 tài khoản duy nhất đối với một nhà trọ
          (trong trường
        </p>
        <p class="text-subtitle-1">
          sở hữu nhiều nhà trọ thì cần đăng ký nhiều tài khoản)
        </p>
        <p class="text-subtitle-1">
          2. Vui lòng không spam nhiều bài lặp lại nội dung
        </p>
        <p class="text-subtitle-1">
          3. Đăng tối đa 4-5 ảnh liên quan đến nhà trọ phòng trọ (Tuyệt đối
          không sử dụng
        </p>
        <p class="text-subtitle-1">ảnh fake hoặc ảnh cũ)</p>
        <p class="text-subtitle-1">
          4. Không đăng tin mua bán sản phẩm nào khác mà không thuộc diện: Phòng
          trọ
        </p>
        <p class="text-subtitle-1">nhà trọ - khách sạn - căn hộ tại đây</p>
        <p class="text-subtitle-1">5. Không được đăng thông tin giả không đúng sự thật</p>
        <br />
        <h3 class="text-h5 mb-2">* Đối với sinh viên</h3>
        <p class="text-subtitle-1">1. Tuyệt đối không được sử dụng ngôn ngữ kích động thù địch</p>
        <p class="text-subtitle-1">
          2. Khi comment không nên spam hoặc đăng những đường link không liên
          quan tới nhà trọ phòng trọ
        </p>
        <br />
        <h3 class="text-h5 mb-2">* Đối với tất cả mọi người</h3>
        <p class="text-subtitle-1">
          1. Tôn trọng các thành viên khác, viết lịch sự, không nói tục chửi
          thề, xúc phạm các thành viên khác.
        </p>
        <p class="text-subtitle-1">
          Mọi hình thức hạ nhục về chủng tộc tôn giáo, văn hóa, khuynh hướng
          tình dục hay giới tinh sẽ không được chấp nhận
        </p>
        <p class="text-subtitle-1">2. Không sử dụng các hình ảnh mang tính nhạy cảm, trái với thuần phong mỹ tục</p>
        <p class="text-subtitle-1">3. Nghiêm cấm spam, quảng bá, đăng những link không liên quan</p>
      </v-layout>
      <v-btn to="/" color="primary" class="ma-5"><v-icon left dark>mdi-arrow-left</v-icon>quay lại trang chủ</v-btn>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component<Policy>({
  name: 'Policy',
})
export default class Policy extends Vue {}
</script>
<style lang="scss">
p {
  margin-bottom: 8px !important;
}
</style>