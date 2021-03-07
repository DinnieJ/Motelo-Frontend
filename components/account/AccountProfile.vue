<template>
  <v-sheet min-height="60vh" rounded="lg" class="pa-5">
    <v-layout justify-space-between class="my-5">
      <h1 class="primary--text">Tài khoản</h1>
      <div v-if="editable">
        <v-btn rounded outlined color="primary" @click="handleCancelClick()">
          Đồng ý
        </v-btn>
        <v-btn rounded outlined color="warning" @click="handleCancelClick()">
          Từ chối
        </v-btn>
      </div>
      <div v-else>
        <v-btn rounded outlined color="primary" to="/personal/edit">
          Sửa
        </v-btn>
      </div>
    </v-layout>
    <v-row>
      <v-col cols="12" :sm="sm" class="pa-2">
        <v-layout column align-center>
          <v-avatar size="300">
            <img src="/imgs/anh_homepage.jpg" alt="" />
          </v-avatar>
          <v-btn v-if="editable" class="mt-3">Đổi ảnh đại diện</v-btn>
        </v-layout>
      </v-col>
      <v-col cols="12" :sm="sm" class="pa-2">
        <div>
          <v-text-field
            class="text-h5"
            label="Tên"
            :value="userInfo.name"
            :disabled="!editable"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            class="text-h5"
            label="Email"
            :value="userInfo.email"
            :disabled="!editable"
          ></v-text-field>
        </div>
        <div v-if="userInfo.zalo">
        <div>
          <v-text-field
            class="text-h5"
            label="Zalo"
            :value="userInfo.zalo"
            :disabled="!editable"
          ></v-text-field>
        </div>
        </div>
        <div v-if="userInfo.facebook">
          <div>
            <v-text-field
              class="text-h5"
              label="Facebook"
              :value="userInfo.facebook"
              :disabled="!editable"
            ></v-text-field>
          </div>
        </div>
        <div v-if="userInfo.phone && userInfo.phone.length">
          <div v-for="(phone, index) in userInfo.phone" :key="index">
            <div>
              <v-text-field
                class="text-h5"
                :label="`Số điện thoại ${index + 1}`"
                :value="phone"
                :disabled="!editable"
              ></v-text-field>
            </div>
          </div>
        </div>
        <v-btn v-if="editable" block>Thêm số điện thoại</v-btn>
        <div v-if="userInfo.phone_number">
          <div>
            <v-text-field
              class="text-h5"
              label="Số điện thoại"
              :value="userInfo.phone_number"
              :disabled="!editable"
            ></v-text-field>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { UserInfoDTO } from '@/constants/app.interface'

@Component<AccountProfile>({
  name: 'AccountProfile',
  // eslint-disable-next-line no-undef
})
export default class AccountProfile extends Vue {
  @Prop({ default: false, type: Boolean }) readonly twoLine!: boolean
  @Prop({ required: true }) readonly userInfo!: UserInfoDTO
  private editable: boolean = false

  private get sm(): boolean | string {
    if (this.twoLine) {
      return '6'
    }
    return false
  }

  public handleEditClick() {
    this.editable = true
  }
  public handleCancelClick() {
    this.editable = false
  }
}
</script>
