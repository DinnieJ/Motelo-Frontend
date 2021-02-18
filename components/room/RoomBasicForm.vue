<template>
  <v-form @submit="clickNext">
    <h2 class="text-center">Thông tin cơ bản của phòng trọ</h2>
    <v-text-field class="text-h5" label="Tiêu đề"></v-text-field>
    <v-layout align-center>
      <v-text-field
        class="text-h5"
        label="Tiền thuê"
        type="number"
      ></v-text-field>
      <span>VNĐ/tháng</span>
    </v-layout>
    <v-layout align-center>
      <v-text-field
        class="text-h5"
        label="Đặt cọc"
        type="number"
      ></v-text-field>
      <span>VNĐ</span>
    </v-layout>
    <v-select class="text-h5" label="Tình trạng" :items="available"></v-select>
    <v-layout align-center>
      <v-text-field
        class="text-h5"
        label="Diện tích"
        type="number"
      ></v-text-field>
      <span>m²</span>
    </v-layout>
    <v-select
      class="text-h5"
      label="Loại phòng"
      :items="roomTypes"
      item-text="text"
      item-value="code"
    ></v-select>
    <v-select
      class="text-h5"
      label="Giới tính"
      :items="genders"
      item-text="text"
      item-value="code"
    ></v-select>
    <v-row>
      <v-col cols="12">
        <h3>Sức chứa</h3>
      </v-col>
      <v-col cols="6">
        <v-text-field
          class="text-h5"
          label="Ít nhất"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="6"
        ><v-text-field
          class="text-h5"
          label="Nhiều nhất"
          type="number"
        ></v-text-field
      ></v-col>
    </v-row>
    <v-btn color="primary" type="submit"> Tiếp theo </v-btn>

    <v-btn @click="clickBack"> Trở lại </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import { TextIcon } from '@/constants/app.interface'
import { ROOM_TYPES, GENDER } from '@/constants/app.constant'

@Component<RoomBasicForm>({
  name: 'RoomBasicForm',
  // eslint-disable-next-line no-undef
})
export default class RoomBasicForm extends Vue {
  private roomTypes: TextIcon[] = ROOM_TYPES
  private genders: TextIcon[] = GENDER
  private available: string[] = ['Còn phòng', 'Hết phòng']

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
