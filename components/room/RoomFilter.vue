<template>
  <div class="pa-8">
    <section class="mb-14">
      <v-layout justify-space-between>
        <h1 class="filter__title primary--text">Bộ lọc</h1>
        <div>
          <v-btn color="error" rounded outlined @click="clearFilter">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn color="warning" rounded outlined @click="filterSearch"
            >lọc</v-btn
          >
        </div>
      </v-layout>
    </section>

    <section class="mb-6">
      <v-layout>
        <v-range-slider
          label="Giá:"
          hint="tr VND/tháng"
          persistent-hint
          v-model="price"
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
          cols="12"
          sm="4"
          v-for="item in amenities"
          :key="item.id"
          align-center
          class="d-flex filter__content"
        >
          <v-checkbox v-model="features" :value="item.id"></v-checkbox>
          <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
          <p class="filter__text my-2">{{ item.text }}</p>
        </v-col>
      </v-row>
    </section>

    <section class="mb-6">
      <h2>Loại phòng</h2>
      <v-row>
        <v-col
          cols="12"
          sm="4"
          v-for="item in roomTypes"
          :key="item.id"
          align-center
          class="d-flex filter__content"
        >
          <v-checkbox v-model="room_type" :value="item.id"></v-checkbox>
          <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
          <p class="filter__text my-2">{{ item.text }}</p>
        </v-col>
      </v-row>
    </section>

    <section class="mb-6">
      <h2>Giới tính</h2>
      <v-row>
        <v-col
          cols="12"
          sm="4"
          v-for="item in genders"
          :key="item.id"
          align-center
          class="d-flex filter__content"
        >
          <v-checkbox v-model="gender" :value="item.id"></v-checkbox>
          <v-icon>{{ `mdi-${item.icon}` }}</v-icon>
          <p class="filter__text my-2">{{ item.text }}</p>
        </v-col>
      </v-row>
    </section>
    <v-btn color="warning" rounded outlined @click="filterSearch" block>lọc</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, VModel, Watch, Emit, PropSync } from 'vue-property-decorator'
import { TextIcon } from '@/constants/app.interface'
import {
  PRICE_FILTER,
  AMEENITIES,
  GENDER,
  ROOM_TYPES,
} from '@/constants/app.constant'
import { DispatchAction, Getter } from '~/constants/app.vuex'

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
  @PropSync('open') asyncOpen!: boolean

  @Emit('filter')
  public filterSearch() {
    this.asyncOpen = false
  }

  public clearFilter() {
    this.$store.dispatch(DispatchAction.CLEAR_FILTER)
  }

  get features() {
    return this.$store.state.search.features
  }

  set features(val) {
    this.$store.commit('search/setFeatures', val.sort())
  }

  get price() {
    let min_price = this.$store.state.search.min_price
    let max_price = this.$store.state.search.max_price

    return [min_price, max_price]
  }

  set price(val) {
    this.$store.commit('search/setMinPrice', val[0])
    this.$store.commit('search/setMaxPrice', val[1])
  }

  get room_type() {
    return this.$store.state.search.room_type
  }

  set room_type(val) {
    this.$store.commit('search/setRoomType', val.sort())
  }

  get gender() {
    return this.$store.state.search.gender
  }

  set gender(val) {
    this.$store.commit('search/setGender', val)
  }
}
</script>
