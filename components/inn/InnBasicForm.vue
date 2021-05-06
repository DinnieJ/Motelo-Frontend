<template>
  <validation-observer ref="formObserver" v-slot="{ invalid }">
    <v-form>
      <h2 class="text-center">Thông tin cơ bản của nhà trọ</h2>
      <validation-provider
        v-slot="{ errors }"
        mode="eager"
        name="inn_name"
        :rules="rules.inn_name"
      >
        <v-text-field
          v-model="basicInfo.name"
          class="text-h5 required"
          label="Tên nhà trọ"
          :error-messages="errors"
        ></v-text-field>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        mode="eager"
        name="electric_price"
        :rules="rules.price"
      >
        <v-layout align-center>
          <v-text-field
            v-model="basicInfo.electric_price"
            class="text-h5 required"
            label="Tiền điện"
            type="number"
            :error-messages="errors"
            @keypress="checkNumber($event)"
          ></v-text-field>
          <span>VNĐ/số</span>
        </v-layout>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        mode="eager"
        name="water_price"
        :rules="rules.price"
      >
        <v-layout align-center>
          <v-text-field
            v-model="basicInfo.water_price"
            class="text-h5 required"
            label="Tiền nước"
            type="number"
            :error-messages="errors"
            @keypress="checkNumber($event)"
          ></v-text-field>
          <span>VNĐ/khối</span>
        </v-layout>
      </validation-provider>
      <validation-provider
        v-slot="{ errors }"
        mode="eager"
        name="wifi_price"
        :rules="rules.price"
      >
        <v-layout align-center>
          <v-text-field
            v-model="basicInfo.wifi_price"
            class="text-h5 required"
            label="Wifi"
            type="number"
            :error-messages="errors"
            @keypress="checkNumber($event)"
          ></v-text-field>
          <span>VNĐ/tháng</span>
        </v-layout>
      </validation-provider>
      <v-btn color="primary" @click="clickNext" :disabled="invalid">
        Tiếp theo
      </v-btn>
    </v-form>
  </validation-observer>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode,
} from 'vee-validate'
import { GENDER, ROOM_TYPES } from '~/constants/app.constant'
import { DispatchAction } from '~/constants/app.vuex'
import { required } from 'vee-validate/dist/rules'
import { isNumber } from '@/utils/validation'

setInteractionMode('aggressive')

extend('required', {
  ...required,
  message: 'Bạn không được để trống trường này',
})

@Component<InnBasicForm>({
  name: 'InnBasicForm',
  // eslint-disable-next-line no-undef
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class InnBasicForm extends Vue {
  private CONST_GENDER = GENDER
  private CONST_ROOM_TYPE = ROOM_TYPES

  private basicInfo = {
    name: '',
    water_price: null,
    electric_price: null,
    wifi_price: null,
  }

  private rules: any = {
    inn_name: { required: true },
    price: { required: true }
  }

  private checkNumber = isNumber

  @Emit('next')
  clickNext(event: Event): string {
    event.preventDefault()
    this.$store.dispatch(DispatchAction.ADD_BASIC_INN_INFO, this.basicInfo)
    return 'demo'
  }

  @Emit('back')
  clickBack(event: Event) {
    event.preventDefault()
  }
}
</script>
