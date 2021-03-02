<template>
  <div>
    <v-row v-if="!sm">
      <v-col>
        <h1>Bộ lọc</h1>
      </v-col>
      <v-col
        ><v-btn color="primary" rounded outlined @click="submit"
          >áp dụng</v-btn
        ></v-col
      >
    </v-row>
    <v-expansion-panels class="my-5" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h5>
            {{ `Giá: ${filter.min_price}tr - ${filter.max_price}tr` }}
          </h5>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-range-slider
            v-model="filter.price"
            :max="priceMax"
            :min="priceMin"
            :step="priceStep"
            hide-details
          ></v-range-slider>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h5>Tiện ích</h5>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="filter__section">
          <v-layout
            v-for="amenitie in amenities"
            :key="amenitie.id"
            align-center
            class="filter__content"
          >
            <v-checkbox
              v-model="filter.amenities"
              :value="amenitie.id"
            ></v-checkbox>
            <v-icon small>{{ `mdi-${amenitie.icon}` }}</v-icon>
            <p class="filter__text">{{ amenitie.text }}</p>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h5>Loại phòng</h5>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="filter__section">
          <v-layout
            v-for="type in roomTypes"
            :key="type.id"
            class="filter__content"
          >
            <v-checkbox
              v-model="filter.room_type"
              :value="type.id"
            ></v-checkbox>
            <v-icon small>{{ `mdi-${type.icon}` }}</v-icon>
            <p class="filter__text">{{ type.text }}</p>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <h5>Giới tính</h5>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="filter__section">
          <v-layout
            v-for="gender in genders"
            :key="gender.id"
            class="filter__content"
          >
            <v-checkbox
              v-model="filter.gender"
              :value="gender.id"
            ></v-checkbox>
            <v-icon small>{{ `mdi-${gender.icon}` }}</v-icon>
            <p class="filter__text">{{ gender.text }}</p>
          </v-layout>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-btn color="primary" rounded outlined @click="submit">áp dụng</v-btn>
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
}
</script>
