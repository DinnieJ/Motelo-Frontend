<template>
  <v-form @submit="clickNext">
    <h2 class="text-center">An ninh của nhà trọ</h2>
    <v-row>
      <v-col cols="12" sm="4" v-for="item in CONST_SAFETY" :key="item.id">
        <v-layout align-center>
          <v-checkbox v-model="safetyInfo.security" :value="item.id">
            <template v-slot:label>
              <v-icon left>mdi-{{ item.icon }}</v-icon>
              {{ item.text }}
            </template>
          </v-checkbox>
        </v-layout>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <h2 class="text-center">Giờ mở cửa</h2>
        <v-time-picker
          v-model="openTime"
          class="mt-4"
          format="24hr"
          scrollable
        ></v-time-picker>
      </v-col>
      <v-col cols="12" sm="6">
        <h2 class="text-center">Giờ đóng cửa</h2>
        <v-time-picker
          v-model="closeTime"
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
import { Component, Vue, Emit, Watch } from 'vue-property-decorator'
import { SECURITY } from '~/constants/app.constant'
import { DispatchAction } from '~/constants/app.vuex'


@Component<InnSafetyForm>({
  name: 'InnSafetyForm',
  // eslint-disable-next-line no-undef
})
export default class InnSafetyForm extends Vue {

  private openTime: string = '12:00'
  private closeTime: string = '12:00'

  private CONST_SAFETY = SECURITY

  private safetyInfo = {
    security: [],
    open_hour: 12,
    open_minute: 0,
    close_hour: 12,
    close_minute: 0
  } 


  @Emit('next')
  clickNext(event: Event): string {
    event.preventDefault()
    this.$store.dispatch(DispatchAction.ADD_SECURITY_INFO, this.safetyInfo)
    return 'demo'
  }

  @Emit('back')
  clickBack(event: Event) {
    event.preventDefault()
  }

  @Watch('openTime')
  public getOpenTime() {
    this.safetyInfo.open_hour = parseInt(this.openTime.split(':')[0])
    this.safetyInfo.open_minute = parseInt(this.openTime.split(':')[1])
  }

  @Watch('closeTime')
  public getCloseTime() {
    this.safetyInfo.close_hour = parseInt(this.closeTime.split(':')[0])
    this.safetyInfo.close_minute = parseInt(this.closeTime.split(':')[1])
  }
}
</script>
