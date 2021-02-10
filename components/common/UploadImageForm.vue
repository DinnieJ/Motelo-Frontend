<template>
  <v-form @submit="clickNext">
    <v-card class="mb-12" color="grey lighten-1" height="200px">
        Upload Ảnh
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
  @Emit('next')
  clickNext(event: Event): string {
    event.preventDefault()
    return 'demo'
  }

  @Emit('back')
  clickBack(event: Event) {
    event.preventDefault()
  }
}
</script>
