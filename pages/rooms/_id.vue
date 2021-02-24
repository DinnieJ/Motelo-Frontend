<template>
  <v-container>
    <room-detail-container
      :room="room"
      :favorite.sync="favorite"
      :clickFavor="clickFavor"
      :comments.sync="comments"
      :addComment="addComment"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RoomDetailContainer from '@/components/room/RoomDetailContainer.vue'
import RoomRepository from '@/repositories/RoomRepository'
import { RoomDetailDTO, CommentDTO } from '@/constants/app.interface'

// eslint-disable-next-line no-use-before-define
@Component<DetailRoom>({
  name: 'DetailRoom',
  components: {
    RoomDetailContainer,
  },
  async created() {
    this.id = this.$route.params.id
    this.getRoomDetail()
  },
})
export default class DetailRoom extends Vue {
  private room: RoomDetailDTO = new RoomDetailDTO()
  private id: string = '-1'
  private favorite: boolean = false
  private comments: CommentDTO[] = []
  $notify: any;

  public async getRoomDetail() {
    
    await RoomRepository.getRoomDetail(this.id).then((repos) => {
      this.room = new RoomDetailDTO(repos)
      this.favorite = this.room.favorite
      this.comments = this.room.comments
    })
  }

  public async clickFavor(event: Event) {
    event.preventDefault()
    if (this.favorite) {
      await this.unfavorRoom()
    } else {
      await this.favorRoom()
    }
  }

  public async addComment(comment: string) {
    await RoomRepository.addComment(comment)
      .then(repos => {
        this.comments.push({
          id: this.comments.length + 1,
          account_id: 2,
          name: 'John Doe',
          context: comment
        })
        this.$notify.showMessage({
        message: `Bạn đã thêm nhận xét cho "${this.room.title}"`,
        color: 'success',
      })
      })
  }

  public async favorRoom() {
    await RoomRepository.favorRoom(this.id).then((repos) => {
      this.favorite = true
      this.$notify.showMessage({
        message: `Bạn đã thêm ${this.room.title} vào danh sách yêu thích`,
        color: 'success',
      })
    })
  }

  public async unfavorRoom() {
    await RoomRepository.unfavorRoom(this.id).then((repos) => {
      this.favorite = false
      this.$notify.showMessage({
        message: `Bạn đã bỏ ${this.room.title} vào danh sách yêu thích`,
        color: 'warning',
      })
    })
  }
}
</script>
