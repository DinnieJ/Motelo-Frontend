<template>
  <v-form @submit="clickNext">
    <h2 class="text-center">An ninh của nhà trọ</h2>
    <v-row>
      <v-col cols="12" sm="4">
        <v-layout align-center>
          <v-checkbox></v-checkbox>
          <v-flex class="filter__content">
            <span class="mr-2">
              <v-icon size="32">mdi-cctv</v-icon>
            </span>
            <span>Camera</span>
          </v-flex>
        </v-layout>
      </v-col>
      <v-col cols="12" sm="4">
        <v-layout align-center>
          <v-checkbox></v-checkbox>
          <v-flex class="filter__content">
            <span class="mr-2">
              <v-icon size="32">mdi-fingerprint</v-icon>
            </span>
            <span>Khóa vân tay</span>
          </v-flex>
        </v-layout>
      </v-col>
      <v-col cols="12" sm="4">
        <v-layout align-center>
          <v-checkbox></v-checkbox>
          <v-flex class="filter__content">
            <span class="mr-2">
              <v-icon size="32">mdi-shield-account</v-icon>
            </span>
            <span>Người bảo vệ</span>
          </v-flex>
        </v-layout>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <h2 class="text-center">Giờ mở cửa</h2>
        <v-time-picker
          class="mt-4"
          format="24hr"
          scrollable
        ></v-time-picker>
      </v-col>
      <v-col cols="12" sm="6">
        <h2 class="text-center">Giờ đóng cửa</h2>
        <v-time-picker
          class="mt-4"
          format="24hr"
          scrollable
        ></v-time-picker>
      </v-col>
    </v-row>

    <v-btn color="primary" type="submit"> Tiếp theo </v-btn>

    <v-btn @click="clickBack"> Trở lại </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component<InnSafetyForm>({
  name: 'InnSafetyForm',
  // eslint-disable-next-line no-undef
})
export default class InnSafetyForm extends Vue {
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
