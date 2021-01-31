<template>
  <v-container>
    <v-row>
      <v-col cols="2" class="d-none d-lg-block">
        <v-sheet rounded="lg" light class="pa-3">
          <v-row>
            <v-col>
              <h1>Bộ lọc</h1>
            </v-col>
            <v-col
              ><v-btn color="primary" rounded outlined>áp dụng</v-btn></v-col
            >
          </v-row>
          <v-expansion-panels class="my-5" multiple>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h3>{{ `Giá: ${priceFilter[0]}tr - ${priceFilter[1]}tr` }}</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-range-slider
                  v-model="priceFilter"
                  :max="priceMax"
                  :min="priceMin"
                  :step="priceStep"
                  hide-details
                ></v-range-slider>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h3>Tiện ích</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="amenitie in amenities" :key="amenitie.code">
                  <v-checkbox
                    v-model="amenitiesFilter"
                    :value="amenitie.code"
                  ></v-checkbox>
                  <v-flex class="filter__content">
                    <span>
                      <font-awesome-icon
                        v-if="amenitie.fas"
                        :icon="['fas', amenitie.icon]"
                      />
                      <v-icon v-else>{{ `mdi-${amenitie.icon}` }}</v-icon>
                    </span>
                    <span>{{ amenitie.text }}</span>
                  </v-flex>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h3>Loại phòng</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="type in roomTypes" :key="type.code">
                  <v-checkbox
                    v-model="roomTypesFilter"
                    :value="type.code"
                  ></v-checkbox>
                  <v-flex class="filter__content">
                    <span>{{ type.text }}</span>
                  </v-flex>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h3>Giới tính</h3>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row v-for="gender in genders" :key="gender.code">
                  <v-checkbox
                    v-model="genderFilter"
                    :value="gender.code"
                  ></v-checkbox>
                  <v-flex class="filter__content">
                    <span>
                      <v-icon>{{ `mdi-${gender.icon}` }}</v-icon>
                    </span>
                    <span>{{ gender.text }}</span>
                  </v-flex>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-btn color="primary" rounded outlined>áp dụng</v-btn>
        </v-sheet>
      </v-col>

      <v-col cols="12" lg="10">
        <v-sheet min-height="80vh" rounded="lg" light class="py-2 px-3">
          <v-text-field
            dense
            outlined
            hide-details
            placeholder="Search"
            rounded
            append-icon="mdi-magnify"
            class="my-3"
            clearable
          ></v-text-field>
          <v-expansion-panels class="d-flex d-lg-none">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h2>Bộ lọc</h2>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-expansion-panels class="my-5" multiple>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <h3>
                        {{ `Giá: ${priceFilter[0]}tr - ${priceFilter[1]}tr` }}
                      </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-range-slider
                        v-model="priceFilter"
                        :max="priceMax"
                        :min="priceMin"
                        :step="priceStep"
                        hide-details
                      ></v-range-slider>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <h3>Tiện ích</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row v-for="amenitie in amenities" :key="amenitie.code">
                        <v-checkbox
                          v-model="amenitiesFilter"
                          :value="amenitie.code"
                        ></v-checkbox>
                        <v-flex class="filter__content">
                          <span>
                            <v-icon>{{ `mdi-${amenitie.icon}` }}</v-icon>
                          </span>
                          <span>{{ amenitie.text }}</span>
                        </v-flex>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <h3>Loại phòng</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row v-for="type in roomTypes" :key="type.code">
                        <v-checkbox
                          v-model="roomTypesFilter"
                          :value="type.code"
                        ></v-checkbox>
                        <v-flex class="filter__content">
                          <span>{{ type.text }}</span>
                        </v-flex>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <h3>Giới tính</h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row v-for="gender in genders" :key="gender.code">
                        <v-checkbox
                          v-model="genderFilter"
                          :value="gender.code"
                        ></v-checkbox>
                        <v-flex class="filter__content">
                          <span>
                            <v-icon>{{ `mdi-${gender.icon}` }}</v-icon>
                          </span>
                          <span>{{ gender.text }}</span>
                        </v-flex>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-btn color="primary" rounded outlined>áp dụng</v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-breadcrumbs :items="breadcrumbLinks">
            <template #divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
          <v-row>
            <v-col lg="6" cols="12">
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  lg="12"
                  v-for="room in roomCardObjs"
                  :key="room.id"
                >
                  <room-card :room="room" />
                </v-col>
              </v-row>

              <v-pagination
                v-model="page"
                :length="20"
                :total-visible="7"
                circle
              ></v-pagination>
            </v-col>
            <v-col lg="6" cols="12">
              <!-- demo map -->
              <v-img
                src="/imgs/map_minh_hoa.png"
                class="rounded"
                max-height="100%"
              />
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  TextIcon,
  BreadcrumbLink,
  RoomCardDTO,
} from '@/constants/app.interface'
import RoomCard from '@/components/room/RoomCard.vue'
import {
  PRICE_FILTER,
  AMEENITIES,
  GENDER,
  ROOM_TYPES,
} from '@/constants/app.constant'

// eslint-disable-next-line no-use-before-define
@Component<List>({
  name: 'List',
  // eslint-disable-next-line no-undef
  components: {
    RoomCard,
  },
})
export default class List extends Vue {
  private priceMax: number = PRICE_FILTER.MAX
  private priceMin: number = PRICE_FILTER.MIN
  private priceStep: number = PRICE_FILTER.STEP
  private priceFilter: number[] = [PRICE_FILTER.MIN, PRICE_FILTER.MAX]

  private amenities: TextIcon[] = AMEENITIES
  private amenitiesFilter: string[] = []

  private genders: TextIcon[] = GENDER
  private genderFilter: string[] = []

  private roomTypes: TextIcon[] = ROOM_TYPES
  private roomTypesFilter: string[] = []

  private breadcrumbLinks: BreadcrumbLink[] = [
    {
      text: 'Hà Nội',
      disabled: false,
      href: 'breadcrumbs_dashboard',
    },
    {
      text: 'Tây Hồ',
      disabled: true,
      href: 'breadcrumbs_link_1',
    },
  ]

  private roomCardObjs: RoomCardDTO[] = []

  created() {
    for (let i = 0; i < 4; i++) {
      this.roomCardObjs.push(
        new RoomCardDTO({
          id: `${i}`,
          img: '/imgs/anh_room.jpg',
          title: 'Phòng cho thuê Võng thị, Quận Tây Hồ',
          type: 'room',
          available: true,
          gender: 'both',
          area: 40,
          capacity_min: 2,
          capacity_max: 3,
          address: '26 Võng thị, Phường Bưởi, Quận Tây Hồ, Hà Nội',
          verify: true,
          favorite: false,
          price: 6500000,
        })
      )
    }
  }
}
</script>

<style lang="scss">
.filter {
  &__content {
    margin-top: 1rem;
    font-size: 1.25rem;
    > * {
      margin-left: 0.5rem;
    }
  }
}
</style>
