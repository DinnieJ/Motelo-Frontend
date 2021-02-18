<template>
  <v-form @submit="clickNext">
    <h2 class="text-center">Thông tin cơ bản của nhà trọ</h2>
    <v-text-field
      class="text-h5"
      label="Tên nhà trọ"
    ></v-text-field>
    <v-layout align-center>
      <v-text-field
        class="text-h5"
        label="Tiền điện"
        type="number"
      ></v-text-field>
      <span>VNĐ/số</span>
    </v-layout>
    <v-layout align-center>
      <v-text-field
        class="text-h5"
        label="Tiền nước"
        type="number"
      ></v-text-field>
      <span>VNĐ/khối</span>
    </v-layout>
    <v-layout align-center>
      <v-text-field
        class="text-h5"
        label="Wifi"
        type="number"
      ></v-text-field>
      <span>VNĐ/tháng</span>
    </v-layout>

    <v-btn color="primary" type="submit"> Tiếp theo </v-btn>

    <v-btn @click="clickBack"> Trở lại </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component<InnBasicForm>({
  name: 'InnBasicForm',
  // eslint-disable-next-line no-undef
})
export default class InnBasicForm extends Vue {
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
