<template>
  <v-stepper alt-labels v-model="current">
    <v-stepper-header>
      <v-stepper-step
        :complete="current > 1"
        step="1"
        :editable="statusComplete[0]"
      >
        Thông tin cơ bản
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="current > 2"
        step="2"
        :editable="statusComplete[1]"
      >
        Tiện ích
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="current > 3" step="3" :editable="statusComplete[2]">
        An ninh
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="current > 4" step="4" :editable="statusComplete[3]">
        Địa chỉ
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="current > 5" step="5" :editable="statusComplete[4]">
        Ảnh
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <inn-basic-form @next="nextStep" @back="backStep" />
      </v-stepper-content>
      <v-stepper-content step="2">
        <inn-ameenities-form @next="nextStep" @back="backStep" />
      </v-stepper-content>
      <v-stepper-content step="3">
        <inn-safety-form @next="nextStep" @back="backStep" />
      </v-stepper-content>
      <v-stepper-content step="4">
        <address-form @next="nextStep" @back="backStep" />
      </v-stepper-content>
      <v-stepper-content step="5">
        <upload-image-form @next="finishForm" @back="backStep" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import InnBasicForm from './InnBasicForm.vue'
import InnAmeenitiesForm from './InnAmeenitiesForm.vue'

import InnSafetyForm from './InnSafetyForm.vue'
import UploadImageForm from '@/components/common/UploadImageForm.vue'
import AddressForm from '@/components/map/AddressForm.vue'

@Component<InnUpdateSteppers>({
  name: 'InnUpdateSteppers',
  // eslint-disable-next-line no-undef
  components: {
    InnBasicForm,
    InnAmeenitiesForm,

    InnSafetyForm,
    UploadImageForm,
    AddressForm,
  },
})
export default class InnUpdateSteppers extends Vue {
  private current: number = 1

  private statusComplete: Array<boolean> = [true, false, false, false, false]

  public nextStep(e: any) {
    this.statusComplete[this.current++] = true
  }

  public backStep() {
    this.current--
  }

  @Emit('finish')
  public finishForm() {}
}
</script>
