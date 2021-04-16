<template>
  <v-app dark>
    <v-layout justify-center>
      <div class="d-flex flex-column align-center">
        <h1 class="text-h1">{{ errorObj.code || 500 }}</h1>
        <p>{{ errorObj.header || 'Something went wrong'}}</p>
        <v-btn color="primary" class="mb-5" outlined to="/">Trang chủ</v-btn>
        <v-img :src="errorObj.img || null" contain max-height="450"/>
      </div>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component<Error>({
  name: 'Error',
  layout: 'empty',

  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },

  created() {
    this.getError()
  }
})

export default class Error extends Vue {
  @Prop({ default: null, type: Object }) readonly error!: any
  private pageNotFound: string = '404 Not Found'
  private otherError: string = 'An error occurred'
  private errorObj: any = {}
  private errorMessages = [
    { code: 400, header: ' Có lỗi xảy ra với hệ thống, xin hãy quay lại trang chủ', img:'/imgs/error.jpg' },
    { code: 401, header: 'Bạn không có quyền truy cập vào trang này', img: '/imgs/403.jpg' },
    { code: 403, header: 'Bạn không có quyền truy cập vào trang này', img: '/imgs/403.jpg' },
    { code: 404, header: 'Bạn đang truy cập vào một trang không tồn tại, bấm vào đây để quay lại trang chủ', img: '/imgs/obiwan.jpg'  }
  ]

  public getError() {
    this.errorObj = this.errorMessages.find(item => item.code === this.error.statusCode)
    if(!this.errorObj) this.errorObj = { code: 400, header: ' Có lỗi xảy ra với hệ thống, xin hãy quay lại trang chủ', img:'/imgs/error.jpg' }
  }
}

</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
