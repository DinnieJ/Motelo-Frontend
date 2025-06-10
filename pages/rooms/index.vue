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
            v-model="keyword"
            dense
            solo
            hide-details
            placeholder="Tìm kiếm"
            append-icon="mdi-magnify"
            color="primary"
            @keyup.enter="getRoomByFilter"
          >
            <template #append>
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
        <v-col md="6" cols="12">
          <template v-if='roomCardObjs.length !== 0'>
          <section v-if="loading">
            <h1>Loading</h1>
          </section>
          <v-row v-else>
            <v-col v-for="room in roomCardObjs" :key="room.id" cols="12" sm="6">
              <room-card :room="room" @change-map-location="setMapCenter" />
            </v-col>
          </v-row>

          <v-pagination
            v-model="page"
            :length="totalPage"
            total-visible="7"
            circle
            class="mt-3"
            @input="getRoomByFilter"
          ></v-pagination>
          </template>
          <template v-else>
            <v-layout column align-center>
              <h1 class="text-h5">
                <v-icon x-large color="primary">mdi-magnify</v-icon>
                Không có kết quả để hiển thị
              </h1>
              <p>Xin lỗi, hiện tại không có phòng nào theo yêu cầu tìm kiếm của bạn</p>
              <v-btn color="primary" ><v-icon left>mdi-home</v-icon>Quay lại trang chủ</v-btn>
            </v-layout>
          </template>
        </v-col>
        <v-col md="6" cols="12">
          <!-- Map -->
          <big-map :inns="inns" :center="centerMap"/>
        </v-col>
      </v-row>
    </section>
    <v-dialog
      v-model="openFilter"
      max-width="1184px"
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
import { RoomCardDTO } from '@/constants/app.interface'
import RoomCard from '@/components/room/RoomCard.vue'
import RoomFilter from '@/components/room/RoomFilter.vue'
import SearchAddress from '@/components/map/SearchAddress.vue'
import BigMap from '@/components/map/BigMap.vue'
import { Framework } from 'vuetify'
import { DispatchAction } from '~/constants/app.vuex'
import { FPTLocation } from '~/constants/app.constant'

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
    await this.getRoomByFilter()
  },
})
export default class List extends Vue {
  private loading: boolean = false

  private roomCardObjs: RoomCardDTO[] = []

  private openFilter: boolean = false

  private totalPage: number = 1

  private inns: any[] = []

  private centerMap: any = { lat: FPTLocation[0], lng:FPTLocation[1] }

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

      const innMap = new Map<string, any>()

      this.roomCardObjs = item.data.map((item: any) => {
        const room = new RoomCardDTO(item)

        if (innMap.has(room.inn_name)) {
          innMap.get(room.inn_name).description += `<br />Bài đăng: ${room.title}`
        } else {
          innMap.set(room.inn_name, {
            id: `inn-${room.id}`,
            name: room.inn_name,
            type: room.type,
            address: room.address,
            position: room.location,
            img: room.image,
            description: `Bài đăng: ${room.title}`
          })
        }

        return room
      })

      this.inns = Array.from(innMap.values())
    }

   

    this.loading = false
  }

  public setMapCenter(location) {
    if(JSON.stringify(this.centerMap) != JSON.stringify(location)) {
      this.centerMap = location
    }
  }
}
</script>
