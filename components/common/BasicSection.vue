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
        <h3 class="font-weight-light">{{`${numberFormat.format(price)} đồng`}}</h3>
      </v-col>
      <v-col cols="6" md="3" v-if="!forInn">
        <p class="caption font-weight-thin font-italic">DIỆN TÍCH</p>
        <h3 class="font-weight-light">{{`${area} mét vuông`}}</h3>
      </v-col>
      <v-col cols="6" md="3" v-if="!forInn">
        <p class="caption font-weight-thin font-italic">ĐẶT CỌC</p>
        <h3 class="font-weight-light">{{`${numberFormat.format(eservation_fee)} đồng`}}</h3>
      </v-col>
      <v-col cols="6" md="3" v-if="!forInn">
        <p class="caption font-weight-thin font-italic">SỨC CHỨA</p>
        <h3 class="font-weight-light">{{`${capacity.min}-${capacity.max} ${gender}`}}</h3>
      </v-col>
      <v-col cols="6" :md="forInn ? 4 : 3" v-if="electric">
        <p class="caption font-weight-thin font-italic">ĐIỆN</p>
        <h3 class="font-weight-light">{{`${numberFormat.format(electric)} đồng`}}</h3>
      </v-col>
      <v-col cols="6" :md="forInn ? 4 : 3" v-if="water">
        <p class="caption font-weight-thin font-italic">NƯỚC</p>
        <h3 class="font-weight-light">{{`${numberFormat.format(water)} đồng`}}</h3>
      </v-col>
      <v-col cols="6" :md="forInn ? 4 : 3" v-if="wifi">
        <p class="caption font-weight-thin font-italic">WIFI</p>
        <h3 class="font-weight-light">{{`${numberFormat.format(wifi)} đồng`}}</h3>
      </v-col>
      <v-col cols="6" md="3" v-if="!forInn">
        <p class="caption font-weight-thin font-italic">TRẠNG THÁI</p>
        <h3 class="font-weight-light">
          <span v-if="available" class="success--text">Còn phòng</span>
          <span v-else class="warning--text">Hết phòng</span>
        </h3>
      </v-col><v-col cols="12" md="3" v-if="!forInn">
        <p class="caption font-weight-thin font-italic">NHÀ TRỌ</p>
        <h3 class="font-weight-light">
          {{ inn_name }}
        </h3>
      </v-col>
      <v-col cols="12" md="9">
        <p class="caption font-weight-thin font-italic">ĐIẠ CHỈ</p>
        <h3 class="font-weight-light">
          {{ address }}
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
