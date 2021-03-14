<template>
  <v-container>
    <room-detail-container
      forOwner
      :room="room"
      :clickDelete="clickDelete"
    />
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
import { RoomDetailDTO } from '@/constants/app.interface'
import RoomDetailContainer from '@/components/room/RoomDetailContainer.vue'
import RoomRepository from '@/repositories/RoomRepository'
import RequestRepository from '@/repositories/RequestRepository'
import WarningDialog from '@/components/common/WarningDialog.vue'

// eslint-disable-next-line no-use-before-define
@Component<DetailRequest>({
  name: 'DetailRequest',
  components: {
    RoomDetailContainer,
    WarningDialog,
  },
  middleware: ['authenticated', 'isOwner'],
  async created() {
    this.id = this.$route.params.id
    this.getRoomDetail()
  },
})
export default class DetailRequest extends Vue {
  private room: RoomDetailDTO = new RoomDetailDTO()
  private id: string = '-1'
  private openWarningDialog: boolean = false
  private warningDialogContent: string = ''

  public async getRoomDetail() {
    // Mockup get demo data from api Guest(ListRoom)
    await RoomRepository.getRoomDetail(this.id).then((repos) => {
      this.room = new RoomDetailDTO(repos.data)
    })
  }

  public clickDelete(index: number) {
    this.warningDialogContent = `Bạn có muốn xóa bài đăng "${this.room.title}" không ?`
    this.openWarningDialog = true
  }

  public closeDialog() {
    this.openWarningDialog = false
  }

  public async deleteRoom() {
    await RequestRepository.deleteRoom(this.id)
      .then(repos => {
        this.$router.push('/owner/requests');
      })
      .finally(() => {
        this.closeDialog()
      })
  }
}
</script>
