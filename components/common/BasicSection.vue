<template>
  <div class="mt-6 pa-5">
    <div>
      <h1 >
        <v-icon class="mb-3" size="32" color="secondary" dark left>
          mdi-home
        </v-icon>
        <span>Thông tin cơ bản</span>
      </h1>
      <v-divider />
    </div>
    <v-row class="mt-3 pl-3 pr-3">
      <v-col v-if="!forInn" cols="6" md="3">
        <p class="caption">GIÁ PHÒNG</p>
        <h3 class="font-weight-light">
          {{ `${numberFormat.format(price)} đồng` }}
        </h3>
      </v-col>
      <v-col v-if="!forInn" cols="6" md="3">
        <p class="caption">DIỆN TÍCH</p>
        <h3 class="font-weight-light">{{ `${area} mét vuông` }}</h3>
      </v-col>
      <v-col v-if="!forInn" cols="6" md="3">
        <p class="caption">GIỚI TÍNH</p>
        <h3 class="font-weight-light">
          {{ gender }}
        </h3>
      </v-col>
      <v-col v-if="electric" cols="6" :md="forInn ? 4 : 3">
        <p class="caption">ĐIỆN</p>
        <h3 class="font-weight-light">
          {{ `${numberFormat.format(electric)} đồng` }}
        </h3>
      </v-col>
      <v-col v-if="water" cols="6" :md="forInn ? 4 : 3">
        <p class="caption">NƯỚC</p>
        <h3 class="font-weight-light">
          {{ `${numberFormat.format(water)} đồng` }}
        </h3>
      </v-col>
      <v-col v-if="wifi" cols="6" :md="forInn ? 4 : 3">
        <p class="caption font-italic">WIFI</p>
        <h3 class="font-weight-light">
          {{ `${numberFormat.format(wifi)} đồng` }}
        </h3>
      </v-col>
      <v-col v-if="!forInn" cols="6" md="3">
        <p class="caption">TRẠNG THÁI</p>
        <h3 class="font-weight-light">
          <span v-if="available" class="font-weight-bold success--text">Còn phòng</span>
          <span v-else class="font-weight-bold warning--text">Hết phòng</span>
        </h3> </v-col
      ><v-col cols="12">
        <p class="caption">NHÀ TRỌ</p>
        <h3 class="font-weight-light">
          {{ inn_name }}
        </h3>
        <p class="font-weight-light mt-2">ĐỊA CHỈ: {{ address }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component<BasicSection>({
  name: 'BasicSection',
  // eslint-disable-next-line no-undef
})
export default class BasicSection extends Vue {
  @Prop({ default: false, type: Boolean }) readonly forInn!: boolean
  @Prop({ type: Number }) readonly price!: number
  @Prop({ type: Number }) readonly area!: number
  @Prop({ type: Number }) readonly eservation_fee!: number
  @Prop({ type: Number }) readonly electric!: number
  @Prop({ type: Number }) readonly water!: number
  @Prop({ type: Number }) readonly wifi!: number
  @Prop({ type: Object }) readonly capacity!: object
  @Prop({ type: String }) readonly gender!: string
  @Prop({ type: Boolean }) readonly available!: boolean
  @Prop({ type: String }) readonly inn_name!: string
  @Prop({ type: String }) readonly address!: string

  private numberFormat: Intl.NumberFormat = new Intl.NumberFormat()
}
</script>
