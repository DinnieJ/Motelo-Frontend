<template>
  <v-card rounded="lg" class="pa-4" elevation="0">
    <v-card-title>
        Chính sách của <span class="ml-3">Motelo</span>
    </v-card-title>
    <v-card-text v-html="policy">
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="accept()">đồng ý</v-btn>
      <v-btn color="warning" @click="refuse()">từ chối</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component<PolicyCard>({
  name: 'PolicyCard',
  // eslint-disable-next-line no-undef
})
export default class PolicyCard extends Vue {
    @Prop({type: Function, required: true}) readonly accept!: Function
    @Prop({type: Function, required: true}) readonly refuse!: Function

    // data
  private policy: string =
    `CHỦ NHÀ TRỌ LƯU Ý <br />
    <b>Yêu cầu về thông tin nhà trọ<b/> <br />
    Chủ trọ phải đăng thông tin nhà trọ theo format dưới đây, đủ thông tin <br />
    1. Tên nhà trọ <br />
    2. Tiền điện, tiền nước, tiền wifi. <br />
    3. Đánh dầu các tiện nghi của có sẵn. <br />
    4. Đánh dấu các điều kiện an ninh. <br />
    5. Chỉ chính xác vị trí trên bản đồ. <br />
    6. Cung cấp hình ảnh chung về nhà trọ. <br />`
}
</script>
