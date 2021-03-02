<template>
  <v-container>
    <room-detail-container
      forOwner
      :room="room"
      :comments.sync="comments"
      :addComment="addComment"
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
import { RoomDetailDTO, CommentDTO } from '@/constants/app.interface'
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
  async created() {
    this.id = this.$route.params.id
    this.getRoomDetail()
  },
})
export default class DetailRequest extends Vue {
  private room: RoomDetailDTO = new RoomDetailDTO()
  private comments: CommentDTO[] = []
  private id: string = '-1'
  private openWarningDialog: boolean = false
  private warningDialogContent: string = ''

  public async getRoomDetail() {
    await RequestRepository.getRoomDetail(this.id).then((repos) => {
      this.room = new RoomDetailDTO(repos)
      this.comments = this.room.comments
    })
  }

  public async addComment(comment: string) {
    await RoomRepository.addComment(1, comment).then((repos) => { // need fix
      this.comments.unshift({
        id: this.comments.length + 1,
        account_id: 2,
        name: 'John Doe',
        context: comment,
      })
    })
  }

  public clickDelete(index: number) {
    this.warningDialogContent = `Bạn có muốn xóa yêu cầu "${this.room.requestType}: ${this.room.title}" không ?`
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
