<template>
  <div class="pa-8">
    <section class="mb-14">
      <v-layout justify-space-between>
        <h1 class="filter__title primary--text">Bộ lọc</h1>
        <v-btn color="warning" rounded outlined @click="submit">lọc</v-btn>
      </v-layout>
    </section>

    <section class="mb-6">
      <v-layout>
        <v-range-slider
          label="Giá:"
          hint="tr VND/tháng"
          persistent-hint
          v-model="filter.price"
          :max="priceMax"
          :min="priceMin"
          :step="priceStep"
          thumb-label="always"
          color="secondary"
        ></v-range-slider>
      </v-layout>
    </section>

    <section class="mb-6">
      <h2>Tiện ích</h2>
      <v-row>
        <v-col
          cols="12" sm="4"
          v-for="item in amenities"
          :key="item.id"
          align-center
          class="d-flex filter__content"
        >
          <v-checkbox
            v-model="filter.amenities"
            :value="item.id"
          ></v-checkbox>
          <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
          <p class="filter__text my-2">{{ item.text }}</p>
        </v-col>
      </v-row>
    </section>

    <section class="mb-6">
      <h2>Loại phòng</h2>
      <v-row>
        <v-col
          cols="12" sm="4"
          v-for="item in roomTypes"
          :key="item.id"
          align-center
          class="d-flex filter__content"
        >
          <v-checkbox
            v-model="filter.room_type"
            :value="item.id"
          ></v-checkbox>
          <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
          <p class="filter__text my-2">{{ item.text }}</p>
        </v-col>
      </v-row>
    </section>

    <section class="mb-6">
      <h2>Giới tính</h2>
      <v-row>
        <v-col
          cols="12" sm="4"
          v-for="item in genders"
          :key="item.id"
          align-center
          class="d-flex filter__content"
        >
          <v-checkbox
            v-model="filter.gender"
            :value="item.id"
          ></v-checkbox>
          <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
          <p class="filter__text my-2">{{ item.text }}</p>
        </v-col>
      </v-row>
    </section>
    <v-btn color="warning" rounded outlined @click="submit" block>lọc</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel } from 'vue-property-decorator'
import { TextIcon, RoomFilterDTO } from '@/constants/app.interface'
import {
  PRICE_FILTER,
  AMEENITIES,
  GENDER,
  ROOM_TYPES,
} from '@/constants/app.constant'

// eslint-disable-next-line no-use-before-define
@Component<RoomFilter>({
  name: 'RoomFilter',
  created() {},
})
export default class RoomFilter extends Vue {
  private priceMax: number = PRICE_FILTER.MAX
  private priceMin: number = PRICE_FILTER.MIN
  private priceStep: number = PRICE_FILTER.STEP

  private amenities: TextIcon[] = AMEENITIES

  private genders: TextIcon[] = GENDER

  private roomTypes: TextIcon[] = ROOM_TYPES

  @Prop({ default: false, type: Boolean }) readonly sm!: boolean
  @Prop({ type: Function, required: true }) readonly submit!: Function
  @VModel({ type: Object }) filter!: RoomFilterDTO

  public checkTick(needle: any, arr: Array<any>) {
    return arr.includes(needle)
  }
}
</script>
