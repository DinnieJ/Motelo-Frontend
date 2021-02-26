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
import { convertDetailRoomDTO } from '@/converter/DetailRoom'
import { ROOM_TYPES } from '@/constants/app.constant'

// eslint-disable-next-line no-use-before-define
@Component<DetailRoom>({
  name: 'DetailRoom',
  components: {
    RoomDetailContainer,
  },
  async created() {
    try {
      this.id = parseInt(this.$route.params.id)
    } catch(e) {
      this.id = -1
    }
   
    this.getRoomDetail()
  },
})
export default class DetailRoom extends Vue {
  private room: RoomDetailDTO = new RoomDetailDTO()
  private id: number = -1
  private favorite: boolean = false
  private comments: CommentDTO[] = []
  $notify: any

  public async getRoomDetail() {
    const id: string = this.$route.params.id
    await RoomRepository.getRoomDetail(id).then((repos) => {
      this.room = new RoomDetailDTO(convertDetailRoomDTO(repos.data))
      this.id = this.room.id
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
        this.comments.unshift({
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
