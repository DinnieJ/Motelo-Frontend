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
        <h3 class="headline primary--text text--accent-2">
          Click here to upload image
        </h3>
      </v-card-title>
      <v-layout d-flex row wrap v-else>
        <div v-for="(image, i) in images" :key="i" class="ml-2 mr-2">
          <img
            width="200"
            height="200"
            :ref="'image'"
          >
        </div>
      </v-layout>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="clickUpload" v-if="images.length == 0">
          <v-icon left>mdi-upload</v-icon>
          Upload
        </v-btn>
        <v-btn color="red" @click="removeImages" v-else>
          <v-icon left>mdi-delete</v-icon>
          Clear
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
    console.log(this.images)
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
    refs.images.value = ""
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
}
</script>
