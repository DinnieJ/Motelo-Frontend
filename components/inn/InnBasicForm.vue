<template>
  <v-form @submit="clickNext">
    <h2 class="text-center">Thông tin cơ bản của nhà trọ</h2>
    <v-text-field
      v-model="basicInfo.name"
      class="text-h5"
      label="Tên nhà trọ"
    ></v-text-field>
    <v-layout align-center>
      <v-text-field
        v-model="basicInfo.electric_price"
        class="text-h5"
        label="Tiền điện"
        type="number"
      ></v-text-field>
      <span>VNĐ/số</span>
    </v-layout>
    <v-layout align-center>
      <v-text-field
        v-model="basicInfo.water_price"
        class="text-h5"
        label="Tiền nước"
        type="number"
      ></v-text-field>
      <span>VNĐ/khối</span>
    </v-layout>
    <v-layout align-center>
      <v-text-field v-model="basicInfo.wifi_price" class="text-h5" label="Wifi" type="number"></v-text-field>
      <span>VNĐ/tháng</span>
    </v-layout>
    
    <v-btn color="primary" type="submit"> Tiếp theo </v-btn>

    <v-btn @click="clickBack"> Trở lại </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import { GENDER, ROOM_TYPES } from '~/constants/app.constant'
import { DispatchAction } from '~/constants/app.vuex'

@Component<InnBasicForm>({
  name: 'InnBasicForm',
  // eslint-disable-next-line no-undef
})
export default class InnBasicForm extends Vue {
  private CONST_GENDER = GENDER
  private CONST_ROOM_TYPE = ROOM_TYPES

  private basicInfo = {
    name: '',
    water_price: null,
    electric_price: null,
    wifi_price: null
  }

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
