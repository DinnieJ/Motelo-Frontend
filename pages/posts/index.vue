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
              ><v-btn color="secondary" rounded outlined>áp dụng</v-btn></v-col
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
          <v-btn color="secondary" rounded outlined>áp dụng</v-btn>
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet min-height="100vh" rounded="lg" light class="pa-2">
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
                <v-btn color="secondary" rounded outlined>áp dụng</v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-breadcrumbs :items="breadcrumbLinks">
            <template #divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
          <v-row>
            <v-col lg="6" md="12">
              <v-card
                v-for="i in 5"
                :key="i"
                elevation="0"
                class="mb-4 post__card"
              >
                <v-row>
                  <v-col cols="12" md="4">
                    <v-img
                      src="./imgs/anh_room.jpg"
                      class="rounded"
                      max-width="100%"
                    />
                  </v-col>
                  <v-col cols="6" class="pa-1">
                    <h4>Phòng cho thuê Võng thị, Quận Tây Hồ</h4>
                    <v-row>
                      <v-col>
                        <v-icon>mdi-home</v-icon>
                        <span>Phòng cho thuê</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col sm="6" cols="12">
                        <v-icon>mdi-human-male-female</v-icon>
                        <span>Cả hai</span>
                      </v-col>
                      <v-col sm="6" cols="12">
                        <v-icon>mdi-ruler</v-icon>
                        <span>40 m²</span>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-icon>mdi-map-marker</v-icon>
                        <span
                          >26 Võng thị, Phường Bưởi, Quận Tây Hồ, Hà Nội</span
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col md="2" sm="6" class="primary--text text--center pr-5">
                    <v-row class="justify-end">
                      <v-tooltip top class="mr-5">
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            size="32"
                            color="secondary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            mdi-shield-home
                          </v-icon>
                        </template>
                        <span>Được kiểm chứng</span>
                      </v-tooltip>
                      <v-icon
                        class="ml-5"
                        size="32"
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-heart-plus-outline
                      </v-icon>
                    </v-row>
                    <div class="d-flex post__price">
                      <span class="display-3 font-weight-bold">6.5</span>
                      <span class="caption">tr/tháng</span>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
              <v-pagination
                v-model="page"
                :length="20"
                :total-visible="7"
                circle
              ></v-pagination>
            </v-col>
            <v-col lg="6" md="12" class="pa-6">
              <div class="rounded map_demo">
                <h1 class="display-4">Map Minh Hoa</h1>
              </div>
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
  Amenitie,
  Gender,
  RoomType,
  BreadcrumbLink,
} from '@/constants/app.interface'
import {
  PRICE_FILTER,
  AMEENITIES,
  GENDER,
  ROOM_TYPES,
} from '@/constants/app.constant'

// eslint-disable-next-line no-use-before-define
@Component<List>({
  name: 'List',
})
export default class List extends Vue {
  private priceMax: number = PRICE_FILTER.MAX
  private priceMin: number = PRICE_FILTER.MIN
  private priceStep: number = PRICE_FILTER.STEP
  private priceFilter: number[] = [PRICE_FILTER.MIN, PRICE_FILTER.MAX]

  private amenities: Amenitie[] = AMEENITIES
  private amenitiesFilter: string[] = []

  private genders: Gender[] = GENDER
  private genderFilter: string[] = []

  private roomTypes: RoomType[] = ROOM_TYPES
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

.post {
  &__card {
    cursor: pointer;
  }

  &__price {
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    // > * {
    //   align-self: center;
    //   justify-self: center;
    // }
  }
}

.map_demo {
  background: gray;
  min-height: 100vh;
}
</style>
