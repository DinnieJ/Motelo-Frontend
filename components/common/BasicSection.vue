<template>
  <v-card rounded="lg" class="mt-6 pa-3">
    <div>
      <v-layout>
        <v-icon class="mx-3" size="32" color="secondary" dark>
          mdi-home
        </v-icon>
        <h1 class="post__title">Thông tin cơ bản</h1>
      </v-layout>
      <v-divider />
    </div>
    <v-row class="mt-3">
      <v-col cols="6" md="3" v-if="!forInn">
        <p class="caption font-weight-thin font-italic">GIÁ PHÒNG</p>
        <h3 class="font-weight-light">6,000,000 đồng</h3>
      </v-col>
      <v-col cols="6" md="3" v-if="!forInn">
        <p class="caption font-weight-thin font-italic">DIỆN TÍCH</p>
        <h3 class="font-weight-light">40 mét vuông</h3>
      </v-col>
      <v-col cols="6" md="3" v-if="!forInn">
        <p class="caption font-weight-thin font-italic">ĐẶT CỌC</p>
        <h3 class="font-weight-light">6,000,000 đồng</h3>
      </v-col>
      <v-col cols="6" md="3" v-if="!forInn">
        <p class="caption font-weight-thin font-italic">SỨC CHỨA</p>
        <h3 class="font-weight-light">3 Nam hoặc Nữ</h3>
      </v-col>
      <v-col cols="6" :md="forInn ? 4 : 3">
        <p class="caption font-weight-thin font-italic">ĐIỆN</p>
        <h3 class="font-weight-light">3,500 đồng</h3>
      </v-col>
      <v-col cols="6" :md="forInn ? 4 : 3">
        <p class="caption font-weight-thin font-italic">NƯỚC</p>
        <h3 class="font-weight-light">3,500 đồng</h3>
      </v-col>
      <v-col cols="6" :md="forInn ? 4 : 3">
        <p class="caption font-weight-thin font-italic">WIFI</p>
        <h3 class="font-weight-light">100,000 đồng</h3>
      </v-col>
      <v-col cols="6" md="3" v-if="!forInn">
        <p class="caption font-weight-thin font-italic">TRẠNG THÁI</p>
        <h3 class="font-weight-light">
          <span class="success--text">Còn phòng</span>
        </h3>
      </v-col><v-col cols="12" md="3" v-if="!forInn">
        <p class="caption font-weight-thin font-italic">NHÀ TRỌ</p>
        <h3 class="font-weight-light">
          Nhà trọ Minh Tuấn
        </h3>
      </v-col>
      <v-col cols="12" md="9">
        <p class="caption font-weight-thin font-italic">ĐIẠ CHỈ</p>
        <h3 class="font-weight-light">
          26 Võng thị, Phường Bưởi, Quận Tây Hồ, Hà Nội
        </h3>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component<BasicSection>({
  name: 'BasicSection',
  // eslint-disable-next-line no-undef
})
export default class BasicSection extends Vue {
  @Prop({default: false, type: Boolean}) readonly forInn!: boolean
}
</script>
