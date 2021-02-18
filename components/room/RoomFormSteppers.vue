<template>
  <v-stepper alt-labels v-model="current">
    <v-stepper-header>
      <v-stepper-step :complete="current > 1" step="1" editable>
        Thông tin cơ bản
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="current > 2" step="2" editable>
        Ảnh
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" editable> Mô tả </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <room-basic-form @next="nextStep" @back="backStep" />
      </v-stepper-content>
      <v-stepper-content step="2">
        <upload-image-form @next="nextStep" @back="backStep" />
      </v-stepper-content>
      <v-stepper-content step="3">
        <room-description-form @next="finishForm" @back="backStep" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import RoomBasicForm from './RoomBasicForm.vue'
import RoomDescriptionForm from './RoomDescriptionForm.vue'

import UploadImageForm from '@/components/common/UploadImageForm.vue'

@Component<RoomFormSteppers>({
  name: 'RoomFormSteppers',
  // eslint-disable-next-line no-undef
  components: {
    RoomBasicForm,
    UploadImageForm,
    RoomDescriptionForm
  },
})
export default class RoomFormSteppers extends Vue {
  private current: number = 1

  public nextStep(e: any) {
    this.current++
  }

  public backStep() {
    this.current--
  }

  @Emit('finish')
  public finishForm() {}
}
</script>
