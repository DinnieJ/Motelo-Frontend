<template>
  <v-app dark>
    <v-layout justify-center>
      <div class="d-flex flex-column align-center" v-if="error.statusCode == 404">
        <h1 class="text-h1">404</h1>
        <p>Bạn đang truy cập vào một trang không tồn tại, bấm vào đây để quay lại trang chủ</p>
        <v-btn color="primary" class="mb-5" outlined to="/">Trang chủ</v-btn>
        <v-img src="/imgs/obiwan.jpg" contain max-height="450"/>
      </div>
      <div class="d-flex flex-column align-center" v-else>
        <h1 class="text-h1">Có lỗi xảy ra</h1>
        <p>Có vấn đề xảy ra trong hệ thống</p>
        <v-btn color="primary" class="mb-5" outlined to="/">Trang chủ</v-btn>
        <v-img src="/imgs/error.jpg" contain max-height="450"/>
      </div>
    </v-layout>
    

  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
