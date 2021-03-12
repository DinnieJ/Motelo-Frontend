<template>
  <v-form @submit="clickNext">
    <input
      type="file"
      accept="image/*"
      multiple="multiple"
      ref="images"
      class="d-none"
      @change="onFileChange"
    />
    <v-card class="mb-12" color="" elevation="2" min-height="200px">
      <v-card-title
        primary-title
        class="justify-center"
        v-if="images.length == 0"
      >
        <h3 class="headline primary--text justify-center">
          Tải ảnh lên tại đây
        </h3>
      </v-card-title>
      <v-layout d-flex row wrap justify-center class="mt-2" v-else>
        <div
          v-for="(image, i) in images"
          :key="i"
          class="d-flex flex-column align-center ml-2 mr-2 pa-2"
        >
          <img class="image-box" width="250" height="200" :ref="'image'" />
          <p class="mt-2 text-center">{{ getImageName(image.name) }}</p>
        </div>
      </v-layout>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="clickUpload" v-if="images.length == 0">
          <v-icon left>mdi-upload</v-icon>
          Tải lên
        </v-btn>
        <v-btn color="red" @click="removeImages" v-else>
          <v-icon left>mdi-delete</v-icon>
          Xóa
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-btn color="primary" type="submit"> Tiếp theo </v-btn>

    <v-btn @click="clickBack"> Trở lại </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component<UploadImageForm>({
  name: 'UploadImageForm',
  // eslint-disable-next-line no-undef
})
export default class UploadImageForm extends Vue {
  private images: any[] = []

  @Emit('next')
  clickNext(event: Event): string {
    event.preventDefault()
    return 'demo'
  }

  @Emit('back')
  clickBack(event: Event) {
    event.preventDefault()
  }

  clickUpload(e: Event) {
    e.preventDefault()
    const input = this.$refs.images as any
    input.click()
  }

  removeImages() {
    let refs = this.$refs as any
    refs.images.value = ''
    this.images = []
  }
  onFileChange(e: any) {
    this.images.length = 0
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

   getImageName(str: string): string {
     return str.length > 25 ? str.substr(0, 20) + '...' + str.substr(str.length - 5, str.length) : str
  }
}
</script>
<style lang="scss">
.image-box {
  border: 1px solid #ababab;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.75);
}
</style>
