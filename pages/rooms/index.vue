<template>
  <v-container>
    <v-row>
      <v-col cols="2" class="d-none d-lg-block">
        <v-sheet rounded="lg" light class="pa-3">
          <room-filter />
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
                <room-filter sm />
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
import { BreadcrumbLink, RoomCardDTO } from '@/constants/app.interface'
import { PRICE_FILTER } from '@/constants/app.constant'
import RoomCard from '@/components/room/RoomCard.vue'
import RoomFilter from '@/components/room/RoomFilter.vue'

// eslint-disable-next-line no-use-before-define
@Component<List>({
  name: 'List',
  // eslint-disable-next-line no-undef
  components: {
    RoomCard,
    RoomFilter,
  },
})
export default class List extends Vue {
  private priceFilter: number[] = [PRICE_FILTER.MIN, PRICE_FILTER.MAX]

  private amenitiesFilter: string[] = []

  private genderFilter: string[] = []

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
