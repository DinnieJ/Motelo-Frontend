<template>
  <v-container>
    <v-row>
      <!-- Filter for desktop screen -->
      <v-col cols="2" class="d-none d-lg-block">
        <v-sheet rounded="lg" light class="pa-3">
          <room-filter v-model="filterValue" :submit="clickFilter" />
        </v-sheet>
      </v-col>

      <v-col cols="12" lg="10">
        <v-sheet min-height="80vh" rounded="lg" light class="py-2 px-3">
          <!-- Search -->
          <search-address />

          <!-- Filter for tablet and mobile screen -->
          <v-expansion-panels class="d-flex d-lg-none">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <h2>Bộ lọc</h2>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <room-filter sm v-model="filterValue" :submit="clickFilter" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-breadcrumbs :items="breadcrumbLinks">
            <template #divider>
              <v-icon>mdi-chevron-right</v-icon>
            </template>
          </v-breadcrumbs>
          <v-row>
            <!-- List post -->
            <v-col lg="6" cols="12">
              <section v-if="loading">
                <h1>Loading</h1>
              </section>
              <v-row v-else>
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
                v-model="filterValue.page"
                :length="totalPage"
                total-visible="7"
                circle
                @input="getRoomByFilter"
              ></v-pagination>
            </v-col>
            <v-col lg="6" cols="12">
              <!-- Map -->
              <big-map />
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
  BreadcrumbLink,
  RoomCardDTO,
  RoomFilterDTO,
} from '@/constants/app.interface'
import RoomCard from '@/components/room/RoomCard.vue'
import RoomFilter from '@/components/room/RoomFilter.vue'
import SearchAddress from '@/components/map/SearchAddress.vue'
import BigMap from '@/components/map/BigMap.vue'
import RoomRepository from '@/repositories/RoomRepository'
import { Framework } from 'vuetify'
import { PRICE_FILTER } from '@/constants/app.constant'

declare module 'vue/types/vue' {
  // this.$vuetify inside Vue components
  interface Vue {
    $vuetify: Framework
  }
}

// eslint-disable-next-line no-use-before-define
@Component<List>({
  name: 'List',
  // eslint-disable-next-line no-undef
  components: {
    RoomCard,
    RoomFilter,
    SearchAddress,
    BigMap,
  },
  async mounted() {
    const query = this.$route.query
    this.filterValue.update = query
    await this.getRoomByFilter()
  },
})
export default class List extends Vue {
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

  private loading: boolean = false

  private roomCardObjs: RoomCardDTO[] = []

  private totalPage: number = 1
  private filterValue: RoomFilterDTO = new RoomFilterDTO()

  public async clickFilter() {
    await this.getRoomByFilter()
  }

  public async getRoomByFilter(): Promise<void> {
    this.loading = true
    await RoomRepository.getRoomsByFilter(this.filterValue)
      .then((response) => {
        let rooms: any = response.data.data
        this.roomCardObjs = rooms.map(function(item:any) {
          return new RoomCardDTO(item)
        })
        this.totalPage = response.data.total_page
      })
      .catch((error) => {
        console.log('getRoomByFilter', error)
      })
      .finally(() => {
        this.loading = false
        this.$router.push({path:'/rooms',  query: this.filterValue.toObject })
      })
  }
}
</script>
