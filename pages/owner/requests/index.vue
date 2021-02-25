<template>
  <v-container>
    <v-sheet min-height="60vh" rounded="lg" class="pa-3">
      <v-layout justify-space-between class="my-5">
        <h1>Bài đăng</h1>
        <v-btn rounded outlined color="primary" to="/owner/requests/create">Tạo mới</v-btn>
      </v-layout>
      <v-row>
        <v-col cols="12" sm="6" v-for="(room, index) in requests" :key="room.id">
          <room-card owner :room="room" :index="index" :clickDelete="clickDelete" />
        </v-col>
      </v-row>
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
import RequestRepository from '@/repositories/RequestRepository'
import WarningDialog from '@/components/common/WarningDialog.vue'

// eslint-disable-next-line no-use-before-define
@Component<OwnerRequests>({
  name: 'OwnerRequests',
  // eslint-disable-next-line no-undef
  layout: 'inhouse',
  components: {
    RoomCard,
    WarningDialog,
  },
  async created() {
    await this.getAllOwnRequests();
  }
})
export default class OwnerRequests extends Vue {
  private requests: RoomCardDTO[] = []
  private openWarningDialog: boolean = false
  private warningDialogContent: string = ''
  private deletingRoom: number = -1

  public async getAllOwnRequests() {
    await RequestRepository.getAllOwnRequests()
      .then(response => {
        this.requests = response.map((item: any) => new RoomCardDTO(item))
      })
  }

  public clickDelete(index: number) {
    this.deletingRoom = index
    this.warningDialogContent = `Bạn có muốn xóa yêu cầu "${this.requests[index].requestType}: ${this.requests[index].title}" không ?`
    this.openWarningDialog = true
  }

  public closeDialog() {
    this.deletingRoom = -1
    this.warningDialogContent = ''
    this.openWarningDialog = false
  }

  public async deleteRoom() {
    await RequestRepository.deleteRoom(this.requests[this.deletingRoom].id)
      .then(repos => {
        this.requests = this.requests.filter((item, index) => index != this.deletingRoom)
      })
      .finally(() => {
        this.closeDialog()
      })
  }
}
</script>
