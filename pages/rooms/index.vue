<template>
  <v-container>
    <section class="white pa-1 rounded">
      <v-row>
        <v-col sm="2" cols="12">
          <v-btn outlined block color="grey" @click="openFilter = true">
            <v-icon class="mr-3">mdi-filter</v-icon>
            Lọc
          </v-btn>
        </v-col>
        <v-col sm="10" cols="12">
          <v-text-field
            dense
            solo
            hide-details
            placeholder="Tìm kiếm"
            append-icon="mdi-magnify"
            color="primary"
            v-model="keyword"
            @keyup.enter="getRoomByFilter"
          >
            <template v-slot:append>
              <v-btn
                depressed
                icon
                color="primary"
                class="ma-0"
                @click="getRoomByFilter"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
        <!-- List post -->
        <v-col sm="6" cols="12">
          <section v-if="loading">
            <h1>Loading</h1>
          </section>
          <v-row v-else>
            <v-col cols="12" md="6" v-for="room in roomCardObjs" :key="room.id">
              <room-card :room="room" />
            </v-col>
          </v-row>

          <v-pagination
            v-model="page"
            :length="totalPage"
            total-visible="7"
            circle
            @input="getRoomByFilter"
          ></v-pagination>
        </v-col>
        <v-col sm="6" cols="12">
          <!-- Map -->
          <big-map />
        </v-col>
      </v-row>
    </section>
    <v-dialog
      max-width="1184px"
      v-model="openFilter"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card>
        <room-filter
          :open.sync="openFilter" 
          @filter="getRoomByFilter"/>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RoomCardDTO, RoomFilterDTO } from '@/constants/app.interface'
import RoomCard from '@/components/room/RoomCard.vue'
import RoomFilter from '@/components/room/RoomFilter.vue'
import SearchAddress from '@/components/map/SearchAddress.vue'
import BigMap from '@/components/map/BigMap.vue'
import { Framework } from 'vuetify'
import { DispatchAction } from '~/constants/app.vuex'

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
    // await this.getRoomByFilter()
  },
})
export default class List extends Vue {
  private loading: boolean = false

  private roomCardObjs: RoomCardDTO[] = []

  private openFilter: boolean = false

  private totalPage: number = 1

  public async clickFilter() {
    await this.getRoomByFilter()
  }

  get keyword() {
    return this.$store.state.search.keyword
  }

  set keyword(val) {
    this.$store.commit('search/setKeyword', val)
  }

  get page() {
    return this.$store.state.search.page
  }
  
  set page(val) {
    this.$store.commit('search/setPage', val)
  }

  public async getRoomByFilter(): Promise<void> {
    this.loading = true
    const item = await this.$store.dispatch(DispatchAction.FILTER_ROOM)
    if (item.data) {
      this.totalPage = item.total_page

      this.roomCardObjs = item.data.map(function (item: any) {
        return new RoomCardDTO(item)
      })
    }

    this.loading = false
  }
}
</script>
