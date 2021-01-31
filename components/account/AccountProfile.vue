<template>
  <v-sheet min-height="60vh" rounded="lg" class="pa-3">
    <v-layout justify-space-between class="my-5">
      <h1 class="primary--text">Tài khoản</h1>
      <div v-if="editable">
        <v-btn rounded outlined color="primary" @click="handleEditClick()">
          Đồng ý
        </v-btn>
        <v-btn rounded outlined color="warning" @click="handleEditClick()">
          Từ chối
        </v-btn>
      </div>
      <div v-else>
        <v-btn rounded outlined color="primary" @click="handleEditClick()">
          Sửa
        </v-btn>
      </div>
    </v-layout>
    <v-row>
      <v-col cols="12" sm="6" class="pa-2">
        <v-layout column align-center>
          <v-avatar size="300">
            <img src="/imgs/anh_homepage.jpg" alt="" />
          </v-avatar>
          <v-btn v-if="editable" class="mt-3">Đổi ảnh đại diện</v-btn>
        </v-layout>
      </v-col>
      <v-col cols="12" sm="6" class="pa-2">
        <div>
          <v-text-field
            class="text-h5"
            label="Tên"
            value="Two-line item"
            :disabled="!editable"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            class="text-h5"
            label="Email"
            value="Two-line item"
            :disabled="!editable"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            class="text-h5"
            label="Zalo"
            value="Two-line item"
            :disabled="!editable"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            class="text-h5"
            label="Facebook"
            value="Two-line item"
            :disabled="!editable"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            class="text-h5"
            label="Điện thoại 1"
            value="Two-line item"
            :disabled="!editable"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            class="text-h5"
            label="Điện thoại 2"
            value="Two-line item"
            :disabled="!editable"
          ></v-text-field>
        </div>
        <v-btn v-if="editable" block>Thêm số điện thoại</v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component<AccountProfile>({
  name: 'AccountProfile',
  // eslint-disable-next-line no-undef
})
export default class AccountProfile extends Vue {
  private editable: boolean = false

  public handleEditClick() {
    this.editable = true
  }
  public handleCancelClick() {
    this.editable = false
  }
}
</script>
