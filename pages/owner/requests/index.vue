<template>
  <v-container>
    <v-sheet min-height="60vh" rounded="lg" class="pa-3">
      <v-layout justify-space-between class="my-5">
        <h1>Bài đăng</h1>
        <v-btn rounded outlined color="primary" to="/owner/requests/create"
          >Tạo mới</v-btn
        >
      </v-layout>
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
        v-model="filterValue.page"
        :length="totalPage"
        total-visible="7"
        circle
        @change="getAllOwnRequests"
      ></v-pagination>
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
import { RoomCardDTO, RoomFilterDTO } from '@/constants/app.interface'
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
  private requests: RoomCardDTO[] = []
  private openWarningDialog: boolean = false
  private warningDialogContent: string = ''
  private deletingRoom: number = -1
  private totalPage: number = 1
  $notify: any

  // demo get data from api
  private filterValue: RoomFilterDTO = new RoomFilterDTO()

  public async getAllOwnRequests() {
    await RoomRepository.getOwnerRoom(this.filterValue)
      .then((response) => {
        let rooms: any = response.data.data
        this.requests = rooms.map(function (item: any) {
          return new RoomCardDTO(item, true)
        })
        this.totalPage = response.data.total_page
      })
      .catch((error) => {
        console.log('getAllOwnRequests', error) 
      })
  }

  public clickDelete(event: Event, index: number) {
    event.preventDefault();
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
    await RoomRepository.deleteRoom(parseInt(this.requests[this.deletingRoom].id))
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
