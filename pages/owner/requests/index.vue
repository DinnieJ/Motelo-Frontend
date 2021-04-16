<template>
  <v-container>
    <v-sheet min-height="80vh" rounded="lg" class="pa-5">
      <v-layout justify-space-between class="my-5">
        <h1 class="display-1 primary--text">Phòng của bạn</h1>
        <v-btn rounded color="primary" to="/owner/requests/create">
          <v-icon left>mdi-plus</v-icon> Tạo mới
        </v-btn>
      </v-layout>
      <v-layout d-flex justify-center align-center v-if="loading">
        <v-progress-circular
          size="200"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-layout>
        <div v-else>
          <div v-if="requests.length > 0">
            <v-row>
              <v-col
                cols="12"
                sm="4"
                md="3"
                v-for="(room, index) in requests"
                :key="room.id"
              >
                <room-card
                  owner
                  :room="room"
                  :index="index"
                  :clickDelete="clickDelete"
                />
              </v-col>
            </v-row>
            <v-pagination
              class="mt-3"
              v-model="page"
              :length="totalPage"
              total-visible="7"
              circle
              @input="getAllOwnRequests"
            ></v-pagination>
          </div>
          <v-layout
            d-flex
            column
            justify-center
            align-center
            align-content-center
            v-else
          >
            <h1 class="display-2 font-weight-light text-center">
              Bạn chưa tạo phòng nào
            </h1>
            <p class="caption mt-3">Bấm vào tạo mới để thêm phòng</p>
            <v-btn rounded color="primary" to="/owner/requests/create">
              <v-icon left>mdi-plus</v-icon> Tạo mới
            </v-btn>
          </v-layout>
        </div>
    </v-sheet>
    <warning-dialog
      title="Xoá yêu cầu"
      :content="warningDialogContent"
      @accept="deleteRoom"
      @refuse="closeDialog"
      v-model="openWarningDialog"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { RoomCardDTO } from '@/constants/app.interface'
import RoomCard from '@/components/room/RoomCard.vue'
import WarningDialog from '@/components/common/WarningDialog.vue'

// demo get data from api
import RoomRepository from '@/repositories/RoomRepository'

// eslint-disable-next-line no-use-before-define
@Component<OwnerRequests>({
  name: 'OwnerRequests',
  // eslint-disable-next-line no-undef
  components: {
    RoomCard,
    WarningDialog,
  },
  middleware: ['authenticated', 'isOwner'],
  async created() {
    await this.getAllOwnRequests()
  },
})
export default class OwnerRequests extends Vue {
  private loading: boolean = false
  private requests: RoomCardDTO[] = []
  private openWarningDialog: boolean = false
  private warningDialogContent: string = ''
  private deletingRoom: number = -1
  private totalPage: number = 1
  private page: number = 1
  $notify: any

  // demo get data from api

  public async getAllOwnRequests() {
    this.loading = true
    await RoomRepository.getOwnerRoom({ page: this.page })
      .then((response) => {
        let rooms: any = response.data.data
        this.requests = rooms.map(function (item: any) {
          return new RoomCardDTO(item, true)
        })
        this.totalPage = response.data.total_page
      })
      .catch((error) => {})

    this.loading = false
  }

  public clickDelete(event: Event, index: number) {
    event.preventDefault()
    this.deletingRoom = index
    this.warningDialogContent = `Bạn có muốn xóa bài đăng: ${this.requests[index].title}" không ?`
    this.openWarningDialog = true
  }

  public closeDialog() {
    this.deletingRoom = -1
    this.warningDialogContent = ''
    this.openWarningDialog = false
  }

  public async deleteRoom() {
    await RoomRepository.deleteRoom(
      parseInt(this.requests[this.deletingRoom].id)
    )
      .then((repos) => {
        this.requests.splice(this.deletingRoom, 1)
        this.$notify.showMessage({
          message: 'Xóa bài đăng thành công',
          color: 'success',
        })
      })
      .finally(() => {
        this.closeDialog()
      })
  }
}
</script>
